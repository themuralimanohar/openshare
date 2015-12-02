"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,i,a){return i&&t(e.prototype,i),a&&t(e,a),e}}();!function t(e,i,a){function r(n,o){if(!i[n]){if(!e[n]){var l="function"==typeof require&&require;if(!o&&l)return l(n,!0);if(s)return s(n,!0);var h=new Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var u=i[n]={exports:{}};e[n][0].call(u.exports,function(t){var i=e[n][1][t];return r(i?i:t)},u,u.exports,t,e,i,a)}return i[n].exports}for(var s="function"==typeof require&&require,n=0;n<a.length;n++)r(a[n]);return r}({1:[function(t,e,i){!function(){var e=t("./modules/open-share"),i=t("./modules/data-attr");new i(e)}()},{"./modules/data-attr":2,"./modules/open-share":3}],2:[function(t,e,i){e.exports=function(){function t(e){_classCallCheck(this,t),this.OpenShare=e,document.addEventListener("open-share-init",this.init.bind(this)),this.init()}return _createClass(t,[{key:"init",value:function(){var t=document.querySelectorAll("[data-open-share]:not([data-open-share-node])");[].forEach.call(t,this.initializeNode.bind(this))}},{key:"initializeNode",value:function(t){var e=this,i=t.getAttribute("data-open-share"),a=i.indexOf("-"),r=void 0;if(a>-1){var s=i.substr(a+1,1),n=i.substr(a,2);i=i.replace(n,s.toUpperCase())}r=new this.OpenShare(i),t.getAttribute("data-open-share-dynamic")&&(r.dynamic=!0),this.setData(r,t),t.addEventListener("click",function(t){r.dynamic&&e.setData(r,t.currentTarget),r.share(t)}),t.setAttribute("data-open-share-node",i)}},{key:"setData",value:function(t,e){t.setData({url:e.getAttribute("data-open-share-url"),text:e.getAttribute("data-open-share-text"),via:e.getAttribute("data-open-share-via"),hashtags:e.getAttribute("data-open-share-hashtags"),tweetId:e.getAttribute("data-open-share-tweet-id"),related:e.getAttribute("data-open-share-related"),screenName:e.getAttribute("data-open-share-screen-name"),userId:e.getAttribute("data-open-share-user-id"),link:e.getAttribute("data-open-share-link"),picture:e.getAttribute("data-open-share-picture"),caption:e.getAttribute("data-open-share-caption"),description:e.getAttribute("data-open-share-description"),title:e.getAttribute("data-open-share-title"),media:e.getAttribute("data-open-share-media"),to:e.getAttribute("data-open-share-to"),subject:e.getAttribute("data-open-share-subject"),body:e.getAttribute("data-open-share-body")})}}]),t}()},{}],3:[function(t,e,i){e.exports=function(){function t(e){if(_classCallCheck(this,t),!this[e])throw new Error("Open Share: "+e+" is an invalid type");this.ios=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,this.type=e,this.dynamic=!1,this.typeCaps=e.charAt(0).toUpperCase()+e.slice(1)}return _createClass(t,[{key:"setData",value:function(t){return this[this.type](t)}},{key:"share",value:function(t){var e=this;this.ios?(window.location=this.iosShareUrl,setTimeout(function(){document.webkitHidden||window.open(e.shareUrl,"OpenShare")},25)):"email"===this.type?window.location=this.shareUrl:window.open(this.shareUrl,"OpenShare")}},{key:"template",value:function(t,e){var i=t,a=void 0;for(a in e)e[a]&&(e[a]=encodeURIComponent(e[a]),i+=a+"="+e[a]+"&");return i.substr(0,i.length-1)}},{key:"validate",value:function(t,e){var i=this;return t.forEach(function(t){if(t.includes("|")){var a=!0;t=t.split("|"),t.forEach(function(t){e[t]&&(a=!1)}),a&&i.missingOptions(t)}else e[t]||i.missingOptions(t)}),!0}},{key:"missingOptions",value:function(t){var e="Open Share "+this.typeCaps+": missing ";throw Array.isArray(t)?(t.forEach(function(t){e+=t+" or "}),e=e.substring(0,e.length-4)):"string"==typeof t&&(e+=t+" attribute"),new Error(e)}},{key:"twitter",value:function(t){if(this.validate(["url|text"],t),this.ios){var e="";if(t.text&&(e+=t.text),t.url&&(e+=" - "+t.url),t.hashtags){var i=t.hashtags.split(",");i.forEach(function(t){e+=" #"+t})}t.via&&(e+=" via "+t.via),this.iosShareUrl=this.template("twitter://post?",{message:e})}this.shareUrl=this.template("https://twitter.com/share?",{url:t.url,text:t.text,via:t.via,hashtags:t.hashtags})}},{key:"twitterRetweet",value:function(t){this.validate(["tweetId"],t),this.shareUrl=this.template("https://twitter.com/intent/retweet?",{tweet_id:t.tweetId,related:t.related})}},{key:"twitterLike",value:function(t){this.validate(["tweetId"],t),this.shareUrl=this.template("https://twitter.com/intent/favorite?",{tweet_id:t.tweetId,related:t.related})}},{key:"twitterFollow",value:function(t){this.validate(["screenName|userId"],t),this.shareUrl=this.template("https://twitter.com/intent/user?",{screen_name:t.screenName,user_id:t.userId})}},{key:"facebook",value:function(t){this.validate(["link"],t),this.shareUrl=this.template("https://www.facebook.com/dialog/feed?app_id=961342543922322&redirect_uri=http://facebook.com&",{link:t.link,picture:t.picture,caption:t.caption,description:t.description})}},{key:"facebookSend",value:function(t){this.validate(["link"],t),this.shareUrl=this.template("https://www.facebook.com/dialog/send?app_id=961342543922322&redirect_uri=http://facebook.com&",{link:t.link})}},{key:"google",value:function(t){this.validate(["url"],t),this.shareUrl=this.template("https://plus.google.com/share?",{url:t.url})}},{key:"pinterest",value:function(t){this.validate(["media"],t),this.shareUrl=this.template("https://pinterest.com/pin/create/bookmarklet/?",{media:t.media,url:t.url,description:t.description})}},{key:"linkedin",value:function(t){this.validate(["url"],t),this.shareUrl=this.template("http://www.linkedin.com/shareArticle?",{url:t.url,title:t.title})}},{key:"buffer",value:function(t){this.validate(["url"],t),this.shareUrl=this.template("http://bufferapp.com/add?",{url:t.url,text:t.text})}},{key:"tumblr",value:function(t){this.validate(["url"],t),this.shareUrl=this.template("https://www.tumblr.com/widgets/share/tool?",{url:t.url,title:t.title,caption:t.caption})}},{key:"reddit",value:function(t){this.validate(["url"],t),this.shareUrl=this.template("http://reddit.com/submit?",{url:t.url,title:t.title})}},{key:"whatsapp",value:function(t){this.validate(["text"],t),this.shareUrl=this.template("whatsapp://send?",{text:t.text})}},{key:"sms",value:function(t){this.validate(["body"],t),this.shareUrl=this.template(this.ios?"sms:&":"sms:?",{body:t.body})}},{key:"email",value:function(t){var e="mailto:";null!==t.to&&(e+=""+t.to),e+="?",this.shareUrl=this.template(e,{subject:t.subject,body:t.body})}}]),t}()},{}]},{},[1]);