!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=32)}({29:function(e,t,n){"use strict";var o=n(6),r=function(e,t){var n={special_token:null,battle_key:battle_id},r="http://game.granbluefantasy.jp/quest/use_normal_item?t="+(new Date).getTime()+"&uid="+user_id;(0,o.post_by_cookie)(r,{body:JSON.stringify(n)},function(e){return t(e)})};e.exports={get_battle_room_href:function e(t,n){var a={special_token:null,battle_key:t},i="http://game.granbluefantasy.jp/quest/battle_key_check?t="+(new Date).getTime()+"&uid="+n;(0,o.post_by_cookie)(i,{body:JSON.stringify(a)},function(o){var a=o.redirect,i=o.current_battle_point,c=o.battle_point_check;if(o.used_battle_point,a&&(window.location.href=a),"number"==typeof i&&!c){var s=c-i;s<=0&&(s=5),r(s,function(o){return e(t,n)})}})}}},30:function(e,t,n){"use strict";var o=null,r=function(e){var t=document.getElementsByClassName("prt-wanted-list")[0];t&&(o||((o=new MutationObserver(function(n){for(var o=document.getElementsByClassName("txt-room-comment"),r=[],a=0,i=o.length;a<i;a++)for(var c=o[a].innerText,s=e.split(";"),l=0,u=s.length;l<u;l++){var d=s[l];c.includes(d)&&l==u-1&&r.push(a)}for(var m=0,f=t.children.length;m<f;m++){var g=t.children[m];g.style.display="none";for(var h=0,p=r.length;h<p;h++)m==r[h]&&(g.style.display="")}})).observe(t,{attributes:!0,childList:!0,characterData:!0}),console.log("observer start")))},a=function(e){e.disconnect(),console.log("observer end")};e.exports={roomObserve:r,roomObserveBreaker:a,initRoomSearch:function(){location.href.includes("coopraid")&&chrome.extension.sendMessage({message:"get_search"},function(e){var t=e.search,n=new MutationObserver(function(e){document.getElementsByClassName("prt-wanted-list")[0]&&(r(t),a(n))});n.observe(document.getElementsByTagName("body")[0],{attributes:!0,childList:!0,characterData:!0})})},is_character_page:function(){return!!document.getElementsByClassName("btn-lis-user").length},check_characters:function(){var e=[],t=!0,n=!1,o=void 0;try{for(var r,a=document.getElementsByClassName("btn-lis-user")[Symbol.iterator]();!(t=(r=a.next()).done);t=!0){var i=r.value.dataset,c=i.nickName,s=i.userId,l=i.userRank;e.push({nickName:c,userId:s,userRank:l})}}catch(e){n=!0,o=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw o}}return e}}},31:function(e,t,n){"use strict";var o=function(){var e=document.getElementById("liver-collection-container"),t=document.createElement("div");t.id="scrollHoverContainer",t.style.cssText="position:fixed;right:0px;top:0px;width:30px;height:100%;",e.appendChild(t),t.addEventListener("mouseover",r.bind(void 0),!1)},r=function(e){var t=document.getElementById("scrollHoverContainer"),n=document.getElementById("liver-collection-container")||document.getElementById("liver-collection-container-hover");n.id="liver-collection-container-hover",t.style.display="none",setTimeout(function(){n.id="liver-collection-container",t.style.display="block"},3e3)},a=function(e){var t=document.getElementById("mobage-game-container").parentNode.parentNode.firstChild,n=document.getElementById("mobage-game-container").parentNode;e?(t.style.display="block",n.style.marginLeft="64px"):(t.style.display="none",n.style.marginLeft="0px")},i=function(e){document.getElementById("submenu").style.display=e?"block":"none"},c=function(e){var t=document.getElementById("mobage-game-container");t&&(t.style.zoom=e)};e.exports={initStyles:function(){document.getElementById("mobage-game-container")&&(document.getElementById("mobage-game-container").parentNode.id="liver-collection-container",chrome.extension.sendMessage({message:"get_scroll_options"},function(e){e.status&&o()}),chrome.extension.sendMessage({message:"get_sider_options"},function(e){var t=e.left,n=e.right;!t&&a(t),!n&&i(n)}))},initZoom:function(){chrome.extension.sendMessage({message:"get_zoom"},function(e){var t=e.zoom;c(t)})},setZoom:c,controlLeftSider:a,controlRightSider:i,initScrollHoverContainer:o,removeEvent:function(){var e=document.getElementById("scrollHoverContainer");e.parentNode.removeChild(e)}}},32:function(e,t,n){"use strict";var o=n(31),r=n(30),a=n(29);(0,o.initStyles)(),(0,o.initZoom)(),(0,r.initRoomSearch)(),chrome.runtime.onConnect.addListener(function(e){switch(e.name){case"popup_to_content":e.onMessage.addListener(function(t){var n=t.zoom,i=t.message,c=t.search,s=t.type,l=t.status,u=t.battleId,d=t.userId;switch(i){case"set_zoom":(0,o.setZoom)(n);break;case"open_coopraid_search":(0,r.roomObserve)(c);break;case"close_coopraid_search":break;case"is_character_page":e.postMessage({flag:(0,r.is_character_page)()});break;case"check_ub_characters":e.postMessage({datas:(0,r.check_characters)()});break;case"sider_status":"is_left_sider_show"==s?(0,o.controlLeftSider)(l):(0,o.controlRightSider)(l);break;case"check_black_list":e.postMessage({datas:(0,r.check_characters)()});break;case"scroll_style_status":l?(0,o.initScrollHoverContainer)():(0,o.removeEvent)();break;case"battle_key_check":(0,a.get_battle_room_href)(u,d)}})}})},6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.upload_to_server=function(e,t,n){if(e){var o={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};o=Object.assign(o,t),fetch(e,o).then(function(e){return e.text()}).then(function(e){return n(e)}).catch(function(e){})}},t.get_by_cookie=function(e,t,n){if(e){var o={credentials:"include"};o=Object.assign(o,t),fetch(e,o).then(function(e){return e.json()}).then(function(e){return n(e)}).catch(function(e){})}},t.post_by_cookie=function(e,t,n){if(e){var o={method:"POST",mode:"no-cors",credentials:"include"};o=Object.assign(o,t),fetch(e,o).then(function(e){return e.json()}).then(function(e){return n(e)}).catch(function(e){})}}}});