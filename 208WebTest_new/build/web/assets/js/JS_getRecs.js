/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var carList = {};

window.onload = function () {
    changeLogin();
};

var modelData = {};
modelData[0] = [{t: 'Any', v: 'Any'}];
//Audi
modelData[1] = [{t: 'Any', v: 'Any'}, {t: '100', v: '100'}, {t: '80', v: '80'},
    {t: 'A1', v: 'a1'}, {t: 'A2', v: 'a2'}, {t: 'A3', v: 'a3'}, {t: 'A4', v: 'a4'}, {t: 'A5', v: 'a5'}, {t: 'A6', v: 'a6'}, {t: 'A7', v: 'a7'}, {t: 'A8', v: 'a8'},
    {t: 'Allroad', v: 'Allroad'}, {t: 'Cabriolet', v: 'Cabriolet'}, {t: 'Coupe', v: 'Coupe'}, {t: 'E-Tron', v: 'Tron'},
    {t: 'Q1', v: 'q1'}, {t: 'Q2', v: 'q2'}, {t: 'Q3', v: 'q3'}, {t: 'Q4', v: 'q4'}, {t: 'Q5', v: 'q5'}, {t: 'Q6', v: 'q6'}, {t: 'Q7', v: 'q7'}, {t: 'Q8', v: 'q8'},
    {t: 'Quattro', v: 'Quattro'}, {t: 'R8', v: 'R8'}, {t: 'Rs1', v: 'Rs1'}, {t: 'Rs2', v: 'Rs2'}, {t: 'Rs3', v: 'Rs3'}, {t: 'Rs4', v: 'Rs4'}, {t: 'Rs5', v: 'Rs5'}, {t: 'Rs6', v: 'Rs6'}, {t: 'Rs7', v: 'Rs7'},
    {t: 'S1', v: 'S1'}, {t: 'S2', v: 'S2'}, {t: 'S3', v: 'S3'}, {t: 'S4', v: 'S4'}, {t: 'S5', v: 'S5'}, {t: 'S6', v: 'S6'}, {t: 'S7', v: 'S7'}, {t: 'S8', v: 'S8'}, {t: 'S9', v: 'S9'},
    {t: 'TT', v: 'tt'}];

//BMW
modelData[2] = [{t: 'Any', v: 'Any'}, {t: '1 Series', v: '1er'}, {t: '2 Series', v: '2er'}, {t: '3 Series', v: '3er'}, {t: '4 Series', v: '4er'}, {t: '5 Series', v: '5er'}, {t: '6 Series', v: '6er'}, {t: '7 Series', v: '7er'}, {t: '8 Series', v: '8er'},
    {t: 'Alpina B3', v: 'Alpina B3'}, {t: 'Alpina B4', v: 'Alpina B4'}, {t: 'Alpina B5', v: 'Alpina B5'}, {t: 'Alpina B6', v: 'Alpina B6'}, {t: 'Alpina B7', v: 'Alpina B7'}, {t: 'Alpina D3', v: 'Alpina D3'}, {t: 'Alpina D4', v: 'Alpina D4'}, {t: 'Alpina D5', v: 'Alpina D5'},
    {t: 'I3', v: 'i3'}, {t: 'I8', v: 'I8'}, {t: 'M Series', v: 'm_reihe'}, {t: 'X Series', v: 'x_reihe'}, {t: 'Z Series', v: 'z_reihe'}];

