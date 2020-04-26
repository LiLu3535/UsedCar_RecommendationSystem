/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var carDataList = {}, memberList = {};

window.onload = function () {
    changeLogin();
    if (getUserStatus() !== true) {
        window.location.replace("index.html");
    } else {
        document.getElementById('loadingNote').style.display="none";
        document.getElementById('cover').style.display = "none";
        document.getElementById('editMemberWindow').style.display = "none";
        document.getElementById('editCarWindow').style.display = "none";
        document.getElementById('carTableID').style.display = "none";
        getMemberData();
        getCarData();
        loadMemberTable();
        loadCarTable();
        refreshTableBG();
    }

};

var modelSource = {};
modelSource[0] = [{t: 'Any', v: 'Any'}];
//Audi
modelSource[1] = [{t: 'Any', v: 'Any'}, {t: '100', v: '100'}, {t: '80', v: '80'},
    {t: 'A1', v: 'a1'}, {t: 'A2', v: 'a2'}, {t: 'A3', v: 'a3'}, {t: 'A4', v: 'a4'}, {t: 'A5', v: 'a5'}, {t: 'A6', v: 'a6'}, {t: 'A7', v: 'a7'}, {t: 'A8', v: 'a8'},
    {t: 'Allroad', v: 'Allroad'}, {t: 'Cabriolet', v: 'Cabriolet'}, {t: 'Coupe', v: 'Coupe'}, {t: 'E-Tron', v: 'Tron'},
    {t: 'Q1', v: 'q1'}, {t: 'Q2', v: 'q2'}, {t: 'Q3', v: 'q3'}, {t: 'Q4', v: 'q4'}, {t: 'Q5', v: 'q5'}, {t: 'Q6', v: 'q6'}, {t: 'Q7', v: 'q7'}, {t: 'Q8', v: 'q8'},
    {t: 'Quattro', v: 'Quattro'}, {t: 'R8', v: 'R8'}, {t: 'Rs1', v: 'Rs1'}, {t: 'Rs2', v: 'Rs2'}, {t: 'Rs3', v: 'Rs3'}, {t: 'Rs4', v: 'Rs4'}, {t: 'Rs5', v: 'Rs5'}, {t: 'Rs6', v: 'Rs6'}, {t: 'Rs7', v: 'Rs7'},
    {t: 'S1', v: 'S1'}, {t: 'S2', v: 'S2'}, {t: 'S3', v: 'S3'}, {t: 'S4', v: 'S4'}, {t: 'S5', v: 'S5'}, {t: 'S6', v: 'S6'}, {t: 'S7', v: 'S7'}, {t: 'S8', v: 'S8'}, {t: 'S9', v: 'S9'},
    {t: 'TT', v: 'tt'}];

//BMW
modelSource[2] = [{t: 'Any', v: 'Any'}, {t: '1 Series', v: '1er'}, {t: '2 Series', v: '2er'}, {t: '3 Series', v: '3er'}, {t: '4 Series', v: '4er'}, {t: '5 Series', v: '5er'}, {t: '6 Series', v: '6er'}, {t: '7 Series', v: '7er'}, {t: '8 Series', v: '8er'},
    {t: 'Alpina B3', v: 'Alpina B3'}, {t: 'Alpina B4', v: 'Alpina B4'}, {t: 'Alpina B5', v: 'Alpina B5'}, {t: 'Alpina B6', v: 'Alpina B6'}, {t: 'Alpina B7', v: 'Alpina B7'}, {t: 'Alpina D3', v: 'Alpina D3'}, {t: 'Alpina D4', v: 'Alpina D4'}, {t: 'Alpina D5', v: 'Alpina D5'},
    {t: 'I3', v: 'i3'}, {t: 'I8', v: 'I8'}, {t: 'M Series', v: 'm_reihe'}, {t: 'X Series', v: 'x_reihe'}, {t: 'Z Series', v: 'z_reihe'}];

