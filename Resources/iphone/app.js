var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var drupal = require("drupal");

Alloy.Globals.drupal = drupal;

Alloy.Globals.drupal.setRestPath("http://drupal2-testdrupal.rhcloud.com/", "restapi");

Alloy.createController("index");