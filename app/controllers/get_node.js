function getaNode() {
	var resourceName = "node/2";
	var root = "http://drupal2-testdrupal.rhcloud.com/";

	drupal.getNode(resourceName, function(response) {
		Ti.API.info(response);
		var imageurl = root + 'sites/default/files/field/image/' + response.field_image2.und[0].filename;
		Ti.API.info(imageurl);
		Ti.API.info(response.field_image2.und[0].filename);
		//   Ti.API.info(response);
		$.node_title_id.setText(response.title);
		$.node_body_id.setText(response.body.und[0].value);
		$.article1image.setImage(imageurl);

		//alert(responseData + "dont get to her");
	}, function(error) {
		alert(error + "There was an error with getting the node");
		Ti.API.info(resourceName);
	});
}