//Ford
modelSource[3] = [{t: 'Any', v: 'Any'}, {t: 'B-max', v: 'b-max'}, {t: 'C-max', v: 'c-max'}, {t: 'Capri', v: 'Capri'}, {t: 'Cortina', v: 'Cortina'}, {t: 'Ecosport', v: 'Ecosport'}, {t: 'Edge', v: 'Edge'}, {t: 'Escort', v: 'escort'},
    {t: 'Expedition', v: 'Expedition'}, {t: 'Explorer', v: 'Explorer'}, {t: 'F150', v: 'F150'}, {t: 'Fiesta', v: 'fiesta'}, {t: 'Focus', v: 'focus'}, {t: 'Freda', v: 'Freda'}, {t: 'Fusion', v: 'fusion'}, {t: 'Galaxy', v: 'galaxy'}, {t: 'Grand', v: 'Grand'},
    {t: 'Gt', v: 'Gt'}, {t: 'Ka', v: 'ka'}, {t: 'Kuga', v: 'kuga'}, {t: 'Mondeo', v: 'mondeo'}, {t: 'Mustang', v: 'mustang'}, {t: 'Puma', v: 'Puma'}, {t: 'Ranger', v: 'Ranger'}, {t: 'S-max', v: 's-max'},
    {t: 'Sierra', v: 'Sierra'}, {t: 'Streetka', v: 'Streetka'}, {t: 'Tourneo', v: 'Tourneo'}, {t: 'Transit', v: 'transit'}];

//Honda
modelSource[4] = [{t: 'Any', v: 'Any'}, {t: 'Accord', v: 'accord'}, {t: 'Civic', v: 'civic'}, {t: 'Cr Series', v: 'cr_reihe'}, {t: 'Elysion', v: 'Elysion'}, {t: 'Fr-v', v: 'Fr-v'}, {t: 'Hr-v', v: 'Hr-v'},
    {t: 'Insight', v: 'Insight'}, {t: 'Integra', v: 'Integra'}, {t: 'Jazz', v: 'jazz'}, {t: 'Legend', v: 'Legend'}, {t: 'Mobilo', v: 'Mobilo'}, {t: 'Nsx', v: 'Nsx'}, {t: 'Odyssey', v: 'Odyssey'}, {t: 'Prelude', v: 'Prelude'},
    {t: 'S2000', v: 'S2000'}, {t: 'Shuttle', v: 'Shuttle'}, {t: 'Stepwagon', v: 'Stepwagon'}, {t: 'Stream', v: 'Stream'}];

//Jeep
modelSource[5] = [{t: 'Any', v: 'Any'}, {t: 'Cherokee', v: 'cherokee'}, {t: 'Commander', v: 'Commander'}, {t: 'Compass', v: 'Compass'}, {t: 'Grand', v: 'grand'}, {t: 'Patriot', v: 'Patriot'},
    {t: 'Renegade', v: 'Renegade'}, {t: 'Willys', v: 'Willys'}, {t: 'Wrangler', v: 'wrangler'}];

//Land Rover
modelSource[6] = [{t: 'Any', v: 'Any'}, {t: '110', v: '110'}, {t: '90', v: '90'}, {t: 'Defender', v: 'defender'}, {t: 'Discovery', v: 'discovery'}, {t: 'Discovery Sport', v: 'discovery_sport'}, {t: 'Freelander', v: 'freelander'}, {t: 'Lightweight', v: 'Lightweight'},
    {t: 'Modified', v: 'Modified'}, {t: 'Range Rover', v: 'range_rover'}, {t: 'Series i', v: 'series_1'}, {t: 'Series ii', v: 'series_2'}, {t: 'Series iii', v: 'series_3'}];

