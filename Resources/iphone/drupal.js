"use strict";

function setRestPath(root, endpoint) {
    SITE_ROOT = root;
    SERVICES_ENDPOINT = endpoint;
    REST_PATH = root + endpoint + "/";
}

function getCsrfToken(success, failure) {
    var existingToken = Settings.getString(settingsPrefix + "X-CSRF-Token");
    if (existingToken) {
        success(existingToken);
        return;
    }
    var xhr = createHTTPClient();
    xhr.onload = function() {
        Settings.setString(settingsPrefix + "X-CSRF-Token", xhr.responseText);
        console.log("got new CSRF token " + xhr.responseText);
        success(xhr.responseText);
    };
    xhr.onerror = function(err) {
        console.log("error getting CSRF token:");
        failure(err);
    };
    var tokenPath = SITE_ROOT + "services/session/token";
    xhr.open("GET", tokenPath);
    var cookie = Settings.getString(settingsPrefix + "Drupal-Cookie");
    xhr.setRequestHeader("Cookie", cookie);
    xhr.send();
}

function systemConnect(success, failure) {
    var xhr = createHTTPClient(), url = REST_PATH + "system/connect";
    console.log("POSTing to url " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function() {
        if (200 === xhr.status) {
            var response = xhr.responseText;
            var responseData = JSON.parse(response);
            var cookie = responseData.session_name + "=" + responseData.sessid;
            Settings.setString(settingsPrefix + "Drupal-Cookie", cookie);
            getCsrfToken(function() {
                success(responseData);
            }, function(err) {
                failure(err);
            });
        } else {
            console.log("systemConnect error with " + xhr.status);
            console.log(xhr.getAllResponseHeaders());
            console.log(xhr.responseText);
            failure(xhr.responseText);
        }
    };
    xhr.onerror = function(e) {
        console.log("There was an error calling systemConnect: ");
        console.log(e);
        Settings.setString(settingsPrefix + "X-CSRF-Token", null);
        Settings.setString(settingsPrefix + "Drupal-Cookie", null);
        failure(e);
    };
    environment === TITANIUM && xhr.clearCookies(SITE_ROOT);
    xhr.send();
}

function makeRequest(config, success, failure, headers) {
    var trace = "makeRequest()\n", url = REST_PATH + config.servicePath, xhr = createHTTPClient();
    trace += config.httpMethod + " " + url + "\n";
    config.timeout && (xhr.timeout = config.timeout);
    xhr.open(config.httpMethod, url);
    xhr.onerror = function(e) {
        console.log(JSON.stringify(e));
        console.log("FAILED REQUEST:");
        console.log(trace);
        console.log(config.params);
        failure(e);
    };
    xhr.onload = function() {
        if (200 === xhr.status) {
            var responseData = JSON.parse(xhr.responseText);
            success(responseData);
        } else {
            console.log("makeRequest returned with status " + xhr.status);
            failure(xhr.responseText);
        }
    };
    xhr.ondatastream = config.progress;
    xhr.setRequestHeader("Accept", "application/json");
    if (config.contentType) {
        xhr.setRequestHeader("Content-Type", config.contentType);
        trace += "Content-Type: " + config.contentType + "\n";
    }
    if (headers) for (var key in headers) {
        trace += key + ": " + headers[key] + "\n";
        xhr.setRequestHeader(key, headers[key]);
    }
    if (config.trace) {
        console.log(trace);
        console.log(config.params);
    }
    config.contentType && config.contentType.replace("application/x-www-form-urlencoded", "") != config.contentType && (config.params = Object.keys(config.params).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(config.params[k]);
    }).join("&"));
    xhr.send(config.params);
}

function makeAuthenticatedRequest(config, success, failure, _headers) {
    var headers = _headers || {};
    if (!config.skipCookie) {
        var cookie = Settings.getString(settingsPrefix + "Drupal-Cookie");
        headers["Cookie"] = cookie;
    }
    if (!config.skipCsrfToken) {
        var token = Settings.getString(settingsPrefix + "X-CSRF-Token");
        headers["X-CSRF-Token"] = token;
    }
    makeRequest(config, success, failure, headers);
}

function createAccount(user, success, failure, headers) {
    console.log("Registering new user: " + JSON.stringify(user) + " with cookie " + Settings.getString(settingsPrefix + "Drupal-Cookie"));
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "user/register.json",
        contentType: "application/json",
        params: JSON.stringify(user)
    }, function(responseData) {
        console.log("registerNewUser SUCCESS");
        success(responseData);
    }, function(err) {
        console.log("registerNewUser FAIL");
        failure(err);
    }, headers);
}