//Ford
modelData[3] = [{t: 'Any', v: 'Any'}, {t: 'B-max', v: 'b-max'}, {t: 'C-max', v: 'c-max'}, {t: 'Capri', v: 'Capri'}, {t: 'Cortina', v: 'Cortina'}, {t: 'Ecosport', v: 'Ecosport'}, {t: 'Edge', v: 'Edge'}, {t: 'Escort', v: 'escort'},
    {t: 'Expedition', v: 'Expedition'}, {t: 'Explorer', v: 'Explorer'}, {t: 'F150', v: 'F150'}, {t: 'Fiesta', v: 'fiesta'}, {t: 'Focus', v: 'focus'}, {t: 'Freda', v: 'Freda'}, {t: 'Fusion', v: 'fusion'}, {t: 'Galaxy', v: 'galaxy'}, {t: 'Grand', v: 'Grand'},
    {t: 'Gt', v: 'Gt'}, {t: 'Ka', v: 'ka'}, {t: 'Kuga', v: 'kuga'}, {t: 'Mondeo', v: 'mondeo'}, {t: 'Mustang', v: 'mustang'}, {t: 'Puma', v: 'Puma'}, {t: 'Ranger', v: 'Ranger'}, {t: 'S-max', v: 's-max'},
    {t: 'Sierra', v: 'Sierra'}, {t: 'Streetka', v: 'Streetka'}, {t: 'Tourneo', v: 'Tourneo'}, {t: 'Transit', v: 'transit'}];

//Honda
modelData[4] = [{t: 'Any', v: 'Any'}, {t: 'Accord', v: 'accord'}, {t: 'Civic', v: 'civic'}, {t: 'Cr Series', v: 'cr_reihe'}, {t: 'Elysion', v: 'Elysion'}, {t: 'Fr-v', v: 'Fr-v'}, {t: 'Hr-v', v: 'Hr-v'},
    {t: 'Insight', v: 'Insight'}, {t: 'Integra', v: 'Integra'}, {t: 'Jazz', v: 'jazz'}, {t: 'Legend', v: 'Legend'}, {t: 'Mobilo', v: 'Mobilo'}, {t: 'Nsx', v: 'Nsx'}, {t: 'Odyssey', v: 'Odyssey'}, {t: 'Prelude', v: 'Prelude'},
    {t: 'S2000', v: 'S2000'}, {t: 'Shuttle', v: 'Shuttle'}, {t: 'Stepwagon', v: 'Stepwagon'}, {t: 'Stream', v: 'Stream'}];

//Jeep
modelData[5] = [{t: 'Any', v: 'Any'}, {t: 'Cherokee', v: 'cherokee'}, {t: 'Commander', v: 'Commander'}, {t: 'Compass', v: 'Compass'}, {t: 'Grand', v: 'grand'}, {t: 'Patriot', v: 'Patriot'},
    {t: 'Renegade', v: 'Renegade'}, {t: 'Willys', v: 'Willys'}, {t: 'Wrangler', v: 'wrangler'}];

//Land Rover
modelData[6] = [{t: 'Any', v: 'Any'}, {t: '110', v: '110'}, {t: '90', v: '90'}, {t: 'Defender', v: 'defender'}, {t: 'Discovery', v: 'discovery'}, {t: 'Discovery Sport', v: 'discovery_sport'}, {t: 'Freelander', v: 'freelander'}, {t: 'Lightweight', v: 'Lightweight'},
    {t: 'Modified', v: 'Modified'}, {t: 'Range Rover', v: 'range_rover'}, {t: 'Series i', v: 'series_1'}, {t: 'Series ii', v: 'series_2'}, {t: 'Series iii', v: 'series_3'}];

//Mazda
modelData[7] = [{t: 'Any', v: 'Any'}, {t: '33', v: '33'}, {t: '626', v: '626'}, {t: 'Bongo', v: 'Bongo'}, {t: 'Bt-50', v: 'Bt-50'}, {t: 'CX Series', v: 'cx_reihe'}, {t: 'Mazda1', v: '1_reihe'}, {t: 'Mazda2', v: '2_reihe'}, {t: 'Mazda3', v: '3_reihe'}, {t: 'Mazda4', v: '4_reihe'}, {t: 'Mazda5', v: '5_reihe'},
    {t: 'Mazda6', v: '6_reihe'}, {t: 'Mx Series', v: 'mx_reihe'}, {t: 'Premacy', v: 'Premacy'}, {t: 'Rx Series', v: 'rx_reihe'}, {t: 'Tribute', v: 'Tribute'}];