//Mazda
modelSource[7] = [{t: 'Any', v: 'Any'}, {t: '33', v: '33'}, {t: '626', v: '626'}, {t: 'Bongo', v: 'Bongo'}, {t: 'Bt-50', v: 'Bt-50'}, {t: 'CX Series', v: 'cx_reihe'}, {t: 'Mazda1', v: '1_reihe'}, {t: 'Mazda2', v: '2_reihe'}, {t: 'Mazda3', v: '3_reihe'}, {t: 'Mazda4', v: '4_reihe'}, {t: 'Mazda5', v: '5_reihe'},
    {t: 'Mazda6', v: '6_reihe'}, {t: 'Mx Series', v: 'mx_reihe'}, {t: 'Premacy', v: 'Premacy'}, {t: 'Rx Series', v: 'rx_reihe'}, {t: 'Tribute', v: 'Tribute'}];

//Mercedes-Benz
modelSource[8] = [{t: 'Any', v: 'Any'}, {t: 'A Class', v: 'a_klasse'}, {t: 'Amg', v: 'Amg'}, {t: 'B Class', v: 'b_klasse'}, {t: 'C Class', v: 'c_klasse'}, {t: 'Citan', v: 'Citan'}, {t: 'Cl', v: 'cl'}, {t: 'CLA Class', v: 'CLA Class'},
    {t: 'Clc', v: 'Clc'}, {t: 'Clk', v: 'clk'}, {t: 'ClS', v: 'ClS'}, {t: 'E Class', v: 'e_klasse'}, {t: 'G Class', v: 'g_klasse'}, {t: 'Gl Class', v: 'gl'}, {t: 'GLA', v: 'GLA'}, {t: 'GLB', v: 'GLB'}, {t: 'GLC', v: 'GLC'}, {t: 'GLE', v: 'GLE'}, {t: 'GLK', v: 'glk'},
    {t: 'GLS', v: 'GLS'}, {t: 'M Class', v: 'm_klasse'}, {t: 'R Class', v: 'R Class'}, {t: 'S Class', v: 's_klasse'}, {t: 'SL Class', v: 'sl'}, {t: 'SKC', v: 'SKC'}, {t: 'SLK', v: 'slk'}, {t: 'Sprinter', v: 'sprinter'}, {t: 'V Class', v: 'v_klasse'}, {t: 'Viano', v: 'viano'},
    {t: 'Vito', v: 'vito'}];

//Porsche
modelSource[9] = [{t: 'Any', v: 'Any'}, {t: '718', v: '718'}, {t: '911', v: '911'}, {t: 'Boxster', v: 'boxster'}, {t: 'Carrera Gt', v: 'Carrera Gt'}, {t: 'Cayenne', v: 'cayenne'}, {t: 'Macan', v: 'Macan'}, {t: 'Panamera', v: 'Panamera'}, {t: 'Taycan', v: 'Taycan'}];

//Skoda
modelSource[10] = [{t: 'Any', v: 'Any'}, {t: 'Citigo', v: 'citigo'}, {t: 'Fabia', v: 'fabia'}, {t: 'Kamiq', v: 'Kamiq'}, {t: 'Karoq', v: 'Karoq'}, {t: 'Kodiaq', v: 'Kodiaq'}, {t: 'Octavia', v: 'octavia'},
    {t: 'Rapid', v: 'Rapid'}, {t: 'Roomster', v: 'roomster'}, {t: 'Scala', v: 'Scala'}, {t: 'Superb', v: 'superb'}, {t: 'Yeti', v: 'yeti'}];

