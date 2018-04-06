// ==UserScript==
// @name         Poll and show visited users
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/hsiraa.junior.1
// @require http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/profilepicview";
var userNameIdMap = { "hsiraa.hsamar.7": "5aae88388362214300004ee0", "hsiraa.junior.1": "5aae87a08362214300004edc" };

var pollTimer = setInterval(function() {
     try {
          GM_xmlhttpRequest({
               method: "GET",
               url: dbURL,
               headers: {'Content-Type': "application/json",
                         'x-apikey':apiKey,
                         'cache-control': "no-cache"},
               onload: function(data){
                    // check if null return (no results from API)
                    if (data === null) {  // <-- note that you should use === rather than == for checking against null
                        console.log('no data!');
                    } else {
                        displayVisitedUsers(data); // if data in json format, will instead need console.log(JSON.stringify(data)) here
                    }
               },
               onerror: function(err) {
                   console.log(err);
               }
         });
    } catch(e) {}
}, 5000);  // check every 3000 milliseconds

function displayVisitedUsers(response) {
    var responseValue = JSON.parse(response.responseText);
    for (var responseObj in responseValue) {
        //console.log(responseObj);
        //console.log(responseObj._id + " : " + responseObj.visiteduser + " : " + responseObj.user + " : " + responseObj.visitedtime);
        if (responseValue.hasOwnProperty(responseObj)) {
            var val = responseValue[responseObj];
            console.log(val.visiteduser + " : " + val.visitedtime);
            var visitedtime = val.visitedtime;
            var d = new Date();
            var currtime = d.getTime() - 5000;
            if (visitedtime > currTime) {
                  // Append to the notification to show that user has visited the profile

            }
        }
    }
}