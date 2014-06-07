function Controller() {
    function getaNode() {
        var resourceName = "node/2";
        var root = "http://drupal2-testdrupal.rhcloud.com/";
        drupal.getNode(resourceName, function(response) {
            Ti.API.info(response);
            var imageurl = root + "sites/default/files/field/image/" + response.field_image2.und[0].filename;
            Ti.API.info(imageurl);
            Ti.API.info(response.field_image2.und[0].filename);
            $.node_title_id.setText(response.title);
            $.node_body_id.setText(response.body.und[0].value);
            $.article1image.setImage(imageurl);
        }, function(error) {
            alert(error + "There was an error with getting the node");
            Ti.API.info(resourceName);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "get_node";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.get_nodeWindow = Ti.UI.createWindow({
        backgroundColor: "#ccc",
        layout: "vertical",
        borderWidth: 2,
        borderColor: "green",
        id: "get_nodeWindow",
        title: "get_node"
    });
    $.__views.node_title_id = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "red",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        size: 14,
        text: "node title",
        id: "node_title_id"
    });
    $.__views.get_nodeWindow.add($.__views.node_title_id);
    $.__views.node_body_id = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "yellow",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        size: 11,
        id: "node_body_id"
    });
    $.__views.get_nodeWindow.add($.__views.node_body_id);
    $.__views.article1image = Ti.UI.createImageView({
        id: "article1image"
    });
    $.__views.get_nodeWindow.add($.__views.article1image);
    $.__views.commentfield = Ti.UI.createTextField({
        width: 200,
        height: 120,
        hintText: "Post your comment (max 144)",
        borderWidth: 2,
        borderColor: "brown",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        maxLength: 144,
        bottom: 10,
        top: 10,
        id: "commentfield"
    });
    $.__views.get_nodeWindow.add($.__views.commentfield);
    $.__views.submitComment = Ti.UI.createButton({
        height: 28,
        color: "#aaa",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Submit comment",
        id: "submitComment"
    });
    $.__views.get_nodeWindow.add($.__views.submitComment);
    $.__views.Load_node = Ti.UI.createButton({
        height: 28,
        color: "#aaa",
        backgroundColor: "#ddd",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundDisabledColor: "#666",
        width: 200,
        bottom: 35,
        title: "Get a node",
        id: "Load_node"
    });
    $.__views.get_nodeWindow.add($.__views.Load_node);
    getaNode ? $.__views.Load_node.addEventListener("click", getaNode) : __defers["$.__views.Load_node!click!getaNode"] = true;
    $.__views.get_nodeTab = Ti.UI.createTab({
        window: $.__views.get_nodeWindow,
        id: "get_nodeTab",
        title: "GET_NODE-TITLE"
    });
    $.__views.get_nodeTab && $.addTopLevelView($.__views.get_nodeTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.Load_node!click!getaNode"] && $.__views.Load_node.addEventListener("click", getaNode);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;