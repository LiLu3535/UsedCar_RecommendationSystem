window.onload = function () {
    changeLogin();
};

function addCar(carID, carBrand, carPrice, sellerID, buyerID, carAge, carMileage, carPowerType, carModel, carNote, transTime, carFuelConsumption, updateTime, registerDate) {
    var result;
    var passedInfo = {
        "method": "addCar",
        "carID": carID,
        "brand": carBrand,
        "price": carPrice,
        "sellerID": sellerID,
        "buyerID": buyerID,
        "age": carAge,
        "mileage": carMileage,
        "powerType": carPowerType,
        "model": carModel,
        "note": carNote,
        "transTime": transTime,
        "fuelCons": carFuelConsumption,
        "updateTime": updateTime,
        "registeredDate": registerDate
    };
    $.ajax({
        async: false,
        url: "CarServlet",
        method: "post",
        dataType: "text",
        data: passedInfo,
        success: function (data) {
            result = data;
        },
        error: function (error) {
            alert(error.status + "," + error.statusText);
            window.location.reload();
        }
    });
    return result;
}

// check whether the user has authority to stay in upload car page
if (getUserStatus() !== true) {
    alert("Please login first");
    window.location.replace("login.html");
}

// get uploaded car information
function getUploadedCar() {
    var sellerID = getUserEmail();
    var carBrandIndex = document.getElementById("carBrand").selectedIndex;
    var carBrand = document.getElementById("carBrand")[carBrandIndex].innerHTML;
    var carModelIndex = document.getElementById("carModel").selectedIndex;
    var carModel = document.getElementById("carModel")[carModelIndex].innerHTML;
    var carPrice = document.getElementById("carPrice").value;
    var carRigsteredDate = document.getElementById("carRigsteredDate").value;
    var carMileage = document.getElementById("carMilegae").value;
    var carFuelConsumption = document.getElementById("carFuelConsumption").value;
    var carNote = document.getElementById("carNote").value;

    var carPowerTypeRadio = document.getElementsByName("powertype");
    var carPowerType;
    for (var i = 0; i < carPowerTypeRadio.length; i++) {
        if (carPowerTypeRadio[i].checked) {
            carPowerType = carPowerTypeRadio[i].value;
        }

    }


    var isInsert = true;
    var integerPattern = /^(([1-9])([0-9])*|0)$/;
    var floatPattern = /^([1-9])([0-9])?\.[0-9]$/;


    // check user input    
    if (carBrand === "") {
        alert("Please select car brand");
        isInsert = false;
        window.location.reload();
    } else if (!integerPattern.test(carPrice) || carPrice.length < 0 || carPrice.length > 8) {
        alert("Please input correct car price");
        isInsert = false;
        window.location.reload();
    } else if (carRigsteredDate === "") {
        alert("Please choose date");
        isInsert = false;
        window.location.reload();
    } else if (!integerPattern.test(carMileage) || carMileage.length < 0 || carMileage.length > 15) {
        alert("Please input correct car mileage");
        isInsert = false;
        window.location.reload();
    } else if (!floatPattern.test(carFuelConsumption) || carFuelConsumption.length < 0 || carFuelConsumption.length > 4) {
        alert("Please input correct car fuel consumption");
        isInsert = false;
        window.location.reload();
    } else if (carPowerType === undefined) {
        alert("Please select power type");
        isInsert = false;
        window.location.reload();
    } else if (carNote.length > 100) {
        alert("Please input correct note");
        isInsert = false;
        window.location.reload();
    }

    // insert uploaded car into database
    if (isInsert === true) {
        var currentDate = new Date();
        var carAgeValue = carRigsteredDate.split("-");
        var carYear = carAgeValue[0];
        var currentYear = currentDate.getFullYear();
        var carAge = currentYear - carYear;
        var result = addCar(0, carBrand, carPrice, sellerID, 0, carAge, carMileage, carPowerType, carModel, carNote, 0, carFuelConsumption, currentDate.toLocaleTimeString(), carRigsteredDate);             // NEED TO CHANGE
        if (result === "true") {
            alert("Upload succeed!");
            window.location.reload();
        } else {
            alert("Upload failed!");
            window.location.reload();
        }
    } else {
        alert("Please complete the form.");
        window.location.reload();
    }


}


