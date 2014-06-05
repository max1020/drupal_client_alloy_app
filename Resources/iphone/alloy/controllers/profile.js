function Controller() {
    function mist1() {
        var drupal = require("alloy").Globals.drupal;
        Ti.API.info(drupal.Settings.cookie);
        Ti.API.info(drupal.Settings.token + "should be token");
        alert(drupal.Settings);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profileWindow = Ti.UI.createWindow({
        backgroundColor: "red",
        layout: "vertical",
        borderWidth: 2,
        borderColor: "yellow",
        id: "profileWindow",
        title: "profile"
    });
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Profile page",
        id: "__alloyId10"
    });
    $.__views.profileWindow.add($.__views.__alloyId10);
    $.__views.logo = Ti.UI.createImageView({
        top: 20,
        image: "/titanium_logo.jpg",
        height: 20,
        id: "logo"
    });
    $.__views.profileWindow.add($.__views.logo);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderWidth: 2,
        borderColor: "red",
        id: "__alloyId11"
    });
    $.__views.profileWindow.add($.__views.__alloyId11);
    $.__views.email = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        hintText: "email",
        id: "email"
    });
    $.__views.__alloyId11.add($.__views.email);
    $.__views.username = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        hintText: "username",
        id: "username"
    });
    $.__views.__alloyId11.add($.__views.username);
    $.__views.updateButton = Ti.UI.createButton({
        height: 28,
        color: "#fff",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Update",
        id: "updateButton"
    });
    $.__views.profileWindow.add($.__views.updateButton);
    mist1 ? $.__views.updateButton.addEventListener("click", mist1) : __defers["$.__views.updateButton!click!mist1"] = true;
    $.__views.cancelButton = Ti.UI.createButton({
        height: 28,
        color: "#fff",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Cancel",
        id: "cancelButton"
    });
    $.__views.profileWindow.add($.__views.cancelButton);
    $.__views.profileTab = Ti.UI.createTab({
        window: $.__views.profileWindow,
        id: "profileTab",
        title: "PROFILE"
    });
    $.__views.profileTab && $.addTopLevelView($.__views.profileTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy").Globals.drupal;
    __defers["$.__views.updateButton!click!mist1"] && $.__views.updateButton.addEventListener("click", mist1);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;