//Volkswagen
modelSource[11] = [{t: 'Any', v: 'Any'}, {t: 'Amarok', v: 'amarok'}, {t: 'Arteon', v: 'Arteon'}, {t: 'Beetle', v: 'beetle'}, {t: 'Bora', v: 'bora'}, {t: 'Caddy', v: 'caddy'}, {t: 'California', v: 'California'},
    {t: 'Campervan', v: 'Campervan'}, {t: 'Caravelle', v: 'Caravelle'}, {t: 'Cc', v: 'cc'}, {t: 'Corrado', v: 'Corrado'}, {t: 'Eos', v: 'eos'}, {t: 'Fox', v: 'fox'}, {t: 'Golf', v: 'golf'},
    {t: 'Jetta', v: 'jetta'}, {t: 'Kaefer', v: 'kaefer'}, {t: 'Lupo', v: 'lupo'}, {t: 'Passat', v: 'passat'}, {t: 'Phaeton', v: 'phaeton'}, {t: 'Polo', v: 'polo'}, {t: 'Scirocco', v: 'scirocco'}, {t: 'Sharan', v: 'sharan'}, {t: 'T-Cross', v: 'T-Cross'},
    {t: 'T-Roc', v: 'T-Roc'}, {t: 'Tiguan', v: 'tiguan'}, {t: 'Touareg', v: 'touareg'}, {t: 'Touran', v: 'touran'}, {t: 'Transporter', v: 'transporter'}, {t: 'Up!', v: 'up'}];

//Volvo
modelSource[12] = [{t: 'Any', v: 'Any'}, {t: '850', v: '850'}, {t: 'C Series', v: 'c_reihe'}, {t: 'S40', v: 'S40'}, {t: 'S50', v: 'S50'}, {t: 'S60', v: 's60'}, {t: 'S70', v: 'S70'}, {t: 'S80', v: 'S80'}, {t: 'S90', v: 'S90'},
    {t: 'V40', v: 'v40'}, {t: 'V50', v: 'v50'}, {t: 'V60', v: 'v60'}, {t: 'V70', v: 'v70'}, {t: 'V80', v: 'v80'}, {t: 'V90', v: 'v90'}, {t: 'XC Series', v: 'xc_reihe'}];

function getMemberData() {
    var result;
    var passedInfo = {
        "method": "getMemberList"
    };
    $.ajax({
        async: false,
        url: "ManagerServlet",
        method: "post",
        dataType: "text",
        data: passedInfo,
        success: function (data) {
            result = data;
            var members = result.split(";");
            for (var i = 0; i < members.length; i++) {
                var thisMember = members[i].split(",");
                memberList[i] = {
                    'id': thisMember[0], 'email': thisMember[1], 'otherName': thisMember[2],
                    'lastName': thisMember[3], 'phone': thisMember[4]
                };
            }

        },
        error: function (error) {
            alert(error.status + "," + error.statusText);
            window.location.reload();
        }
    });
    return result;
}

function getCarData() {
    var result;
    var passedInfo = {
        "method": "getCarList"
    };
    $.ajax({
        async: false,
        url: "ManagerServlet",
        method: "post",
        dataType: "text",
        data: passedInfo,
        success: function (data) {
            result = data;

            var cars = result.split(";");
            for (var i = 0; i < cars.length; i++) {
                var thisCar = cars[i].split(",");
                carDataList[i] = {
                    'id': thisCar[0], 'model': thisCar[1], 'brand': thisCar[2], 'price': thisCar[3],
                    'sellerID': thisCar[4], 'year': thisCar[5], 'mileage': thisCar[6], 'power': thisCar[7],
                    'note': thisCar[8], 'fuelCons': thisCar[9], 'registerDate': thisCar[10]};
            }
        },
        error: function (error) {
            alert(error.status + "," + error.statusText);
            window.location.reload();
        }
    });
    return result;
}