function login(username, password, success, failure, headers) {
    var user = {
        username: username,
        password: password
    };
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "user/login.json",
        contentType: "application/json",
        params: JSON.stringify(user)
    }, function(responseData) {
        var cookie = responseData.session_name + "=" + responseData.sessid;
        Settings.setString(settingsPrefix + "Drupal-Cookie", cookie);
        console.log("login saving new cookie " + cookie);
        Settings.setString(settingsPrefix + "X-CSRF-Token", null);
        getCsrfToken(function() {
            success(responseData.user);
        }, function(err) {
            failure(err);
        });
    }, failure, headers);
}

function resetPassword(uid, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "user/" + uid + "/password_reset.json",
        contentType: "application/json"
    }, function(responseData) {
        success(responseData);
    }, failure, headers);
}

function logout(success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "user/logout.json"
    }, function(response) {
        Settings.setString(settingsPrefix + "X-CSRF-Token", null);
        success(response);
    }, failure, headers);
}

function getView(viewName, args, success, failure, headers) {
    makeAuthenticatedRequest({
        servicePath: "views/" + viewName + ".json?" + encodeUrlString(args),
        httpMethod: "GET",
        contentType: "application/json"
    }, success, failure, headers);
}

function getResource(resourceName, args, success, failure, headers) {
    makeAuthenticatedRequest({
        servicePath: resourceName + ".json?" + encodeUrlString(args),
        httpMethod: "GET"
    }, success, failure, headers);
}

function postResource(resourceName, object, success, failure, headers) {
    makeAuthenticatedRequest({
        servicePath: resourceName + ".json",
        httpMethod: "POST",
        params: JSON.stringify(object)
    }, success, failure, headers);
}

function putResource(resourceName, object, success, failure, headers) {
    makeAuthenticatedRequest({
        servicePath: resourceName + ".json",
        httpMethod: "PUT",
        contentType: "application/json",
        params: JSON.stringify(object)
    }, success, failure, headers);
}

function createNode(node, success, failure) {
    makeAuthenticatedRequest({
        servicePath: "node",
        httpMethod: "POST",
        contentType: "application/json",
        params: JSON.stringify({
            node: node
        })
    }, function(response) {
        success(response);
    }, function(response) {
        console.log(JSON.stringify(response));
        failure(response);
    });
}

function uploadFile(base64data, filename, filesize, success, failure, progress, headers) {
    var fileDescription = {
        file: base64data,
        filename: filename,
        filesize: "" + filesize
    };
    makeAuthenticatedRequest({
        servicePath: "file.json",
        httpMethod: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        params: fileDescription,
        progress: progress
    }, success, failure, headers);
}

function encodeUrlString(args) {
    var parts = [];
    for (var i in args) {
        var arg = args[i];
        parts.push(i + "=" + encodeURIComponent(arg));
    }
    return parts.join("&");
}

function getNode(resourceName, success, failure, headers) {
    makeAuthenticatedRequest({
        servicePath: resourceName + ".json",
        httpMethod: "GET"
    }, function(response) {
        success(response);
    }, function(err) {
        failure(err);
    }, headers);
}

var Settings, createHTTPClient;

var environment;

var TITANIUM = 1;

var NODE = 2;

var settingsPrefix = "";

if ("undefined" != typeof Ti) {
    environment = TITANIUM;
    Settings = Ti.App.Properties;
    createHTTPClient = Ti.Network.createHTTPClient;
} else {
    environment = NODE;
    var npSettings = require("node-persist");
    Settings = {
        setString: function(name, value) {
            npSettings.setItem(name, value);
        },
        getString: function(name, defaultValue) {
            var item = npSettings.getItem(name);
            if (void 0 === item) return defaultValue;
            return item;
        }
    };
    npSettings.initSync();
    createHTTPClient = require("./httpClient.js").createHTTPClient;
}

var REST_PATH, SITE_ROOT, SERVICES_ENDPOINT;

exports.Settings = Settings;

exports.setSettingsPrefix = function(p) {
    settingsPrefix = p;
};

exports.field = require("./field");

exports.setRestPath = setRestPath;

exports.systemConnect = systemConnect;

exports.makeRequest = makeRequest;

exports.makeAuthenticatedRequest = makeAuthenticatedRequest;

exports.createAccount = createAccount;

exports.login = login;

exports.resetPassword = resetPassword;

exports.logout = logout;

exports.getResource = getResource;

exports.postResource = postResource;

exports.putResource = putResource;

exports.createNode = createNode;

exports.uploadFile = uploadFile;

exports.getView = getView;

exports.getNode = getNode;