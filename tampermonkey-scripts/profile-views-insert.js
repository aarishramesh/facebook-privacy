// ==UserScript==
// @name         Profile view insert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/hsiraa.junior.1*friends*
// @resource style     file:///home/ANT.AMAZON.COM/dwarakam/Desktop/css.css
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var profilePicViewUrl = "https://fbprivacy-0572.restdb.io/rest/profilepicview/";
var profilePicViewOptUrl = "https://fbprivacy-0572.restdb.io/rest/profilepicviewopt/";
var userNameIdMap = { "hsiraa.hsamar.7": "5aae88388362214300004ee0", "hsiraa.junior.1": "5aae87a08362214300004edc" };

unsafeWindow.insertVisitor = function () {
    var username = "hsiraa.junior.1";
    var profileViewOpt;

    // Check if the privacy option is enabled for the user
     try {
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
                        console.log(responseValue.profile_visits_opt);
                        profileViewOpt = responseValue.profile_visits_opt;
                        console.log(profileViewOpt);
                        checkPrivacyOptionAndInsert(username, profileViewOpt, profilePicViewUrl);
                    }
               },
               onerror: function(err) {
                   console.log(err);
               }
         });
    } catch(e) {}
};

insertVisitor();

function checkPrivacyOptionAndInsert(username, profileViewOpt, dbUrl) {
    console.log(profileViewOpt);
    if (profileViewOpt) {
        var visiteduser = document.getElementsByClassName('_2nlw _2nlv')[0].innerHTML;
        console.log(visiteduser);
        var d = new Date();
        var visitedtime = d.getTime();
        var jsondata = {
         "user": username,
         "visiteduser": visiteduser,
         "visitedtime" : visitedtime
        };
        GM_xmlhttpRequest({
        method: "POST",
        url: dbUrl + userNameIdMap[username],
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
    }
}