function loadMemberTable() {
    var memberTable = document.getElementById('memberTableID');
    for (var i = 0; i < Object.keys(memberList).length - 1; i++) {
        var td_actions = document.createElement("td");
        var editBtt = document.createElement("a");
        var deleteBtt = document.createElement("a");
        editBtt.innerHTML = "Edit";
        editBtt.setAttribute("class", "manager-editBtt");
        editBtt.setAttribute("href", "javascript:void(0);");
        editBtt.setAttribute("onclick", "showMemberEditWindow(this)");
        deleteBtt.innerHTML = "Delete";
        deleteBtt.setAttribute("class", "manager-deleteBtt");
        deleteBtt.setAttribute("href", "javascript:void(0);");
        deleteBtt.setAttribute("onclick", "deleteMember(this)");
        td_actions.appendChild(editBtt);
        td_actions.appendChild(deleteBtt);
        var tr = document.createElement("tr");
        var td_email = document.createElement("td");
        var td_otherName = document.createElement("td");
        var td_lastName = document.createElement("td");
        var td_phone = document.createElement("td");
        td_email.innerHTML = memberList[i].email;
        td_otherName.innerHTML = memberList[i].otherName;
        td_lastName.innerHTML = memberList[i].lastName;
        td_phone.innerHTML = memberList[i].phone;
        tr.setAttribute("id", "trMem_" + i);
        editBtt.setAttribute("name", "memIdx_" + i);
        deleteBtt.setAttribute("name", "memIdx_" + i);
        tr.appendChild(td_email);
        tr.appendChild(td_otherName);
        tr.appendChild(td_lastName);
        tr.appendChild(td_phone);
        tr.appendChild(td_actions);
        memberTable.appendChild(tr);
    }
}

function loadCarTable() {
    var carTable = document.getElementById('carTableID');



    for (var i = 0; i < i < Object.keys(carDataList).length - 1; i++) {
        var td_actions = document.createElement("td");
        var editBtt = document.createElement("a");
        var deleteBtt = document.createElement("a");
        editBtt.innerHTML = "Edit";
        editBtt.setAttribute("class", "manager-editBtt");
        editBtt.setAttribute("href", "javascript:void(0);");
        editBtt.setAttribute("onclick", "showCarEditWindow(this)");
        deleteBtt.innerHTML = "Delete";
        deleteBtt.setAttribute("class", "manager-deleteBtt");
        deleteBtt.setAttribute("href", "javascript:void(0);");
        deleteBtt.setAttribute("onclick", "deleteCar(this)");
        td_actions.appendChild(editBtt);
        td_actions.appendChild(deleteBtt);

        var tr = document.createElement("tr");
        var td_make = document.createElement("td");
        var td_model = document.createElement("td");
        var td_price = document.createElement("td");
        var td_year = document.createElement("td");
        var td_mileage = document.createElement("td");
        var td_fuelCons = document.createElement("td");
        var td_powerType = document.createElement("td");
        var td_note = document.createElement("td");

        td_make.innerHTML = carDataList[i].brand;
        td_model.innerHTML = carDataList[i].model;
        td_price.innerHTML = carDataList[i].price;
        td_year.innerHTML = carDataList[i].registerDate;
        td_mileage.innerHTML = carDataList[i].mileage;
        td_fuelCons.innerHTML = carDataList[i].fuelCons;
        td_powerType.innerHTML = carDataList[i].power;
        td_note.innerHTML = carDataList[i].note;

        tr.setAttribute("id", "trCar_" + i);
        editBtt.setAttribute("name", "carIdx_" + i);
        deleteBtt.setAttribute("name", "carIdx_" + i);

        tr.appendChild(td_make);
        tr.appendChild(td_model);
        tr.appendChild(td_price);
        tr.appendChild(td_year);
        tr.appendChild(td_mileage);
        tr.appendChild(td_fuelCons);
        tr.appendChild(td_powerType);
        tr.appendChild(td_note);
        tr.appendChild(td_actions);
        carTable.appendChild(tr);
    }
}

function showMemberTable() {
    document.getElementById('memberTableID').style.display = "";
    document.getElementById('carTableID').style.display = "none";

    document.getElementById('memberBtt').style.backgroundColor = "#aa4e01";
    document.getElementById('memberBtt').onclick = "";
    document.getElementById('carBtt').style.backgroundColor = "#ec9600";
    document.getElementById('carBtt').onclick = showCarTable;
}

