function Controller() {
    function enableControl(c) {
        c.opacity = 1;
        c.color = "red";
        c.enabled = true;
    }
    function disableControl(c) {
        c.opacity = .5;
        c.color = "orange";
        c.enabled = false;
    }
    function setStatus(status) {
        switch (status) {
          case "logged in":
            enableControl($.logoutButton);
            disableControl($.loginButton);
            disableControl($.email);
            disableControl($.registerButton);
            break;

          case "logged out":
            disableControl($.logoutButton);
            enableControl($.loginButton);
            enableControl($.email);
            enableControl($.registerButton);
        }
    }
    function clickRegister() {
        if (!$.username.value || !$.email.value) {
            alert("please provide a name, email and password");
            return;
        }
        var user = {
            name: $.username.value,
            mail: $.email.value
        };
        drupal.createAccount(user, function(response) {
            alert(response);
            Ti.API.info(response);
            Ti.API.info(drupal.Settings + ": Settings variable");
            Ti.API.info(drupal.REST_PATH + ": REST PATH");
        }, function(error) {
            alert(error + "user account was not created");
        });
    }
    function clickLogin() {
        if (!$.username.value || !$.password.value) {
            alert("please provide a username and password");
            return;
        }
        drupal.login($.username.value, $.password.value, function(response) {
            setStatus("logged in");
            alert(response);
        }, function(error) {
            alert(error + "There was an error with logging in");
        });
    }
    function clickLogout() {
        drupal.logout(function(response) {
            setStatus("logged out");
            alert(response + "You have logged out");
        }, function(err) {
            alert(err);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "registration";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.registrationWindow = Ti.UI.createWindow({
        backgroundColor: "orange",
        layout: "vertical",
        borderWidth: 2,
        borderColor: "yellow",
        id: "registrationWindow",
        title: "registration"
    });
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "registration page",
        id: "__alloyId2"
    });
    $.__views.registrationWindow.add($.__views.__alloyId2);
    $.__views.logo = Ti.UI.createImageView({
        top: 20,
        image: "/titanium_logo.jpg",
        height: 20,
        id: "logo"
    });
    $.__views.registrationWindow.add($.__views.logo);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderWidth: 2,
        borderColor: "red",
        id: "__alloyId3"
    });
    $.__views.registrationWindow.add($.__views.__alloyId3);
    $.__views.username = Ti.UI.createTextField({
        width: 180,
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 8,
        color: "#eee",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        textAlign: "center",
        bottom: 10,
        hintText: "username",
        id: "username"
    });
    $.__views.__alloyId3.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        width: 180,
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 8,
        color: "#eee",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        textAlign: "center",
        bottom: 10,
        hintText: "password",
        id: "password",
        passwordMask: "true"
    });
    $.__views.__alloyId3.add($.__views.password);
    $.__views.email = Ti.UI.createTextField({
        width: 180,
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 8,
        color: "#eee",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        textAlign: "center",
        bottom: 10,
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        hintText: "email",
        id: "email"
    });
    $.__views.__alloyId3.add($.__views.email);
    $.__views.status = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "red",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "status"
    });
    $.__views.__alloyId3.add($.__views.status);
    $.__views.registerButton = Ti.UI.createButton({
        height: 28,
        color: "#aaa",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Register",
        id: "registerButton"
    });
    $.__views.registrationWindow.add($.__views.registerButton);
    clickRegister ? $.__views.registerButton.addEventListener("click", clickRegister) : __defers["$.__views.registerButton!click!clickRegister"] = true;
    $.__views.loginButton = Ti.UI.createButton({
        height: 28,
        color: "green",
        backgroundColor: "yellow",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Login",
        id: "loginButton"
    });
    $.__views.registrationWindow.add($.__views.loginButton);
    clickLogin ? $.__views.loginButton.addEventListener("click", clickLogin) : __defers["$.__views.loginButton!click!clickLogin"] = true;
    $.__views.logoutButton = Ti.UI.createButton({
        height: 28,
        color: "#aaa",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Logout",
        id: "logoutButton"
    });
    $.__views.registrationWindow.add($.__views.logoutButton);
    clickLogout ? $.__views.logoutButton.addEventListener("click", clickLogout) : __defers["$.__views.logoutButton!click!clickLogout"] = true;
    $.__views.registrationTab = Ti.UI.createTab({
        window: $.__views.registrationWindow,
        id: "registrationTab",
        title: "REGISTRATION TAB"
    });
    $.__views.registrationTab && $.addTopLevelView($.__views.registrationTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.registerButton!click!clickRegister"] && $.__views.registerButton.addEventListener("click", clickRegister);
    __defers["$.__views.loginButton!click!clickLogin"] && $.__views.loginButton.addEventListener("click", clickLogin);
    __defers["$.__views.logoutButton!click!clickLogout"] && $.__views.logoutButton.addEventListener("click", clickLogout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;