//Mercedes-Benz
modelData[8] = [{t: 'Any', v: 'Any'}, {t: 'A Class', v: 'a_klasse'}, {t: 'Amg', v: 'Amg'}, {t: 'B Class', v: 'b_klasse'}, {t: 'C Class', v: 'c_klasse'}, {t: 'Citan', v: 'Citan'}, {t: 'Cl', v: 'cl'}, {t: 'CLA Class', v: 'CLA Class'},
    {t: 'Clc', v: 'Clc'}, {t: 'Clk', v: 'clk'}, {t: 'ClS', v: 'ClS'}, {t: 'E Class', v: 'e_klasse'}, {t: 'G Class', v: 'g_klasse'}, {t: 'Gl Class', v: 'gl'}, {t: 'GLA', v: 'GLA'}, {t: 'GLB', v: 'GLB'}, {t: 'GLC', v: 'GLC'}, {t: 'GLE', v: 'GLE'}, {t: 'GLK', v: 'glk'},
    {t: 'GLS', v: 'GLS'}, {t: 'M Class', v: 'm_klasse'}, {t: 'R Class', v: 'R Class'}, {t: 'S Class', v: 's_klasse'}, {t: 'SL Class', v: 'sl'}, {t: 'SKC', v: 'SKC'}, {t: 'SLK', v: 'slk'}, {t: 'Sprinter', v: 'sprinter'}, {t: 'V Class', v: 'v_klasse'}, {t: 'Viano', v: 'viano'},
    {t: 'Vito', v: 'vito'}];

//Porsche
modelData[9] = [{t: 'Any', v: 'Any'}, {t: '718', v: '718'}, {t: '911', v: '911'}, {t: 'Boxster', v: 'boxster'}, {t: 'Carrera Gt', v: 'Carrera Gt'}, {t: 'Cayenne', v: 'cayenne'}, {t: 'Macan', v: 'Macan'}, {t: 'Panamera', v: 'Panamera'}, {t: 'Taycan', v: 'Taycan'}];

//Skoda
modelData[10] = [{t: 'Any', v: 'Any'}, {t: 'Citigo', v: 'citigo'}, {t: 'Fabia', v: 'fabia'}, {t: 'Kamiq', v: 'Kamiq'}, {t: 'Karoq', v: 'Karoq'}, {t: 'Kodiaq', v: 'Kodiaq'}, {t: 'Octavia', v: 'octavia'},
    {t: 'Rapid', v: 'Rapid'}, {t: 'Roomster', v: 'roomster'}, {t: 'Scala', v: 'Scala'}, {t: 'Superb', v: 'superb'}, {t: 'Yeti', v: 'yeti'}];

//Volkswagen
modelData[11] = [{t: 'Any', v: 'Any'}, {t: 'Amarok', v: 'amarok'}, {t: 'Arteon', v: 'Arteon'}, {t: 'Beetle', v: 'beetle'}, {t: 'Bora', v: 'bora'}, {t: 'Caddy', v: 'caddy'}, {t: 'California', v: 'California'},
    {t: 'Campervan', v: 'Campervan'}, {t: 'Caravelle', v: 'Caravelle'}, {t: 'Cc', v: 'cc'}, {t: 'Corrado', v: 'Corrado'}, {t: 'Eos', v: 'eos'}, {t: 'Fox', v: 'fox'}, {t: 'Golf', v: 'golf'},
    {t: 'Jetta', v: 'jetta'}, {t: 'Kaefer', v: 'kaefer'}, {t: 'Lupo', v: 'lupo'}, {t: 'Passat', v: 'passat'}, {t: 'Phaeton', v: 'phaeton'}, {t: 'Polo', v: 'polo'}, {t: 'Scirocco', v: 'scirocco'}, {t: 'Sharan', v: 'sharan'}, {t: 'T-Cross', v: 'T-Cross'},
    {t: 'T-Roc', v: 'T-Roc'}, {t: 'Tiguan', v: 'tiguan'}, {t: 'Touareg', v: 'touareg'}, {t: 'Touran', v: 'touran'}, {t: 'Transporter', v: 'transporter'}, {t: 'Up!', v: 'up'}];

