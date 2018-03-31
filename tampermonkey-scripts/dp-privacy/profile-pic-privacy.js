// ==UserScript==
// @name       Facebook Privacy - Profile Picture
// @namespace  https://aarish.in/
// @version    0.2
// @description  Add privacy to facebook account settings
// @match      https://www.facebook.com/*
// @copyright  2018+, aarish.in
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @resource privacy-options-html https://aarishramesh.github.io/facebook-privacy/tampermonkey-scripts/dp-privacy/privacy-options.html
// @resource privacy-options-css https://aarishramesh.github.io/facebook-privacy/tampermonkey-scripts/dp-privacy/css.css
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/privacy/";
var userNameIdMap = { "hsiraa.hsamar.7": "5aae79888362214300004e68", "hsiraa.junior.1": "5aae843f8362214300004e69" };
var fb_dp_privacy_options = { "fb_dp_privacy_false": false, "fb_dp_privacy_true": true };

function fetchUserProfilePicPrivacyOptions(userName) {

    // Use this documentation to parse response -
    // https://wiki.greasespot.net/GM.xmlHttpRequest#Response_Object
    GM_xmlhttpRequest({
        method: "GET",
        url: dbURL + userNameIdMap[userName],
        headers: {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        },
        onload: function(response) {
            fetchUserProfilePicPrivacyOptionsCallBack(response);
        }
    });
}

function fetchUserProfilePicPrivacyOptionsCallBack(response) {
    var responseValue = JSON.parse(response.responseText);
    if (responseValue.privacy) {
        document.getElementsByClassName("profilePic img")[0].src="https://raw.githubusercontent.com/aarishramesh/facebook-privacy/master/tampermonkey-scripts/dp-privacy/pic/fb-no-pic.jpg";
    }
}

function myProfileSettings(userName) {
    GM_addStyle(GM_getResourceText("privacy-options-css"));
    $('.fbTimelineProfilePicSelector').eq(0).html(GM_getResourceText("privacy-options-html"));
    document.getElementsByClassName("fbTimelineProfilePicSelector")[0].style.overflow="visible";

    $('.fb_dp_privacy_options').click(function() {
        $('#fb_dp_privacy_selected').html(this.innerHTML);
        saveDisplayPicPrivacyOptions(userName, fb_dp_privacy_options[this.id]);
    });
}

function saveDisplayPicPrivacyOptions(userName, privacyBool) {
    var jsondata = {
        "user": userName,
        "privacy": privacyBool
    };
    GM_xmlhttpRequest({
        method: "PUT",
        url: dbURL + userNameIdMap[userName],
        data: JSON.stringify(jsondata),
        headers: {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        },
        onload: function(response) {
            console.log("Privacy status saved for the username - " + userName + " with as - " + privacyBool);
        }
    });
}

window.onload = function() {

    // Step1 - Check if the profile belongs to you or a friend.
    var myProfile = (document.getElementById('pagelet_timeline_profile_actions').children.length > 2)? false : true;
    var myUserName = window.location.href.split("/")[3].split("?")[0];
    console.log("My profile name - " + myUserName);
    console.log("profile mine? = " + myProfile);

    // If it is a friend's profile
    if (!myProfile) {
        fetchUserProfilePicPrivacyOptions(myUserName);
    } else {
        myProfileSettings(myUserName);
    }

};
