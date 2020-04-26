/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var carData = {};

window.onload = function(){


    changeLogin();

    document.getElementById('loadingNote').style.display="none";
    document.getElementById('coverDetailWindow').style.display="none";
    document.getElementById('cover_StartTrans').style.display="none";
    document.getElementById('detailWindow').style.display="none";
    document.getElementById('startTransWindow').style.display="none";
    
    

    var passedInfo = {"method": "executeDatabase"};
    $.ajax({
        async :false,
        url:"IndexServlet",
        Type:"post",
        dataType:"text",
        data:passedInfo,
        success:function(data){
           result = data;
        },
        error: function(error){
            alert(error.status+","+error.statusText);
            alert("connect server error!");
            //window.location.reload();
        }
    });
    
    getCar_list();
    addCar_Card();
    
};

function getCar_list(){
    var result, email=null; 
    if (getUserStatus()){   //Has logged in 
        email = getUserEmail();
    }
    
    var passedInfo = {'method':"getCar_list",
        'email':email};
    $.ajax({
         async :false,
         url:"IndexResponseServlet",
         method:"post",
         dataType:"text",
         data:passedInfo,
         success:function(data){
             
            result = data;
            var cars=result.split(";"); //Split cars
            for (var i=0; i<cars.length; i++){
                var thisCar = cars[i].split(",");   //Split car attributes
                carData[i]={'id':thisCar[0], 'model': thisCar[1], 'make': thisCar[2], 'price': thisCar[3], 
                'sellerID': thisCar[4], 'year': thisCar[5], 'mileage': thisCar[6], 'power':thisCar[7], 
                'note': thisCar[8], 'fuelCons':thisCar[9], 'registerDate': thisCar[10]};
            }
         },
         error: function(error){
             alert(error.status+","+error.statusText);
             alert("Get car error!");
             //window.location.reload();
         }
     });
    
}


function addCar_Card(){
    
    //===================
    var ul = document.getElementById("frontPage-list");
    //=====================
    for (var i=0; i<Object.keys(carData).length-1; i++){
        var price_pound = document.createElement("span");
        price_pound.setAttribute("class","front-car-price");
        price_pound.innerHTML="£";

        var age = document.createElement("span");
        age.setAttribute("class","front-attName");
        age.innerHTML="Age:";

        var age_unit = document.createElement("span");
        age_unit.setAttribute("class","front-ageUnit");
        age_unit.innerHTML="year(s)";

        var mileage = document.createElement("span");
        mileage.setAttribute("class","front-attName");
        mileage.innerHTML="Mileage:";

        var mileage_unit = document.createElement("span");
        mileage_unit.setAttribute("class","front-ageUnit");
        mileage_unit.innerHTML="miles";

        var powerType = document.createElement("span");
        powerType.setAttribute("class","front-attName");
        powerType.innerHTML="Power Type:";

        var fuelCon = document.createElement("span");
        fuelCon.setAttribute("class","front-attName");
        fuelCon.innerHTML="Fuel Consumption:";

        var fuelCon_unit = document.createElement("span");
        fuelCon_unit.setAttribute("class","front-ageUnit");
        fuelCon_unit.innerHTML="mpg";
        
        var li=document.createElement("li");
        li.id="carID_"+carData[i].id;
        var div_left=document.createElement("div");
        div_left.setAttribute("class","front-car-left");
        var div_right=document.createElement("div");
        div_right.setAttribute("class","front-car-right");

        var div_carPic = document.createElement("div");
        div_carPic.setAttribute("class","front-picRec");
        div_left.appendChild(div_carPic);

        //Right Line 1
        var right_line1 = document.createElement("div");
        var make = document.createElement("span");
        var model = document.createElement("span");
        var price = document.createElement("span");
        make.setAttribute("class","front-card-make");
        model.setAttribute("class","front-car-model");
        price.setAttribute("class","front-car-price");
        make.innerHTML=carData[i].make;
        model.innerHTML=carData[i].model;
        price.innerHTML=carData[i].price;
        right_line1.appendChild(make);
        right_line1.appendChild(model);
        right_line1.appendChild(price);
        right_line1.appendChild(price_pound);

        //Right Line 2
        var right_line2 = document.createElement("div");

        var right_agePart1 = document.createElement("div");
        right_agePart1.setAttribute("class","front-car-detailBlock");
        var age_val = document.createElement("span");
        age_val.setAttribute("class","front-attValue");
        age_val.innerHTML=carData[i].year;
        right_agePart1.appendChild(age);
        right_agePart1.appendChild(age_val);
        right_agePart1.appendChild(age_unit);

        var mileage_val = document.createElement("span");
        mileage_val.innerHTML=carData[i].mileage;
        mileage_val.setAttribute("class","front-attValue");
        right_line2.appendChild(right_agePart1);
        right_line2.appendChild(mileage);
        right_line2.appendChild(mileage_val);
        right_line2.appendChild(mileage_unit);

        //Right Line 3
        var right_line3 = document.createElement("div");

        var right_agePart2 = document.createElement("div");
        right_agePart2.setAttribute("class","front-car-detailBlock");
        var powerType_val = document.createElement("span");
        powerType_val.setAttribute("class","front-attValue");
        powerType_val.innerHTML=carData[i].power;
        right_agePart2.appendChild(powerType);
        right_agePart2.appendChild(powerType_val);

        var fuelCon_val = document.createElement("span");
        fuelCon_val.setAttribute("class","front-attValue");
        fuelCon_val.innerHTML=carData[i].fuelCons;
        right_line3.appendChild(right_agePart2);
        right_line3.appendChild(fuelCon);
        right_line3.appendChild(fuelCon_val);
        right_line3.appendChild(fuelCon_unit);

        //Right Line 4
        var right_line4 = document.createElement("div");
        var confirmBtt = document.createElement("a");
        confirmBtt.setAttribute("class","front-car-detailBtt");
        confirmBtt.setAttribute("onclick","showDetailWindow(this)");
        confirmBtt.innerHTML="See Details";
        confirmBtt.id="carIdx_"+i;
        right_line4.appendChild(confirmBtt);

        div_right.appendChild(right_line1);
        div_right.appendChild(right_line2);
        div_right.appendChild(right_line3);
        div_right.appendChild(right_line4);

        li.appendChild(div_left);
        li.appendChild(div_right);  

        ul.appendChild(li);
    }
}

