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

$(document).ready(function() {

    var sunflower = "5aae79888362214300004e68"; //hsiraa.hsamar.7

    document.getElementsByClassName("profilePic img")[0].src="https://raw.githubusercontent.com/aarishramesh/facebook-privacy/gh-pages/pic/fb-no-pic.jpg";
    GM_addStyle(GM_getResourceText("privacy-options-css"));
    $('.fbTimelineProfilePicSelector').eq(0).html(GM_getResourceText("privacy-options-html"));
    document.getElementsByClassName("fbTimelineProfilePicSelector")[0].style.overflow="visible";

    var username = window.location.href.split("/")[3].split("?")[0];
    var jsondata = {
        "user": username,
        "privacy": true
    };
    GM_xmlhttpRequest({
    method: "PUT",
    url: "https://fbprivacy-0572.restdb.io/rest/privacy/" + sunflower,
    data: JSON.stringify(jsondata),
    headers: {
        "content-type": "application/json",
        "x-apikey": "b7956d233ee9db7d38e61bf2431aced2adc21",
        "cache-control": "no-cache"
    },
    onload: function(response) {
        console.log(response);
        //$("#input").get()[0].value=response.responseText;
    }
    });
    });
