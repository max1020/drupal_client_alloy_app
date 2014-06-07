function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.__alloyId1 = Alloy.createController("registration", {
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId2 = Alloy.createController("get_node", {
        id: "__alloyId2"
    });
    __alloyId0.push($.__views.__alloyId2.getViewEx({
        recurse: true
    }));
    $.__views.maintabgroup = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "maintabgroup"
    });
    $.__views.maintabgroup && $.addTopLevelView($.__views.maintabgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.maintabgroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;