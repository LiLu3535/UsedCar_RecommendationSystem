/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// send value to database


function setLoginStatusMember(email, status) {
    var result;
    var passedInfo = {
        "method": "setLoginStatusMember",
        "email": email,
        "status": status
    };
    $.ajax({
        async: false,
        url: "MemberServlet",
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

function setLoginStatusManager(email, status) {
    var result;
    var passedInfo = {
        "method": "setLoginStatusManager",
        "email": email,
        "status": status
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
    return result;
}

// check whether the user has authority to enter upload car page (onclick)
function checkEnterUploadPage() {
    if (getUserStatus() !== true) {
        alert("Please login first");
        window.location.replace("login.html");
    } else {
        window.location.replace("upLoadACar.html");
        return false;
    }
}


// transfer between login and logout 
function changeLogin() {
    if (!getUserStatus()) {
        document.getElementById("loginBtt").innerHTML = "Login";
        document.querySelector(".loginBtt").href = "login.html";
    } else {
        document.getElementById("loginBtt").innerHTML = "Log Out";
        document.querySelector(".loginBtt").href = window.location.href;
    }
}

changeLogin();


// logout
function logOut() {

    if (document.getElementById("loginBtt").innerHTML.search("Log Out") !== -1) {               // innerHTML is logout
        alert("You have logged out");

        if (getUserIdentity() === "Manager") {

            setLoginStatusManager(getUserEmail(), false); // need to change
            setUserStatus(getUserEmail(), false, getUserIdentity());
            window.location.replace("index.html");

        } else if (getUserIdentity() === "Member") {
            setLoginStatusMember(getUserEmail(), false); // need to change
            setUserStatus(getUserEmail(), false, getUserIdentity());
        }


    }
}


// use cookie to store user's email and status
function setUserStatus(email, status, identity) {
    document.cookie = "email=" + email;
    document.cookie = "status=" + status;
    document.cookie = "identity=" + identity;
}


// get user email from cookie
function getUserEmail() {
    var cookieArr = document.cookie.split(";");
    var email;
    for (var i = 0; i < cookieArr.length; i++) {
        var dataArr = cookieArr[i].split("=");                  // get attribute and their value
        if (dataArr[0].search("email") !== -1) {                  // in email part
            email = dataArr[1];
        }
    }
    return email;
}


// get user status from cookie
function getUserStatus() {
    var cookieArr = document.cookie.split(";");
    var status = false;
    for (var i = 0; i < cookieArr.length; i++) {
        var dataArr = cookieArr[i].split("=");                  // get attribute and their value
        if (dataArr[0].search("status") !== -1) {                  // in status part
            if (dataArr[1].search("true") !== -1) {               // status is true
                status = true;
            }
        }
    }

    return status;
}

// get user identity from cookie
function getUserIdentity() {
    var cookieArr = document.cookie.split(";");
    var identity;
    for (var i = 0; i < cookieArr.length; i++) {
        var dataArr = cookieArr[i].split("=");                  // get attribute and their value
        if (dataArr[0].search("identity") !== -1) {                  // in identity part
            identity = dataArr[1];
        }
    }
    return identity;
}

// change user status when closing the window
window.onbeforeunload = onbeforeunloadHandle();
function onbeforeunloadHandle() {
    if ((event.clientX > document.body.clientWidth && event.clientY < 0) || event.altKey) {
        if (getUserIdentity() === "Manager") {
            setLoginStatusManager(getUserEmail(), false); // need to change
        } else if (getUserIdentity() === "Member") {
            setLoginStatusMember(getUserEmail(), false); // need to change
        }

        setUserStatus(getUserEmail(), false, getUserIdentity());
    }
}  