// dynamic adding model options
function dynamicAddingModel() {
    var carBrandIndex = document.getElementById("carBrand").selectedIndex;
    var carBrand = document.getElementById("carBrand")[carBrandIndex].innerHTML;

    // delete all original options
    var modelOption = document.getElementById("carModel");         // select
    modelOption.options.length = 0;

    switch (carBrand) {
        case "":
            break;

        case "Audi":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("100", "100"));
            modelOption.add(new Option("80", "80"));
            modelOption.add(new Option("A1", "A1"));
            modelOption.add(new Option("A2", "A2"));
            modelOption.add(new Option("A3", "A3"));
            modelOption.add(new Option("A4", "A4"));
            modelOption.add(new Option("A5", "A5"));
            modelOption.add(new Option("A6", "A6"));
            modelOption.add(new Option("A7", "A7"));
            modelOption.add(new Option("A8", "A8"));
            modelOption.add(new Option("Allroad", "Allroad"));
            modelOption.add(new Option("Cabriolet", "Cabriolet"));
            modelOption.add(new Option("Coupe", "Coupe"));
            modelOption.add(new Option("E-Tron", "E-Tron"));
            modelOption.add(new Option("Q1", "Q1"));
            modelOption.add(new Option("Q2", "Q2"));
            modelOption.add(new Option("Q3", "Q3"));
            modelOption.add(new Option("Q4", "Q4"));
            modelOption.add(new Option("Q5", "Q5"));
            modelOption.add(new Option("Q6", "Q6"));
            modelOption.add(new Option("Q7", "Q7"));
            modelOption.add(new Option("Q8", "Q8"));
            modelOption.add(new Option("Quattro", "Quattro"));
            modelOption.add(new Option("R8", "R8"));
            modelOption.add(new Option("Rs1", "Rs1"));
            modelOption.add(new Option("Rs2", "Rs2"));
            modelOption.add(new Option("Rs3", "Rs3"));
            modelOption.add(new Option("Rs4", "Rs4"));
            modelOption.add(new Option("Rs5", "Rs5"));
            modelOption.add(new Option("Rs6", "Rs6"));
            modelOption.add(new Option("Rs7", "Rs7"));
            modelOption.add(new Option("S1", "S1"));
            modelOption.add(new Option("S2", "S2"));
            modelOption.add(new Option("S3", "S3"));
            modelOption.add(new Option("S4", "S4"));
            modelOption.add(new Option("S5", "S5"));
            modelOption.add(new Option("S6", "S6"));
            modelOption.add(new Option("S7", "S7"));
            modelOption.add(new Option("S8", "S8"));
            modelOption.add(new Option("TT", "TT"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "BMW":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("1 Series", "1 Series"));
            modelOption.add(new Option("2 Series", "2 Series"));
            modelOption.add(new Option("3 Series", "3 Series"));
            modelOption.add(new Option("4 Series", "4 Series"));
            modelOption.add(new Option("5 Series", "5 Series"));
            modelOption.add(new Option("6 Series", "6 Series"));
            modelOption.add(new Option("7 Series", "7 Series"));
            modelOption.add(new Option("8 Series", "8 Series"));
            modelOption.add(new Option("Alpina B3", "Alpina B3"));
            modelOption.add(new Option("Alpina B4", "Alpina B4"));
            modelOption.add(new Option("Alpina B5", "Alpina B5"));
            modelOption.add(new Option("Alpina B6", "Alpina B6"));
            modelOption.add(new Option("Alpina B7", "Alpina B7"));
            modelOption.add(new Option("Alpina D3", "Alpina D3"));
            modelOption.add(new Option("Alpina D4", "Alpina D4"));
            modelOption.add(new Option("Alpina D5", "Alpina D5"));
            modelOption.add(new Option("I3", "I3"));
            modelOption.add(new Option("I8", "I8"));
            modelOption.add(new Option("M2", "M2"));
            modelOption.add(new Option("M3", "M3"));
            modelOption.add(new Option("M4", "M4"));
            modelOption.add(new Option("M5", "M5"));
            modelOption.add(new Option("M6", "M6"));
            modelOption.add(new Option("M7", "M7"));
            modelOption.add(new Option("M8", "M8"));
            modelOption.add(new Option("X1", "X1"));
            modelOption.add(new Option("X2", "X2"));
            modelOption.add(new Option("X3", "X3"));
            modelOption.add(new Option("X4", "X4"));
            modelOption.add(new Option("X5", "X5"));
            modelOption.add(new Option("X6", "X6"));
            modelOption.add(new Option("X7", "X7"));
            modelOption.add(new Option("Z1", "Z1"));
            modelOption.add(new Option("Z2", "Z2"));
            modelOption.add(new Option("Z3", "Z3"));
            modelOption.add(new Option("Z4", "Z4"));
            modelOption.add(new Option("Z5", "Z5"));
            modelOption.add(new Option("Z6", "Z6"));
            modelOption.add(new Option("Z7", "Z7"));
            modelOption.add(new Option("Z8", "Z8"));

            break;

        case "Ford":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("B-max", "B-max"));
            modelOption.add(new Option("C-max", "C-max"));
            modelOption.add(new Option("Capri", "Capri"));
            modelOption.add(new Option("Cortina", "Cortina"));
            modelOption.add(new Option("Ecosport", "Ecosport"));
            modelOption.add(new Option("Edge", "Edge"));
            modelOption.add(new Option("Escort", "Escort"));
            modelOption.add(new Option("Expedition", "Expedition"));
            modelOption.add(new Option("Explorer", "Explorer"));
            modelOption.add(new Option("F150", "F150"));
            modelOption.add(new Option("Fiesta", "Fiesta"));
            modelOption.add(new Option("Focus", "Focus"));
            modelOption.add(new Option("Freda", "Freda"));
            modelOption.add(new Option("Fusion", "Fusion"));
            modelOption.add(new Option("Grand", "Grand"));
            modelOption.add(new Option("Gt", "Gt"));

            modelOption.add(new Option("Ka", "Ka"));
            modelOption.add(new Option("Kuga", "Kuga"));
            modelOption.add(new Option("Mondeo", "Mondeo"));
            modelOption.add(new Option("Mustang", "Mustang"));
            modelOption.add(new Option("Puma", "Puma"));
            modelOption.add(new Option("Ranger", "Ranger"));
            modelOption.add(new Option("S-max", "S-max"));
            modelOption.add(new Option("Sierra", "Sierra"));
            modelOption.add(new Option("Streetka", "Streetka"));
            modelOption.add(new Option("Tourneo", "Tourneo"));
            modelOption.add(new Option("Transit", "Transit"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Honda":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("Accord", "Accord"));
            modelOption.add(new Option("Civic", "Civic"));
            modelOption.add(new Option("Cr-v", "Cr-v"));
            modelOption.add(new Option("Cr-z", "Cr-z"));
            modelOption.add(new Option("Elysion", "Elysion"));
            modelOption.add(new Option("Fr-v", "Fr-v"));
            modelOption.add(new Option("Hr-v", "Hr-v"));
            modelOption.add(new Option("Insight", "Insight"));
            modelOption.add(new Option("Integra", "Integra"));
            modelOption.add(new Option("Jazz", "Jazz"));
            modelOption.add(new Option("Legend", "Legend"));
            modelOption.add(new Option("Mobilo", "Mobilo"));
            modelOption.add(new Option("Nsx", "Nsx"));
            modelOption.add(new Option("Odyssey", "Odyssey"));
            modelOption.add(new Option("Prelude", "Prelude"));
            modelOption.add(new Option("S2000", "S2000"));
            modelOption.add(new Option("Shuttle", "Shuttle"));
            modelOption.add(new Option("Stepwagon", "Stepwagon"));
            modelOption.add(new Option("Stream", "Stream"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Jeep":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("Cherokee", "Cherokee"));
            modelOption.add(new Option("Commander", "Commander"));
            modelOption.add(new Option("Compass", "Compass"));
            modelOption.add(new Option("Grand Cherokee", "Grand Cherokee"));
            modelOption.add(new Option("Patriot", "Patriot"));
            modelOption.add(new Option("Renegade", "Renegade"));
            modelOption.add(new Option("Willys", "Willys"));
            modelOption.add(new Option("Wrangler", "Wrangler"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Land Rover":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("110", "110"));
            modelOption.add(new Option("90", "90"));
            modelOption.add(new Option("Defender", "Defender"));
            modelOption.add(new Option("Discovery", "Discovery"));
            modelOption.add(new Option("Freelander", "Freelander"));
            modelOption.add(new Option("Lightweight", "Lightweight"));
            modelOption.add(new Option("Modified", "Modified"));
            modelOption.add(new Option("Range Rover", "Range Rover"));
            modelOption.add(new Option("Series i", "Series i"));
            modelOption.add(new Option("Series ii", "Series ii"));
            modelOption.add(new Option("Series iii", "Series iii"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Mazda":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("33", "33"));
            modelOption.add(new Option("626", "626"));
            modelOption.add(new Option("Bongo", "Bongo"));
            modelOption.add(new Option("Bt-50", "Bt-50"));
            modelOption.add(new Option("CX-3", "CX-3"));
            modelOption.add(new Option("CX-30", "CX-30"));
            modelOption.add(new Option("CX-4", "CX-4"));
            modelOption.add(new Option("CX-5", "CX-5"));
            modelOption.add(new Option("CX-6", "CX-6"));
            modelOption.add(new Option("CX-7", "CX-7"));
            modelOption.add(new Option("CX-8", "CX-8"));
            modelOption.add(new Option("Mazda2", "Mazda2"));
            modelOption.add(new Option("Mazda3", "Mazda3"));
            modelOption.add(new Option("Mazda4", "Mazda4"));
            modelOption.add(new Option("Mazda5", "Mazda5"));
            modelOption.add(new Option("Mazda6", "Mazda6"));
            modelOption.add(new Option("Mx-5", "Mx-5"));
            modelOption.add(new Option("Premacy", "Premacy"));
            modelOption.add(new Option("Rx-8", "Rx-8"));
            modelOption.add(new Option("Tribute", "Tribute"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Mercedes_benz":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("A Class", "A Class"));
            modelOption.add(new Option("Amg", "Amg"));
            modelOption.add(new Option("B Class", "B Class"));
            modelOption.add(new Option("C Class", "C Class"));
            modelOption.add(new Option("Citan", "Citan"));
            modelOption.add(new Option("Cl", "Cl"));
            modelOption.add(new Option("CLA Class", "CLA Class"));
            modelOption.add(new Option("Clc", "Clc"));
            modelOption.add(new Option("Clk", "Clk"));
            modelOption.add(new Option("ClS", "ClS"));
            modelOption.add(new Option("E Class", "E Class"));
            modelOption.add(new Option("G Class", "G Class"));
            modelOption.add(new Option("Gl Class", "Gl Class"));
            modelOption.add(new Option("GLA", "GLA"));
            modelOption.add(new Option("GLB", "GLB"));
            modelOption.add(new Option("GLC", "GLC"));
            modelOption.add(new Option("GLE", "GLE"));
            modelOption.add(new Option("GLS", "GLS"));
            modelOption.add(new Option("M Class", "M Class"));
            modelOption.add(new Option("R Class", "R Class"));
            modelOption.add(new Option("S Class", "S Class"));
            modelOption.add(new Option("SL Class", "SL Class"));
            modelOption.add(new Option("SKC", "SKC"));
            modelOption.add(new Option("SLK", "SLK"));
            modelOption.add(new Option("V Class", "V Class"));
            modelOption.add(new Option("Viano", "Viano"));
            modelOption.add(new Option("Vito", "Vito"));
            modelOption.add(new Option("X Class", "X Class"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Porsche":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("718", "718"));
            modelOption.add(new Option("911", "911"));
            modelOption.add(new Option("Boxster", "Boxster"));
            modelOption.add(new Option("Carrera Gt", "Carrera Gt"));
            modelOption.add(new Option("Cayman", "Cayman"));
            modelOption.add(new Option("Macan", "Macan"));
            modelOption.add(new Option("Panamera", "Panamera"));
            modelOption.add(new Option("Taycan", "Taycan"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Skoda":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("Citigo", "Citigo"));
            modelOption.add(new Option("Fabia", "Fabia"));
            modelOption.add(new Option("Kamiq", "Kamiq"));
            modelOption.add(new Option("Kodiaq", "Kodiaq"));
            modelOption.add(new Option("Octavia", "Octavia"));
            modelOption.add(new Option("Rapid", "Rapid"));
            modelOption.add(new Option("Roomster", "Roomster"));
            modelOption.add(new Option("Scala", "Scala"));
            modelOption.add(new Option("Superb", "Superb"));
            modelOption.add(new Option("Yeti", "Yeti"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Volkswagen":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("Amarok", "Amarok"));
            modelOption.add(new Option("Arteon", "Arteon"));
            modelOption.add(new Option("Beetle", "Beetle"));
            modelOption.add(new Option("Bora", "Bora"));
            modelOption.add(new Option("Caddy", "Caddy"));
            modelOption.add(new Option("California", "California"));
            modelOption.add(new Option("Campervan", "Campervan"));
            modelOption.add(new Option("Caravelle", "Caravelle"));
            modelOption.add(new Option("Cc", "Cc"));
            modelOption.add(new Option("Corrado", "Corrado"));
            modelOption.add(new Option("Eos", "Eos"));
            modelOption.add(new Option("Fox", "Fox"));
            modelOption.add(new Option("Golf", "Golf"));
            modelOption.add(new Option("Jetta", "Jetta"));
            modelOption.add(new Option("Lupo", "Lupo"));
            modelOption.add(new Option("Passat", "Passat"));
            modelOption.add(new Option("Phaeton", "Phaeton"));
            modelOption.add(new Option("Polo", "Polo"));
            modelOption.add(new Option("Scirocco", "Scirocco"));
            modelOption.add(new Option("Sharan", "Sharan"));
            modelOption.add(new Option("T-Cross", "T-Cross"));
            modelOption.add(new Option("T-Roc", "T-Roc"));
            modelOption.add(new Option("Tiguan", "Tiguan"));
            modelOption.add(new Option("Touareg", "Touareg"));
            modelOption.add(new Option("Touran", "Touran"));
            modelOption.add(new Option("Transporter", "Transporter"));
            modelOption.add(new Option("Up!", "Up!"));
            modelOption.add(new Option("Others", "Others"));

            break;

        case "Volvo":
            var modelOption = document.getElementById("carModel");         // select
            modelOption.add(new Option("C30", "C30"));
            modelOption.add(new Option("C70", "C70"));
            modelOption.add(new Option("S40", "S40"));
            modelOption.add(new Option("S50", "S50"));
            modelOption.add(new Option("S60", "S60"));
            modelOption.add(new Option("S70", "S70"));
            modelOption.add(new Option("S80", "S80"));
            modelOption.add(new Option("S90", "S90"));
            modelOption.add(new Option("V40", "V40"));
            modelOption.add(new Option("V50", "V50"));
            modelOption.add(new Option("V60", "V60"));
            modelOption.add(new Option("V70", "V70"));
            modelOption.add(new Option("V80", "V80"));
            modelOption.add(new Option("V90", "V90"));
            modelOption.add(new Option("Xc40", "Xc40"));
            modelOption.add(new Option("Xc50", "Xc50"));
            modelOption.add(new Option("Xc60", "Xc60"));
            modelOption.add(new Option("Xc70", "Xc70"));
            modelOption.add(new Option("Xc80", "Xc80"));
            modelOption.add(new Option("Xc90", "Xc90"));
            modelOption.add(new Option("Others", "Others"));

            break;
    }
}