// ==UserScript==
// @name         Profile view insert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/hsiraa.junior.1?pnref=lhc.friends
// @resource style     file:///home/ANT.AMAZON.COM/dwarakam/Desktop/css.css
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/profilepicview/";
var userNameIdMap = { "hsiraa.hsamar.7": "5aae88388362214300004ee0", "hsiraa.junior.1": "5aae87a08362214300004edc" };

unsafeWindow.insertVisitor = function () {
    var username = "hsiraa.junior.1";
    var visiteduser = "UserTwo UserTwo";
    var d = new Date();
    var visitedtime = d.getTime();
    var jsondata = {
        "user": username,
        "visiteduser": visiteduser,
        "visitedtime" : visitedtime
    };
    GM_xmlhttpRequest({
    method: "POST",
    url: dbURL + userNameIdMap[username],
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
};

insertVisitor();
//var visitor = document.getElementsById();