function showDetailWindow(btt){
    var bttID = btt.id;
    var carIdx = bttID.substring(7,bttID.length);     //Get car index in the list
    
    document.getElementById('coverDetailWindow').style.display="";
    document.getElementById('detailWindow').style.display="";
    var make = carData[carIdx].make;
    var model = carData[carIdx].model;
    var price = carData[carIdx].price;
    var year = carData[carIdx].year;
    var mileage = carData[carIdx].mileage;
    var fuelCon = carData[carIdx].fuelCons;
    var powerType = carData[carIdx].power;
    var note = carData[carIdx].note;
    document.getElementById('detailWinHead').innerHTML = make + " " + model;
    document.getElementById('detail_make').innerHTML = make;
    document.getElementById('detail_model').innerHTML = model;
    document.getElementById('detail_price').innerHTML = price;
    document.getElementById('detail_year').innerHTML = year;
    document.getElementById('detail_mileage').innerHTML = mileage;
    document.getElementById('detail_fuelConsumption').innerHTML = fuelCon;
    document.getElementById('detail_powerType').innerHTML = powerType;
    document.getElementById('detail_note').innerHTML = note;
    var startTrans_btt = document.getElementById('startTrans_btt');
    startTrans_btt.name = "carIdx_"+carIdx;

    if (getUserStatus && getUserIdentity() === "Member"){
        var passedInfo = {
            'email': getUserEmail(),
            'carID':carData[carIdx].id};
        $.ajax({
            async :false,
            url:"HistoryServlet",
            method:"get",
            dataType:"text",
            data:passedInfo,
            success:function(data){
               result = data;
            },
            error: function(error){
                alert(error.status+","+error.statusText);
                window.location.reload();
            }
        });
    }
}

function showStartTransWindow(btt){
    if(!getUserStatus()){
        alert("Please login before starting a transaction");
    }else{
        document.getElementById('cover_StartTrans').style.display="";
    document.getElementById('startTransWindow').style.display="";
    
    var result;
    var bttNAME=btt.name;
    var carIdx = bttNAME.substring(7,bttNAME.length);
    var sellerID = carData[carIdx].sellerID;
    var passedInfo = {
        "method": "showStartTransWindow",
        "sellerID": sellerID};

    $.ajax({
             async :false,
             url:"MemberServlet",
             method:"post",
             dataType:"text",
             data:passedInfo,
             success:function(data){
                result = data;
             },
             error: function(error){
                 alert(error.status+","+error.statusText);
                 window.location.reload();
             }
         });
         
    var sellerInfo = result.split(";");
    var firstName = sellerInfo[0];
    var lastName = sellerInfo[1];
    var phone = sellerInfo[2];
 
    var name_place = document.getElementById('startTrans-sellerName');
    var phone_place = document.getElementById('startTrans-PhoneNumber');
    name_place.innerHTML = firstName + " " + lastName;
    phone_place.innerHTML = phone;
    
    var startTrans_btt = document.getElementById('front-startTrans-confirmBtt');
    startTrans_btt.name = "carIdx_"+carIdx;
    
    }
    
}

function cancelStartTrans(){
    document.getElementById('startTransWindow').style.display="none";
    document.getElementById('cover_StartTrans').style.display="none";

}

function confirmStartTrans(btt){
    
    if (getUserIdentity()===null){
        alert("Please login first!");
    }else{
        
        if (confirm("Are you sure to start this transaction?")){
        document.getElementById('startTransWindow').style.display="none";
        document.getElementById('cover_StartTrans').style.display="none";
        document.getElementById('coverDetailWindow').style.display="none";
        document.getElementById('detailWindow').style.display="none";
        var bttName = btt.name;
        var carIdx = bttName.substring(7,bttName.length);
        var carID = carData[carIdx].id;
        var passedInfo = {
            "newBuyer_email": getUserEmail(),
            "carID": carID
        };
        
        $.ajax({
         async :false,
         url:"MemberServlet",
         method:"post",
         dataType:"text",
         data:passedInfo,
         success:function(data){
            result = data;
            var carCard = document.getElementById('carID_'+carID);
            document.removeChild(carCard);
            alert("You have bought this car!");
         },
         error: function(error){
             alert(error.status+","+error.statusText);
             window.location.reload();
         }
        });
    }

    }
}

function closePump(closeBtt){
    
    var window = closeBtt.parentNode.parentNode;
    window.style.display="none";
    if (document.getElementById('cover_StartTrans').style.display===""){
        document.getElementById('cover_StartTrans').style.display="none";
    }else{
        document.getElementById('coverDetailWindow').style.display="none";
    }
    
}



function redClosePic(){
    document.getElementById('closePic').src="pics/closeHover.png";
}

function orgClosePic(){
    document.getElementById('closePic').src="pics/close.png";
}

function closeCookieNotice(){
    document.getElementById('cookieNoticeBar').style.display="none";
}

