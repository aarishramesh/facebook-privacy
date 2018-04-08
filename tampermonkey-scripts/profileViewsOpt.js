// ==UserScript==
// @name         Profile view opt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/settings?tab=notifications&section=on_facebook&view
// @resource style     file:///home/ANT.AMAZON.COM/dwarakam/Desktop/css.css
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/profilepicviewopt/";
var userNameIdMap = { "UserTwo": "5aae88388362214300004ee0", "UserOne": "5aae87a08362214300004edc" };

unsafeWindow.pushVal = function () {
    var username = document.getElementsByClassName('_1vp5')[0].innerHTML;
    var opt = document.getElementById("profilePrivacyOpt").value;
    var bool = false;
    if (opt == 'on')
        bool = true;
    var jsondata = {
        "username": username,
        "profile_visits_opt": bool
    };
    GM_xmlhttpRequest({
    method: "PUT",
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

var li = document.createElement('li');

li.setAttribute('id', 'profile_view_notif');

li.innerHTML = '<span><div class="clearfix"><i class="_8o _8s lfloat _ohe img sp_-OqlI68sSK1 sx_58886d"></i><div class="_42ef"><div>Who views my profile ?</div><div class="fsm fwn fcg">Choose whether you want to get notifications when your people visit your profile.</div></div></div></span><span style="width:100px"><div class="_6a _6b"><div class="_6a _6b uiPopover" id="u_1w_l"><select onchange="pushVal()" class="fb_privacy" id="profilePrivacyOpt"><option value="on">On</option><option value="off">Off</option></div></select></span>';

document.getElementsByClassName('uiList _1uyq _4kg _6-j _6-i')[0].appendChild(li);