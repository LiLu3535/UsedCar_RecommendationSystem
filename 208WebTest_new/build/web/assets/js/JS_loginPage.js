/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function () {
    changeLogin();

    document.getElementById('cover').style.display = "none";
    document.getElementById('winForgetPass').style.display = "none";
    document.getElementById('winResetPass').style.display = "none";
};

function isPasswordMember(email, password) {
    var result;
    var passedInfo = {
        "method": "isPasswordMember",
        "email": email,
        "password": password
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

function isPasswordManager(email, password) {
    var result;
    var passedInfo = {
        "method": "isPasswordManager",
        "email": email,
        "password": password
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

function isMember(email) {
    var result;
    var passedInfo = {
        "method": "isMember",
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

function isManager(email) {
    var result;
    var passedInfo = {
        "method": "isManager",
        "email": email
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







// check email and password are correct
function checkLogin() {
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
    var pattern = /^([a-zA-z0-9_-])+@([a-zA-Z0-9_])+(\.([a-zA-Z0-9_])+)*(.([a-zA-Z0-9])+)$/;

    if (!pattern.test(email)) {
        alert("Please input correct email address");
        window.location.reload();
    } else {// email form correct
        if (isManager(email) === "true") {// user is manager  
            if (isPasswordManager(email, password) === "true") {
                setUserStatus(email, true, "Manager");
                setLoginStatusManager(email, true);
                alert("Login succeed");
                window.location.replace("managerUI.html");
            } else {
                alert("Email and password are not match\nPlease input again");
                window.location.reload();
            }
        } else if (isMember(email) === "true") {// user is member 
            if (isPasswordMember(email, password) === "true") {
                setUserStatus(email, true, "Member");
                setLoginStatusMember(email, true);
                alert("Login succeed");
                window.location.replace("index.html");
            } else {
                alert("Email and password are not match\nPlease input again");
                window.location.reload();
            }
        } else {
            alert("Does not exist such email address");
            window.location.reload();
        }
    }
}




function forgetPassword() {
    document.getElementById('cover').style.display = "";
    document.getElementById('winForgetPass').style.display = "";
}
function closePump() {
    document.getElementById('cover').style.display = "none";
    document.getElementById('winForgetPass').style.display = "none";
    document.getElementById('winResetPass').style.display = "none";

}
function submitPersonalInfo() {
    var email = document.getElementById("find-email").value;
    var phone = document.getElementById("find-phoneNumber").value;
    if (isManager(email) !== "true" && isMember(email) !== "true") {
        alert("Does not exist such email address");
        window.location.reload();
    } else {
        var result = "false";
        if (isManager(email) === "true") {
            alert("Manager CANNOT change password here!");
        } else if (isMember(email) === "true") {

            var passedInfo = {
                "method": "submitPersonalInfo",
                "email": email,
                "phone": phone
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

            if (result === "false") {
                alert("Email and phone number are not match\nPlease input again");
                window.location.reload();
            } else if (result === "true") {
                //show reset password window

                document.getElementById('winForgetPass').style.display = "none";
                document.getElementById('winResetPass').style.display = "";
                var confirmBtt = document.getElementById("confChangePass");
                confirmBtt.setAttribute("name", email);
                alert("Successfully confirmed your identity!");
            }
        }

    }

}

var passwordReady = false, rePasswordReady = false;

function changePasswordImg() {
    password = document.getElementById("newPassword").value;
    var passwordImg = document.getElementById("newPasswordImg");

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
    password = document.getElementById("newPassword").value;
    rePassword = document.getElementById("confirmPassword").value;
    var rePasswordImg = document.getElementById("confirmPasswordImg");

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

function submitNewPass(btt) {

    document.getElementById('cover').style.display = "none";
    document.getElementById('winForgetPass').style.display = "none";
    document.getElementById('winResetPass').style.display = "none";

    var newPassword = document.getElementById('newPassword').value;

    if (passwordReady !== true || rePasswordReady !== true) {
        alert("Please enter valid new password and confirm it.");
    } else {
        var passedInfo = {
            "method": "submitNewPass",
            "email": btt.name,
            "newPass": newPassword
        };
        $.ajax({
            async: false,
            url: "MemberServlet",
            method: "post",
            dataType: "text",
            data: passedInfo,
            success: function (data) {
                result = data;
                alert("Successfully reset your password!");
            },
            error: function (error) {
                alert(error.status + "," + error.statusText);
                window.location.reload();
            }
        });
    }
}

function redClosePic(ele) {
    ele.src = "pics/closeHover.png";
}

function orgClosePic(ele) {
    ele.src = "pics/close.png";
}