//Volvo
modelData[12] = [{t: 'Any', v: 'Any'}, {t: '850', v: '850'}, {t: 'C Series', v: 'c_reihe'}, {t: 'S40', v: 'S40'}, {t: 'S50', v: 'S50'}, {t: 'S60', v: 's60'}, {t: 'S70', v: 'S70'}, {t: 'S80', v: 'S80'}, {t: 'S90', v: 'S90'},
    {t: 'V40', v: 'v40'}, {t: 'V50', v: 'v50'}, {t: 'V60', v: 'v60'}, {t: 'V70', v: 'v70'}, {t: 'V80', v: 'v80'}, {t: 'V90', v: 'v90'}, {t: 'XC Series', v: 'xc_reihe'}];
function addOptions(v) {
    var select = document.getElementById('getRec_selectModel');
    var arr = modelData[v];
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

function addOptions_soft(v) {
    var select = document.getElementById('getRec_softSelectModel');
    var arr = modelData[v];
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


var tempNum1 = 0, tempNum2 = 0, tempNum3 = 0,
        tempNum4 = 0, tempNum5 = 0, tempNum6 = 0;


function showStar(cardID) {

    var finalNum, tempNum;
    var lis = document.getElementById(cardID).getElementsByTagName("li");

    function getTempNum() {
        if (cardID === 'fiveStars1')
            return tempNum1;
        if (cardID === 'fiveStars2')
            return tempNum2;
        if (cardID === 'fiveStars3')
            return tempNum3;
        if (cardID === 'fiveStars4')
            return tempNum4;
        if (cardID === 'fiveStars5')
            return tempNum5;
        if (cardID === 'fiveStars6')
            return tempNum6;
    }

    function ligtenStar(num) {
        finalNum = num || getTempNum();   //If number==0, finalNum=tempNum
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = i < finalNum ? "starLighten" : "";
        }
    }

    for (var j = 1; j <= lis.length; j++) {

        lis[j - 1].index = j;

        lis[j - 1].onmouseover = function () {
            ligtenStar(this.index);

        };
        lis[j - 1].onmouseout = function () {
            ligtenStar(0);
        };
        lis[j - 1].onclick = function () {
            var x = getTempNum();
            x = this.index;

            if (cardID === 'fiveStars1')
                tempNum1 = this.index;
            if (cardID === 'fiveStars2')
                tempNum2 = this.index;
            if (cardID === 'fiveStars3')
                tempNum3 = this.index;
            if (cardID === 'fiveStars4')
                tempNum4 = this.index;
            if (cardID === 'fiveStars5')
                tempNum5 = this.index;
            if (cardID === 'fiveStars6')
                tempNum6 = this.index;
        };

    }

}

function keepStars(lis, tempNum) {
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = i < tempNum ? "starLighten" : "";
    }
}


keepStars(document.getElementById("fiveStars1").getElementsByTagName("li"), tempNum1);
keepStars(document.getElementById("fiveStars2").getElementsByTagName("li"), tempNum2);
keepStars(document.getElementById("fiveStars3").getElementsByTagName("li"), tempNum3);
keepStars(document.getElementById("fiveStars4").getElementsByTagName("li"), tempNum4);
keepStars(document.getElementById("fiveStars5").getElementsByTagName("li"), tempNum5);
keepStars(document.getElementById("fiveStars6").getElementsByTagName("li"), tempNum6);



