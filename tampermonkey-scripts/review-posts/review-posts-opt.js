// ==UserScript==
// @name         Review posts opt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/settings?tab=timeline
// @resource style     file:///home/ANT.AMAZON.COM/dwarakam/Desktop/css.css
// @grant        GM_addStyle
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==

var apiKey = "b7956d233ee9db7d38e61bf2431aced2adc21";
var dbURL = "https://fbprivacy-0572.restdb.io/rest/tagreviewfeed/";
var userNameIdMap = { "UserTwo": "5ad2330bc8cf2a050000368f", "UserOne": "5ad232fbc8cf2a050000368d" };

unsafeWindow.pushVal = function () {
    var username = document.getElementsByClassName('_1vp5')[0].innerHTML;
    console.log(username);
    var opt = document.getElementById("reviewPosts").value;
    var bool = false;
    if (opt == 'on')
        bool = true;
    var jsondata = {
        "username": username,
        "tagfeedreviewopt": bool
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

li.setAttribute('class', 'uiList fbSettingsList fbSettingsListBorderTop fbSettingsListBorderBottom _4kg _4ks');

//li.innerHTML = '<a class="fbSettingsListLink clearfix pvm phs" role="button" aria-expanded="false" href="/settings?tab=timeline&amp;section=expansion" rel="ignore" data-meta="{"ajaxify":"\/ajax\/settings\/tagging\/expansion.php","rel":"async"}" data-onclick="[["SettingsController","handleLinkClick",{"__elem":1}]]"><span style="padding-left: 23px;" class="uiIconText fbSettingsListItemEdit"><i class="img sp_d_aM8Z63WcI_2x sx_b9f7bf" style="top: -2px;"></i><span class="fbSettingsListItemEditText">Edit</span></span><span class="fbSettingsListItemSaved hidden_elem">Changes saved</span><span class="fbSettingsListItemContent fcg"><div class="_nll">Review posts in which you are tagged in before audience of the post see in their news feed?</div><div class="_nlm fwb">Friends</div></span></a>';

li.innerHTML = '<span><div class="clearfix"><i class="_8o _8s lfloat _ohe img sp_-OqlI68sSK1 sx_58886d"></i><div class="_42ef"><div>Review posts before the audience of the posts see in their news feed ?</div></div></div></span><span style="width:100px"><div class="_6a _6b"><div class="_6a _6b uiPopover" id="u_1w_l"><select onchange="pushVal()" class="review_posts" id="reviewPosts"><option value="on">Enable</option><option value="off">Disable</option></div></select></span>';

document.getElementsByClassName('uiList fbSettingsList fbSettingsListBorderTop fbSettingsListBorderBottom _4kg _4ks')[0].appendChild(li);