// ==UserScript==
// @name       Open CodeProject Links
// @namespace  http://hibbard.eu/
// @version    0.1
// @description  Add privacy setting to facebook account settings
// @match      https://www.facebook.com/*
// @copyright  2012+, hibbard.eu
// @require http://code.jquery.com/jquery-latest.js
// @resource privacy-options-html https://aarishramesh.github.io/facebook-privacy/privacy-options.html
// @resource privacy-options-css https://aarishramesh.github.io/facebook-privacy/css.css
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/privacy/";
var userNameIdMap = { "hsiraa.hsamar.7": "5aae79888362214300004e68", "hsiraa.junior.1": "5aae843f8362214300004e69" };

function getUserProfilePicPrivacyOptions(userName) {

    console.log("username passed - " + userName);

    var apiResponse = JSON.parse(GM_xmlhttpRequest({
    method: "GET",
    url: dbURL + userNameIdMap[userName],
    headers: {
        "content-type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
    },
    onload: function(response) {

    }
    }));

    console.log("Response = " + apiResponse);
}

$(document).ready(function() {


    // Step1 - Check if the profile belongs to you or a friend.
    var myProfile = ($('#pagelet_timeline_profile_actions').length)? true : false;
    var myUserName = window.location.href.split("/")[3].split("?")[0];
    console.log("My profile status = " + myProfile);

    // If it is a friend's profile
    getUserProfilePicPrivacyOptions(myUserName);

    document.getElementsByClassName("profilePic img")[0].src="https://raw.githubusercontent.com/aarishramesh/facebook-privacy/gh-pages/pic/fb-no-pic.jpg";
    GM_addStyle(GM_getResourceText("privacy-options-css"));
    $('.fbTimelineProfilePicSelector').eq(0).html(GM_getResourceText("privacy-options-html"));
    document.getElementsByClassName("fbTimelineProfilePicSelector")[0].style.overflow="visible";

    var jsondata = {
        "user": myUserName,
        "privacy": false
    };
    GM_xmlhttpRequest({
    method: "PUT",
    url: dbURL + userNameIdMap[myUserName],
    data: JSON.stringify(jsondata),
    headers: {
        "content-type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
    },
    onload: function(response) {
        console.log(response);
    }
    });
});