function recResultUpload() {
    var result;
    //Get conditions for hard recommendations

    var hard_makeEle = document.getElementById("getRec_selectMake");
    var hardMakeIdx = hard_makeEle.value;
    var hard_make = hard_makeEle.childNodes[hardMakeIdx * 2 + 1].innerHTML;
    var hard_model = document.getElementById("getRec_selectModel").value;
    var hard_minPrice = document.getElementById("minPrice").value;
    var hard_maxPrice = document.getElementById("maxPrice").value;
    var hard_minYear = document.getElementById("minYear").value;
    var hard_maxYear = document.getElementById("maxYear").value;
    var hard_mileage = document.getElementById("mileage").value;

    if (hard_make === "Any") {
        hard_make = "null";
    }
    if (hard_minPrice === "") {
        hard_minPrice = "null";
    }
    if (hard_maxPrice === "") {
        hard_maxPrice = "null";
    }
    if (hard_minYear === "") {
        hard_minYear = "null";
    }
    if (hard_maxYear === "") {
        hard_maxYear = "null";
    }
    if (hard_mileage === "") {
        hard_mileage = "null";
    }

    var fuelRadios = document.getElementsByName("fuelConsumption");

    var hard_fuelCons = null;
    for (var i = 0; i < fuelRadios.length; i++) {
        if (fuelRadios[i].checked) {
            hard_fuelCons = fuelRadios[i].value;
            break;
        }
    }
    if (hard_fuelCons === "Any") {
        hard_fuelCons = "null";
    }

    var powerRadios = document.getElementsByName("powertype");
    var hard_power = null;
    for (var i = 0; i < powerRadios.length; i++) {
        if (powerRadios[i].checked) {
            hard_power = powerRadios[i].value;
            break;
        }
    }
    if (hard_power === "Any") {
        hard_power = "null";
    }

    if (hard_model === "noMake" || hard_model === "Any") {
        hard_model = "null";
    }

    //Get conditions for soft recommendations
    var soft_makeEle = document.getElementById("getRec_softSelectMake");
    var softMakeIdx = soft_makeEle.value;
    var soft_make = soft_makeEle.childNodes[softMakeIdx * 2 + 1].innerHTML;
    var soft_model = document.getElementById("getRec_softSelectModel").value;
    var soft_price = document.getElementById("softPrice").value;
    var soft_age = document.getElementById("softYear").value;
    var soft_mileage = document.getElementById("softMileage").value;
    var soft_fuelCons = document.getElementById("softFuelCons").value;

    if (soft_make === "Any") {
        soft_make = "null";
    }
    if (soft_model === "noMake" || soft_model === "Any") {
        soft_model = "null";
    }
    if (soft_price === "") {
        soft_price = "null";
    }
    if (soft_age === "") {
        soft_age = "null";
    }
    if (soft_mileage === "") {
        soft_mileage = "null";
    }

    if (soft_fuelCons === "") {
        soft_fuelCons = "null";
    }
    //Send conditions
    var recCar = {
        "method": "recResultUpload",
        "hard_make": hard_make,
        "hard_minPrice": hard_minPrice,
        "hard_maxPrice": hard_maxPrice,
        "hard_minYear": hard_minYear,
        "hard_maxYear": hard_maxYear,
        "hard_mileage": hard_mileage,
        "hard_power": hard_power,
        "hard_model": hard_model,
        "hard_fuelCons": hard_fuelCons,
        "softMake": soft_make,
        "softPrice": soft_price,
        "softYear": soft_age,
        "softMileage": soft_mileage,
        "softModel": soft_model,
        "softFuelConsumption": soft_fuelCons,
        "star1": tempNum1,
        "star2": tempNum3,
        "star3": tempNum4,
        "star4": tempNum5,
        "star5": tempNum2,
        "star6": tempNum6
    };
    $.ajax({
        async: false,
        url: "IndexResponseServlet",
        method: "post",
        dataType: "text",
        data: recCar,
        success: function (data) {

            result = data;

            window.localStorage.setItem("carSource", result);
            window.location.replace("recResults.html");

        }, error: function (error) {
            alert(error.status + "," + error.statusText);
            window.location.reload();
        }
    });


}

function getCars() {
    return window.localStorage.getItem("carSource");
}