// ==UserScript==
// @name         Review posts impl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com
// @resource style     file:///home/ANT.AMAZON.COM/dwarakam/Desktop/css.css
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

// Check what is the review posts option selected for the user
// If it is not review then feed style.display sh be fine
// Otherwise if it is review then it style.display = none

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/tagreviewfeed/";
var userNameIdMap = { "UserTwo": "5ad2330bc8cf2a050000368f", "UserOne": "5ad232fbc8cf2a050000368d" };

function displayFeedBasedonOptionSelected() {
    var username = document.getElementsByClassName('_1vp5')[0].innerHTML;
    console.log(username);
          var reviewPostsOpt;

          GM_xmlhttpRequest({
               method: "GET",
               url: dbURL + userNameIdMap[username],
               headers: {'Content-Type': "application/json",
                         'x-apikey':apiKey,
                         'cache-control': "no-cache"},
               onload: function(data){
                    // check if null return (no results from API)
                    if (data === null) {  // <-- note that you should use === rather than == for checking against null
                        console.log('no data!');
                    } else {
                        var responseValue = JSON.parse(data.responseText);
                        reviewPostsOpt = responseValue.tagfeedreviewopt;
                        console.log(reviewPostsOpt);
                        var feed = document.querySelectorAll('[role="feed"]')[0];
                        var divs = feed.querySelectorAll("#substream_0, #substream_1");
                        if (reviewPostsOpt) {
                            divs.forEach(function(divItem) {
                                document.getElementById(divItem.id).style.display = 'none';
}                           );
                        } else {
                            divs.forEach(function(divItem) {
                                document.getElementById(divItem.id).style.display = 'block';
}                           );
                        }
                    }
               },
               onerror: function(err) {
                   console.log(err);
               }
         });
}

displayFeedBasedonOptionSelected();
