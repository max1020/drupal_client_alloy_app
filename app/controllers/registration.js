/*var drupal;
exports.setDrupal = function(d) {
	drupal = d;
};*/

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

		case 'logged in':
			enableControl($.logoutButton);
			disableControl($.loginButton);
			disableControl($.email);
			disableControl($.registerButton);
			break;

		case 'logged out':
			disableControl($.logoutButton);
			enableControl($.loginButton);
			enableControl($.email);
			enableControl($.registerButton);
			break;
	}
	
};

function clickRegister() {
	
	if (!$.username.value || !$.password.value || !$.email.value) {
		alert("please provide a name, email and password");
		return;
	}
	
	var user = {
		name: $.username.value,
		pass: $.password.value,
		mail: $.email.value
	};
	
	drupal.createAccount(user,
		function(response) {
			alert(response);
			Ti.API.info(response);
			Ti.API.info(drupal.Settings + ": Settings variable");
			Ti.API.info(drupal.REST_PATH + ": REST PATH");
		},
		function(error) {
			alert(error + "user account was not created");
		}
	);

}

function clickLogin() {

	if (!$.username.value || !$.password.value) {
		alert("please provide a username and password");
		return;
	}
	
	//var userObject;

	drupal.login($.username.value, $.password.value, 
		function(response) {
			setStatus('logged in');
			alert(response);
		},
		function(error) {
			alert(error + "There was an error with logging in");
		}
	);
		
}

function clickLogout() {
	
	drupal.logout(
		function(response){
			setStatus('logged out');
			alert(response + "You have logged out");
		},
		function(err){
			alert(err);
		}
	);	
}