function showCarTable() {
    document.getElementById('memberTableID').style.display = "none";
    document.getElementById('carTableID').style.display = "";

    document.getElementById('carBtt').style.backgroundColor = "#aa4e01";
    document.getElementById('carBtt').onclick = "";
    document.getElementById('memberBtt').style.backgroundColor = "#ec9600";
    document.getElementById('memberBtt').onclick = showMemberTable;

}

function refreshTableBG() {
    altRows('memberTableID');
    altRows('carTableID');
}

function altRows(id) {
    if (document.getElementsByTagName) {

        var table = document.getElementById(id);
        var rows = table.getElementsByTagName("tr");

        for (i = 0; i < rows.length; i++) {
            if (i % 2 === 0) {
                rows[i].className = "manager-tableBG1";
            } else {
                rows[i].className = "manager-tableBG2";
            }
        }
    }
}

function showMemberEditWindow(btt) {
    var btt_name = btt.name;    //"memIdx_"+index of the memeber in memberList
    var memIdx = btt_name.substring(7, btt_name.length);

    var email_Val = memberList[memIdx].email;
    var otherName_Val = memberList[memIdx].otherName;
    var lastName_Val = memberList[memIdx].lastName;
    var phone_Val = memberList[memIdx].phone;

    document.getElementById('cover').style.display = "";
    document.getElementById('editMemberWindow').style.display = "";

    var email_Ele = document.getElementById('edit-email');
    var otherName_Ele = document.getElementById('edit-otherName');
    var lastName_Ele = document.getElementById('edit-lastName');
    var phone_Ele = document.getElementById('edit-phone');

    email_Ele.value = email_Val;
    otherName_Ele.value = otherName_Val;
    lastName_Ele.value = lastName_Val;
    phone_Ele.value = phone_Val;

    var confirmBtt = document.getElementById("memberEdit-confirm");
    var memIdx_Str = btt.name;
    confirmBtt.setAttribute("name", memIdx_Str);
}

function showCarEditWindow(btt) {
    var btt_name = btt.name;    //"memIdx_"+index of the memeber in memberList
    var carIdx = btt_name.substring(7, btt_name.length);

    var selectMake_Val = carDataList[carIdx].brand;
    var selectModel_Val = carDataList[carIdx].model;
    var price_Val = carDataList[carIdx].price;
    var year_Val = carDataList[carIdx].registerDate;
    var milage_Val = carDataList[carIdx].mileage;
    var fuelConsumption_Val = carDataList[carIdx].fuelCons;
    var powerType_Val = carDataList[carIdx].power;
    var note_Val = carDataList[carIdx].note;


    document.getElementById('cover').style.display = "";
    var carWindow = document.getElementById('editCarWindow');
    carWindow.style.display = "";

    var price_Ele = document.getElementById('edit-price');
    var year_Ele = document.getElementById('edit-year');
    var milage_Ele = document.getElementById('edit-milage');
    var fuelConsumption = document.getElementById('edit-fuelConsumption');
    var petrol_Ele = document.getElementById('edit-petrol');
    var diesel_Ele = document.getElementById('edit-diesel');
    var electric_Ele = document.getElementById('edit-electric');
    var note_Ele = document.getElementById('edit-note');

    price_Ele.value = price_Val;
    var yearNum = year_Val.substring(0, 4);
    var monthNum = year_Val.substring(5, 7);
    var dayNum = parseInt(year_Val.substring(8, 10)) + 1;
    year_Ele.valueAsDate = new Date(monthNum + "-" + dayNum + "-" + yearNum);
    milage_Ele.value = milage_Val;
    fuelConsumption.value = fuelConsumption_Val;
    if (powerType_Val === "Petrol") {
        petrol_Ele.checked = "checked";
    } else if (powerType_Val === "Diesel") {
        diesel_Ele.checked = "checked";
    } else if (powerType_Val === "Electric") {
        electric_Ele.checked = "checked";
    }
    note_Ele.value = note_Val;

    var selectMake_Ele = document.getElementById('edit-selectMake');
    for (var idx = 1; idx < selectMake_Ele.options.length; idx++) {
        if (selectMake_Val === selectMake_Ele.options[idx].innerHTML) {
            selectMake_Ele.options[idx].selected = true;
            break;
        }
    }
    var v = document.getElementById('edit-selectMake').value;
    var select = document.getElementById('edit-selectModel');
    var arr = modelSource[v];
    if (v === 0) {
        select.disabled = true;
    } else {
        select.disabled = false;
    }
    select.options.length = 0;
    for (var i = 0, j = arr.length; i < j; i++) {
        select.options.add(new Option(arr[i].t, arr[i].v));
    }

    var selectModel_Ele = document.getElementById('edit-selectModel');
    for (var idx = 1; idx <= selectModel_Ele.options.length; idx++) {
        if (selectModel_Val === selectModel_Ele.options[idx].value) {
            selectModel_Ele.options[idx].selected = true;
            break;
        }
    }

    var confirmBtt = document.getElementById("carEdit-confirm");
    var carIdx_Str = btt.name;
    confirmBtt.setAttribute("name", carIdx_Str);
}

