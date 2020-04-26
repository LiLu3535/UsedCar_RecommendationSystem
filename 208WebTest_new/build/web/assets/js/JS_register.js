
window.onload = function () {
    changeLogin();
};


function checkEmailDuplication(email) {
    var result;
    var passedInfo = {
        "method": "checkEmailDuplication",
        "email": email
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

function addMember(firstName, lastName, email, password, phone, status) {
    var result;
    var passedInfo = {
        "method": "addMember",
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "phone": phone,
        "status": status
    }
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


// information of user
var lastName = "";
var otherName = "";
var email = "";
var password = "";
var rePassword = "";
var phone = "";

// information is ready to be registered
var lastNameReady = false;
var otherNameReady = false;
var emailReady = false;
var passwordReady = false;
var rePasswordReady = false;
var phoneReady = false;

// change images according to inputs
function changeLastNameImg() {
    lastName = document.getElementById("LastName").value;
    var lastNameImg = document.getElementById("lastNameImg");

    //whether last name satisfying the standard
    var letterPattern = /^[a-zA-Z]*$/;
    if (lastName !== "") {
        if (letterPattern.test(lastName) && lastName.length > 0 && lastName.length <= 12) {
            lastNameImg.src = "pics/true.png";
            lastNameImg.style.visibility = "visible";
            lastNameReady = true;
        } else {
            lastNameImg.src = "pics/wrong.png";
            lastNameImg.style.visibility = "visible";
            lastNameReady = false;
        }
    } else {
        lastNameImg.style.visibility = "hidden";
    }

}

function changeOtherNameImg() {
    otherName = document.getElementById("OtherNames").value;
    var otherNameImg = document.getElementById("otherNameImg");

    //whether other name satisfying the standard
    var letterPattern = /^[a-zA-Z]*$/;
    if (otherName !== "") {
        if (letterPattern.test(otherName) && otherName.length > 0 && otherName.length <= 12) {
            otherNameImg.src = "pics/true.png";
            otherNameImg.style.visibility = "visible";
            otherNameReady = true;
        } else {
            otherNameImg.src = "pics/wrong.png";
            otherNameImg.style.visibility = "visible";
            otherNameReady = false;
        }
    } else {
        otherNameImg.style.visibility = "hidden";
    }

}

function changeEmailImg() {
    email = document.getElementById("Email").value;
    var emailImg = document.getElementById("emailImg");

    //whether email satisfying the standard
    var emailPattern = /^([a-zA-z0-9_-])+@([a-zA-Z0-9_])+(\.([a-zA-Z0-9_])+)*(.([a-zA-Z0-9])+)$/;
    if (email !== "") {
        if (emailPattern.test(email) && email.length > 0 && email.length <= 30
                && checkEmailDuplication(email) === "false"
                ) {
            emailImg.src = "pics/true.png";
            emailImg.style.visibility = "visible";
            emailReady = true;
        } else {
            emailImg.src = "pics/wrong.png";
            emailImg.style.visibility = "visible";
            emailReady = false;
        }
    } else {
        emailImg.style.visibility = "hidden";
    }

}

function changePasswordImg() {
    password = document.getElementById("Password").value;
    var passwordImg = document.getElementById("passwordImg");

    //whether password satisfying the standard
    if (password !== "") {
        if (password.length >= 6 && password.length <= 15) {                               // password has length beween 6 and 15
            passwordImg.src = "pics/true.png";
            passwordImg.style.visibility = "visible";
            passwordReady = true;
        } else {
            passwordImg.src = "pics/wrong.png";
            passwordImg.style.visibility = "visible";
            passwordReady = false;
        }
    } else {
        passwordImg.style.visibility = "hidden";
    }


}

function changeRePasswordImg() {
    password = document.getElementById("Password").value;
    rePassword = document.getElementById("Conf_Password").value;
    var rePasswordImg = document.getElementById("rePasswordImg");

    //whether re entered password matchs password
    if (rePassword !== "") {
        if (password === rePassword) {
            rePasswordImg.src = "pics/true.png";
            rePasswordImg.style.visibility = "visible";
            rePasswordReady = true;
        } else {
            rePasswordImg.src = "pics/wrong.png";
            rePasswordImg.style.visibility = "visible";
            rePasswordReady = false;
        }
    } else {
        rePasswordImg.style.visibility = "hidden";
    }

}

function changePhoneImg() {
    phone = document.getElementById("Phone").value;
    var phoneImg = document.getElementById("phoneImg");

    //whether password satisfying the standard
    var integerPattern = /^(([0-9])+)$/;
    if (phone !== "") {
        if (integerPattern.test(phone) && phone.length === 11) {                               // password has length beween 6 and 15
            phoneImg.src = "pics/true.png";
            phoneImg.style.visibility = "visible";
            phoneReady = true;
        } else {
            phoneImg.src = "pics/wrong.png";
            phoneImg.style.visibility = "visible";
            phoneReady = false;
        }
    } else {
        phoneImg.style.visibility = "hidden";
    }

}


// trigger this function when clicking submit 
function submitInfo() {
    if (lastNameReady && otherNameReady && emailReady && passwordReady && rePasswordReady && phoneReady) {
        var result = addMember(otherName, lastName, email, password, phone, 0);
        if (result === "true") {
            alert("Registered successfully");
            window.location.replace("index.html");
        } else {
            alert("Register failed");
            window.location.reload();
        }


    } else {
        alert("Please complete the form");
        window.location.reload();
    }
}