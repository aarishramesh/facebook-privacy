// ==UserScript==
// @name         Poll and show visited users
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/*
// @require http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var profilePicViewUrl = "https://fbprivacy-0572.restdb.io/rest/profilepicview";
var profilePicViewOptUrl = "https://fbprivacy-0572.restdb.io/rest/profilepicviewopt/";
var userNameIdMap = { "UserTwo": "5aae88388362214300004ee0", "UserOne": "5aae87a08362214300004edc" };

var pollTimer = setInterval(function() {
     try {
          var username = document.getElementsByClassName('_1vp5')[0].innerHTML;
          var profileViewOpt, lastfetchedtime;

          // Check if the privacy option is enabled for the user
          GM_xmlhttpRequest({
               method: "GET",
               url: profilePicViewOptUrl + userNameIdMap[username],
               headers: {'Content-Type': "application/json",
                         'x-apikey':apiKey,
                         'cache-control': "no-cache"},
               onload: function(data){
                    // check if null return (no results from API)
                    if (data === null) {  // <-- note that you should use === rather than == for checking against null
                        console.log('no data!');
                    } else {
                       var responseValue = JSON.parse(data.responseText);
                        profileViewOpt = responseValue.profile_visits_opt;
                        lastfetchedtime = responseValue.lastfetchedtime;
                        console.log(profileViewOpt);
                        showUsersVisited(apiKey, profilePicViewUrl, username, profileViewOpt, lastfetchedtime);
                    }
               },
               onerror: function(err) {
                   console.log(err);
               }
         });
    } catch(e) {}
}, 2000);

function showUsersVisited(apiKey, dbURL, user, profileViewOpt, lastfetchedtime){
     if (profileViewOpt) {
         var queryUrl = dbURL + "?q={\"visiteduser\": \"" + user + "\", \"visitedtime\":{\"$gt\":" + lastfetchedtime+ "}}";
         console.log(queryUrl);

          GM_xmlhttpRequest({
               method: "GET",
               url: queryUrl,
               headers: {'Content-Type': "application/json",
                         'x-apikey':apiKey,
                         'cache-control': "no-cache"},
               onload: function(data){
                    // check if null return (no results from API)
                    if (data === null) {  // <-- note that you should use === rather than == for checking against null
                        console.log('no data!');
                    } else {
                        displayVisitedUsers(data, user); // if data in json format, will instead need console.log(JSON.stringify(data)) here
                    }
               },
               onerror: function(err) {
                   console.log(err);
               }
         });
        }
}
function displayVisitedUsers(response, user) {
    console.log(response.responseText);
    var responseValue = JSON.parse(response.responseText);
    var lastfetchedtime = -1;
    if (responseValue != undefined) {
    for (var responseObj in responseValue) {
        if (responseValue.hasOwnProperty(responseObj)) {
            var val = responseValue[responseObj];
            if (val.visiteduser != undefined && val.visitedtime != undefined) {
               console.log(val.visiteduser + " : " + val.visitedtime);
               d = new Date(val.visitedtime);
               var msg = val.visiteduser + " has visited user profile " +
                   " at " + d;
               alert(msg);
               // Update the lastfetched time for the user
               lastfetchedtime = val.visitedtime;

            }
        }
    }
        if (lastfetchedtime != -1) {
            var jsondata = {
                  "user": user,
                  "lastfetchedtime": lastfetchedtime
               };
                GM_xmlhttpRequest({
                    method: "PUT",
                    url: profilePicViewOptUrl + userNameIdMap[user],
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
            console.log("profile pic view time updated for " + user);
        }
    }
}