function addOptions(v) {
    var select = document.getElementById('edit-selectModel');
    var arr = modelSource[v];
    if (v === 0) {
        select.disabled = true;
    } else {
        select.disabled = false;
    }
    select.options.length = 0;

    for (var i = 0, j = arr.length; i < j; i++) {
        select.options.add(new Option(arr[i].t, arr[i].v));
    }

}

function deleteMember(btt) {
    var btt_name = btt.name;    //"memIdx_"+index of the memeber in memberList
    var memIdx = btt_name.substring(7, btt_name.length);
    var memID = memberList[memIdx].id;

    var otherName_Val = memberList[memIdx].otherName;
    var lastName_Val = memberList[memIdx].lastName;

    var thisLine = btt.parentNode.parentNode;
    if (confirm("Are you sure to delete " + otherName_Val + " " + lastName_Val + "'s record?")) {

        var result;
        var passedInfo = {
            "method": "deleteMember",
            "memberID": memID
        };
        $.ajax({
            async: false,
            url: "ManagerServlet",
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

        thisLine.parentNode.removeChild(thisLine);
        refreshTableBG();
        alert("You have deleted this member!");
    }
}

function deleteCar(btt) {
    var btt_name = btt.name;    //"memIdx_"+index of the memeber in memberList
    var carIdx = btt_name.substring(7, btt_name.length);
    var carID = carDataList[carIdx].id;

    var selectMake_Val = btt.parentNode.parentNode.childNodes[1].innerHTML;
    var selectMmodel_Val = btt.parentNode.parentNode.childNodes[2].innerHTML;
    var thisLine = btt.parentNode.parentNode;
    if (confirm("Are you sure to delete this" + selectMake_Val + " " + selectMmodel_Val + " ?")) {

        var result;
        var passedInfo = {
            "method": "deleteCar",
            "carID": carID
        };
        $.ajax({
            async: false,
            url: "ManagerServlet",
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

        thisLine.parentNode.removeChild(thisLine);
        refreshTableBG();
        alert("You have deleted this car!");
    }
}

function closePump() {
    document.getElementById('cover').style.display = "none";
    document.getElementById('editMemberWindow').style.display = "none";
    document.getElementById('editCarWindow').style.display = "none";
}

function confirmMemberEdit(btt) {

    var btt_name = btt.name;    //"memIdx_"+index of the memeber in memberList
    var memIdx = btt_name.substring(7, btt_name.length);
    var memID = memberList[memIdx].id;

    var email_Val = document.getElementById('edit-email').value;
    var otherName_Val = document.getElementById('edit-otherName').value;
    var lastName_Val = document.getElementById('edit-lastName').value;
    var phone_Val = document.getElementById('edit-phone').value;
    //TODO: change database!!!!!!!!!!!!!!!!!!!
    var result;
    var passedInfo = {
        "method": "updateMember",
        "memberID": memID,
        "email": email_Val,
        "otherName": otherName_Val,
        "lastName": lastName_Val,
        "phone": phone_Val}
    ;

    $.ajax({
        async: false,
        url: "ManagerServlet",
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

    if (result === "true") {       //Sccuessfully changed database
        //Update memberList
        memberList[memIdx].email = email_Val;
        memberList[memIdx].otherName = otherName_Val;
        memberList[memIdx].lastName = lastName_Val;
        memberList[memIdx].phone = phone_Val;

        //Update values shown in table
        var tr = document.getElementById("trMem_" + memIdx);
        tr.childNodes[0].innerHTML = email_Val;
        tr.childNodes[1].innerHTML = otherName_Val;
        tr.childNodes[2].innerHTML = lastName_Val;
        tr.childNodes[3].innerHTML = phone_Val;
        alert("Successfully changed this member's information!");
    } else {
        alert("Failed to change this member's information!");
    }

    document.getElementById('cover').style.display = "none";
    document.getElementById('editMemberWindow').style.display = "none";
}

function confirmCarEdit(btt) {
    var btt_name = btt.name;    //"memIdx_"+index of the memeber in memberList
    var carIdx = btt_name.substring(7, btt_name.length);
    var carID = carDataList[carIdx].id;

    var make_idx = document.getElementById('edit-selectMake').value;
    var make_Val = document.getElementById('edit-selectMake').options[make_idx].innerHTML;
    var model_Val = document.getElementById('edit-selectModel').value;
    var price_Val = document.getElementById('edit-price').value;
    var year_Val = document.getElementById('edit-year').value;
    var milage_Val = document.getElementById('edit-milage').value;
    var fuelConsumption_Val = document.getElementById('edit-fuelConsumption').value;
    var note_Val = document.getElementById('edit-note').value;
    var powerType_Val;
    if (document.getElementById('edit-petrol').checked) {
        powerType_Val = "Petrol";
    } else if (document.getElementById('edit-diesel').checked) {
        powerType_Val = "Diesel";
    } else if (document.getElementById('edit-electric').checked) {
        powerType_Val = "Electric";
    }

    var result;
    var passedInfo = {
        "method": "updateCar",
        "carID": carID,
        "make": make_Val,
        "model": model_Val,
        "price": price_Val,
        "year": year_Val,
        "mileage": milage_Val,
        "fuelCons": fuelConsumption_Val,
        "powerType": powerType_Val,
        "note": note_Val}
    ;

    $.ajax({
        async: false,
        url: "ManagerServlet",
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


    if (result === "true") {
        //Update carList
        carDataList[carIdx].brand = make_idx;
        carDataList[carIdx].model = model_Val;
        carDataList[carIdx].price = price_Val;
        carDataList[carIdx].year = year_Val;
        carDataList[carIdx].mileage = milage_Val;
        carDataList[carIdx].fuelCons = fuelConsumption_Val;
        carDataList[carIdx].power = powerType_Val;
        carDataList[carIdx].note = note_Val;

        //Update values shown in table
        var tr = document.getElementById("trCar_" + carIdx);
        tr.childNodes[0].innerHTML = make_Val;
        tr.childNodes[1].innerHTML = model_Val;
        tr.childNodes[2].innerHTML = price_Val;
        tr.childNodes[3].innerHTML = year_Val;
        tr.childNodes[4].innerHTML = milage_Val;
        tr.childNodes[5].innerHTML = fuelConsumption_Val;
        tr.childNodes[6].innerHTML = powerType_Val;
        tr.childNodes[7].innerHTML = note_Val;

        alert("Successfully changed this member's information!");
    } else {
        alert("Failed to change this member's information!");
    }

    document.getElementById('cover').style.display = "none";
    document.getElementById('editCarWindow').style.display = "none";
}