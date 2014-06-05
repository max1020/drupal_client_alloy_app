function Controller() {
    function getaView() {
        drupal.getView(viewName, function(response) {
            Ti.API.info(viewName + "successmessage");
            Ti.API.info(response);
        }, function() {
            alert(response + "this view doesnt work");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "get_view";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.get_viewWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        borderWidth: 2,
        borderColor: "yellow",
        id: "get_viewWindow",
        title: "get_view"
    });
    $.__views.loadview = Ti.UI.createButton({
        height: 28,
        color: "#fff",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Get a view",
        id: "loadview"
    });
    $.__views.get_viewWindow.add($.__views.loadview);
    getaView ? $.__views.loadview.addEventListener("click", getaView) : __defers["$.__views.loadview!click!getaView"] = true;
    $.__views.__alloyId1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "get node page",
        id: "__alloyId1"
    });
    $.__views.get_viewWindow.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "__alloyId2"
    });
    $.__views.get_viewWindow.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "$.data.node_title",
        id: "__alloyId3"
    });
    $.__views.get_viewWindow.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        image: "http://www.gif-paradies.de/gifs/flaggen-der-welt/algerien/algerien_0017.gif",
        id: "__alloyId4"
    });
    $.__views.get_viewWindow.add($.__views.__alloyId4);
    $.__views.recentcontent = Ti.UI.createTableView({
        id: "recentcontent"
    });
    $.__views.get_viewWindow.add($.__views.recentcontent);
    $.__views.get_viewTab = Ti.UI.createTab({
        window: $.__views.get_viewWindow,
        id: "get_viewTab",
        title: "GET VIEW-TITLE"
    });
    $.__views.get_viewTab && $.addTopLevelView($.__views.get_viewTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var viewName = "newest";
    __defers["$.__views.loadview!click!getaView"] && $.__views.loadview.addEventListener("click", getaView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;