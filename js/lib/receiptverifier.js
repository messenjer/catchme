(function(e){function r(e,t){if(t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}function i(e,t){if(e.forEach){e.forEach(t);return}for(var n in e)e.hasOwnProperty(n)&&t(e[n])}function s(e,t){if(e.indexOf)return e.indexOf(t);for(var n in e)if(e[n]==t)return n;return-1}function u(e){if(this===window||typeof mozmarket!="undefined"&&this==mozmarket.receipts)return new u(e);e=e||{},this.overlay=null;for(var t in e)if(e.hasOwnProperty(t)&&t!="verifier"&&t!="templates"&&t!="verify"&&t!="verifierOptions"){if(this[t]===undefined)throw"Unknown option: "+t;this[t]=e[t]}if(e.templates){var r=this.templates;this.templates={};for(var t in r)this.templates[t]=r[t];for(var t in e.templates)e.templates.hasOwnProperty(t)&&(this.templates[t]=e.templates[t])}if(!this.storeURL)throw"You must provide a storeURL option";if(!this.supportHTML)throw"You must provide a supportHTML option";e.verifier&&this.respond(e.verifier);if(e.verify){var i=new n(e.verifierOptions),s=this;i.verify(function(){s.respond(i)})}}e.receipts||(e.receipts={});var t=function(){return this}();typeof atob=="undefined"&&typeof Buffer!="undefined"&&(atob=function(e){return(new Buffer(e,"base64")).toString("utf8")});var n=function(e){if(this===t)throw"You forgot new";e=e||{};for(var n in e)if(e.hasOwnProperty(n)&&this._validConstructorArguments.indexOf(n)==-1)throw"Illegal option to Verifier({}): "+n;this.app=undefined,this.products=[],this.receiptErrors={},this.receiptVerifications={},this._cacheStorage=e.cacheStorage||(typeof localStorage!="undefined"?localStorage:undefined),this.cacheTimeout=e.cacheTimeout||this.defaultCacheTimeout,this.state=new this.states.VerificationIncomplete(".verify() has not been called"),this.requestTimeout=e.requestTimeout||this.defaultRequestTimeout,this.refundWindow=e.refundWindow||this.defaultRefundWindow,this.installs_allowed_from=e.installs_allowed_from||undefined,this.onlog=e.onlog,e.logLevel&&(typeof e.logLevel=="string"?this.logLevel=this.levels[e.logLevel]:this.logLevel=e.logLevel)};n.State=function(e,i){if(e===undefined)return this;var s=function(e,n){if(this===t)throw"You forgot new";this.detail=e,r(this,n)};return i===undefined&&(i=n.State),s.prototype=new i,s.className=e,s.prototype.name=e,s},n.State.prototype.toString=function(){var e="["+this.name;this.detail&&(e+=" "+this.detail);for(var t in this)if(this.hasOwnProperty(t)&&t!="detail"){if(typeof this[t]=="object"&&this[t]&&this[t].toSource)var n=this[t].toSource();else var n=JSON.stringify(this[t]);e+=" "+t+": "+n}return e+="]",e},n.states={},n.states.VerificationIncomplete=n.State("VerificationIncomplete"),n.states.NeedsInstall=n.State("NeedsInstall"),n.states.MozAppsNotSupported=n.State("MozAppsNotSupported"),n.states.NetworkError=n.State("NetworkError"),n.states.NotInstalled=n.State("NotInstalled",n.states.NeedsInstall),n.states.NoReceipts=n.State("NoReceipts",n.states.NeedsInstall),n.states.NoValidReceipts=n.State("NoValidReceipts"),n.states.OK=n.State("OK"),n.states.OKCache=n.State("OKCache",n.states.OK),n.states.OKStaleCache=n.State("OKStaleCache",n.states.OKCache),n.states.InternalError=n.State("InternalError"),n.states.MozAppsError=n.State("MozAppsError",n.states.InternalError),n.states.VerifierError=n.State("VerifierError",n.states.InternalError),n.states.ServerError=n.State("ServerError",n.states.NetworkError),n.states.toString=function(){var e=[];for(var t in this)this.hasOwnProperty(t)&&t!="toString"&&t!="detail"&&e.push(t);return e.sort(),"{"+e.join(", ")+"}"},n.errors={},n.errors.ReceiptFormatError=n.State("ReceiptFormatError"),n.errors.ReceiptParseError=n.State("ReceiptParseError",n.errors.ReceiptFormatError),n.errors.InvalidFromStore=n.State("InvalidFromStore"),n.errors.Refunded=n.State("Refunded"),n.errors.RequestTimeout=n.State("RequestTimeout",n.states.ServerError),n.errors.ServerStatusError=n.State("ServerStatusError",n.states.ServerError),n.errors.InvalidServerResponse=n.State("InvalidServerResponse",n.states.ServerError),n.errors.InvalidReceiptIssuer=n.State("InvalidReceiptIssuer"),n.errors.ConnectionError=n.State("ConnectionError",n.states.NetworkError),n.errors.ReceiptExpired=n.State("ReceiptExpired"),n.errors.toString=n.states.toString,n.prototype={_validConstructorArguments:["cacheStorage","cacheTimeout","requestTimeout","refundWindow","installs_allowed_from","onlog","logLevel"],defaultCacheTimeout:864e5,defaultRequestTimeout:3e4,defaultRefundWindow:24e5,toString:function(){var e=this,t="[Verifier state: "+this.state;return this.products.length&&(t+=" products: "+this.products.map(function(e){return e.url}).join(", ")),this.iterReceiptErrors(function(n,r){r==e.state?t+=" Error("+n.substr(0,4)+"..."+n.substr(n.length-4)+"): [error is state]":t+=" Error("+n.substr(0,4)+"..."+n.substr(n.length-4)+"): "+r}),this.app&&(t+=" installed app: "+this.app.manifestURL),t+="]",t},iterReceiptErrors:function(e){for(var t in this.receiptErrors)if(this.receiptErrors.hasOwnProperty(t)){var n=e(t,this.receiptErrors[t]);if(n===!1)break}},verify:function(e){var t=this;this.state=new this.states.VerificationIncomplete(".verify() has not completed");if(!navigator.mozApps){this.state=new this.states.MozAppsNotSupported("navigator.mozApps does not exist"),e(t);return}var n=navigator.mozApps.getSelf();n.onsuccess=function(){try{t.app=this.result||null;if(!this.result){t.state=new t.states.NotInstalled("The app is not installed"),e(t);return}t.log(t.levels.INFO,"Got application: "+this.result.manifestURL),t.verifyReceipts(this.result,e)}catch(n){t.state=new t.states.VerifierError("Exception: "+n,{exception:n}),e(t)}},n.onerror=function(){t.state=new t.errors.MozAppsError("Error calling mozApps.getSelf: "+(this.error&&this.error.name),{mozAppsError:this.error}),t.log(t.levels.ERROR,"Got mozApps Error: "+(this.error&&this.error.name)),e(t)}},verifyReceipts:function(e,t){if(!e.receipts||!e.receipts.length){e.receipts===undefined&&this.log(r.levels.ERROR,"The .receipts property of the app object is undefined (app: "+JSON.stringify(e)+")"),this.state=new this.states.NoReceipts("No receipts were found or installed");return}this.installs_allowed_from===undefined&&(this.installs_allowed_from=e.manifest.installs_allowed_from,this.log(this.levels.INFO,"Using installs_allowed_from value from manifest: "+JSON.stringify(this.installs_allowed_from)));var n=e.receipts.length,r=this;i(e.receipts,function(i){r.log(r.levels.DEBUG,"Checking receipt "+i.substr(0,4));var s=r._checkCache(i,!1);if(s){r.log(r.levels.INFO,"Got receipt ("+i.substr(0,4)+") status from cache: "+JSON.stringify(s)),r._addReceiptError(i,new r.states.OKCache),r._addReceiptVerification(i,s),n--,n||r._finishVerification(t);return}try{r._verifyOneReceipt(e,i,function(){n--,n||r._finishVerification(t)})}catch(o){r.log(r.levels.ERROR,"Got error in _verifyOneReceipt: "+o),r._addReceiptError(i,new r.states.VerifierError("Exception in _verifyOneReceipt: "+o,{exception:o})),n--,n||r._finishVerification(t)}})},_finishVerification:function(e){try{this.log(this.levels.DEBUG,"Finished all receipt verification"),this.state instanceof this.states.VerificationIncomplete&&(this.log(this.levels.DEBUG,"No serious errors during verification"),this.products.length?this.state=new this.states.OK:this.state=new this.states.NoValidReceipts("No receipts passed verification")),e(this)}catch(t){this.log(this.levels.ERROR,"Fatal error in _finishVerification: "+t),this.state=new this.states.VerifierError("Exception: "+t,{exception:t}),e(this)}},_verifyOneReceipt:function(e,t,n){try{var r=this.parseReceipt(t)}catch(i){this._addReceiptError(t,new this.errors.ReceiptParseError("Error decoding JSON: "+i,{exception:i})),n();return}var o=r.iss;if(!o){this._addReceiptError(t,new this.errors.ReceiptFormatError("No (or empty) iss field"),{parsed:r}),n();return}if(this.installs_allowed_from&&s(this.installs_allowed_from,o)==-1&&s(this.installs_allowed_from,"*")==-1){this._addReceiptError(t,new this.errors.InvalidReceiptIssuer("Issuer (iss) of receipt is not a valid installer: "+o,{iss:o,installs_allowed_from:this.installs_allowed_from})),n();return}var u=r.verify;if(!u){this._addReceiptError(t,new this.errors.ReceiptFormatError("No (or empty) verify field"),{parsed:r}),n();return}typeof XMLHttpRequest=="undefined"&&(XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest);var a=new XMLHttpRequest,f=this,l=null;this.log(this.levels.INFO,"POSTing to "+u),a.open("POST",u),a.onreadystatechange=function(){if(a.readyState!=4)return;f.log(f.levels.INFO,"Request to "+u+" completed with status: "+a.status),l&&(clearTimeout(l),l=null);if(a.status===0){f._addReceiptError(t,new f.errors.ConnectionError("Server could not be contacted",{request:a,url:u})),n();return}if(a.status==404){f._addReceiptError(t,new f.errors.ServerStatusError("Server responded with 404 to "+u,{request:a,status:a.status,url:u})),n();return}if(a.status!=200){f._addReceiptError(t,new f.errors.ServerStatusError("Server responded with non-200 status: "+a.status,{request:a,status:a.status,url:u})),n();return}try{var e=JSON.parse(a.responseText)}catch(i){f._addReceiptError(t,new f.errors.InvalidServerResponse("Invalid JSON from server",{request:a,text:a.responseText})),n();return}if(typeof e!="object"||e===null){f._addReceiptError(t,new f.errors.InvalidServerResponse("Server did not respond with a JSON object ("+JSON.stringify(e)+")",{request:a,text:a.responseText})),n();return}f.log(f.levels.INFO,"Receipt ("+t.substr(0,4)+"...) completed with result: "+JSON.stringify(e));if(e.status=="ok"||e.status=="pending"){f._addReceiptVerification(t,e),e.status=="ok"&&f._saveResults(t,r,e),n();return}if(e.status=="refunded"){f._addReceiptError(t,new f.errors.Refunded("Application payment was refunded",{result:e})),n();return}if(e.status=="expired"){f._addReceiptError(t,new f.errors.ReceiptExpired("Receipt expired",{result:e})),f._addReceiptVerification(t,e),n();return}if(e.status=="invalid"){f._addReceiptError(t,new f.errors.InvalidFromStore("The store reports the receipt is invalid",{result:e})),n();return}f._addReceiptError(t,new f.errors.InvalidServerResponse("Store replied with unknown status: "+e.status,{result:e})),n()},a.send(t),this.requestTimeout&&(l=setTimeout(function(){a.abort(),f.log(f.levels.ERROR,"Request to "+u+" timed out"),f._addReceiptError(t,new f.errors.RequestTimeout("The request timed out after "+f.requestTimeout+" milliseconds",{request:a,url:u})),n()},this.requestTimeout))},_addReceiptError:function(e,t){this.receiptErrors[e]=t;if(t instanceof this.states.NetworkError){var n=this._checkCache(e,!0);if(n){this.log("Got stale receipt ("+e.substr(0,4)+") status from cache: "+JSON.stringify(n)),this._addReceiptVerification(e,n),this._addReceiptError(e,new this.states.OKStaleCache("Used a stale cache because of network error: "+t));return}}t instanceof this.states.NetworkError?this.state instanceof this.states.VerificationIncomplete&&(this.state=t):t instanceof this.states.OK&&(this.state instanceof this.states.OK||this.state instanceof this.states.VerificationIncomplete)&&(this.state=t)},_addReceiptVerification:function(e,t){this.receiptVerifications[e]=t,this.products.push(this.parseReceipt(e).product)},_checkCache:function(e,t){if(!this._cacheStorage)return null;var n=this._makeKey(e),r=this._cacheStorage.getItem(n);if(!r)return null;try{r=JSON.parse(r)}catch(i){return this._cacheStorage.removeItem(n),null}var s=r.result;if(!t){if(Date.now()-r.created>this.cacheTimeout)return this.log(this.levels.INFO,"Not using cache value because it is expired"),null;if(s.status=="pending")return null;var o=this.parseReceipt(e);return o.iat&&this.refundWindow&&r.created-o.iat<this.refundWindow&&Date.now()-o.iat>this.refundWindow?null:s}return s},_saveResults:function(e,t,n){if(!this._cacheStorage)return;var r=this._makeKey(e),i={created:Date.now(),result:n};this._cacheStorage.setItem(r,JSON.stringify(i))},clearCache:function(){if(!this._cacheStorage)return;var e=[];for(var t=0;t<this._cacheStorage.length;t++){var n=this._cacheStorage.key(t);n.substr(0,16)=="receiptverifier."&&e.push(n)}for(t=0;t<e.length;t++)this._cacheStorage.removeItem(e[t])},_makeKey:function(e){return"receiptverifier."+e},parseReceipt:function(e){if(e.indexOf(".")==-1)throw"Not valid JWT";var t=e.split("~"),n=t[1].split("."),r=n[1];return r=this.base64urldecode(r),r=JSON.parse(r),r},base64urldecode:function(e){e=e.replace(/-/g,"+"),e=e.replace(/_/g,"/");switch(e.length%4){case 0:break;case 1:e+="===";break;case 2:e+="==";break;case 3:e+="=";break;default:throw"Illegal base64url string!"}return atob(e)},base64urlencode:function(e){return e=btoa(e),e=e.replace(/\+/g,"-"),e=e.replace(/\//g,"_"),e=e.replace(/[\n=]/g,""),e},levels:{DEBUG:10,INFO:20,NOTIFY:30,WARN:40,ERROR:50},logLevel:2,log:function(e,t){if(!this.onlog||e<this.logLevel)return;this.onlog(e,t)}},n.consoleLogger=function(e,t){if(!console)return;e<=this.levels.DEBUG&&console.debug?console.debug(t):e<=this.levels.INFO&&console.info?console.info(t):e<=this.levels.NOTIFY&&console.log?console.log(t):e<=this.levels.WARN&&console.warn?console.warn(t):console.error?console.error(t):console.log(t)},n.prototype.levels.toString=function(){var e=[];for(var t in this)this.hasOwnProperty(t)&&t!="toString"&&e.push(t);var n=this;return e.sort(function(e,t){return n[e]<n[t]?1:-1}),"{"+e.join(", ")+"}"},n.prototype.states=n.states,n.prototype.errors=n.errors,n.prototype.consoleLogger=n.consoleLogger,n.levels=n.prototype.levels,e.receipts.Verifier=n,e.receipts.verify=function(t,r){var i=new n(r);i.verify(t)};var o=function(e,t,n){function r(n){var r,s,o=Array.prototype.forEach;return r=n.nodeType?[n]:t.querySelectorAll(n),r.each=function(e){return o.call(r,function(t){e.call(t)}),r},r.on=function(e,t){return r.each(function(){i(this,e,t)}),r},r.css=function(t){if(typeof t=="object"){for(s in t)r.each(function(){this.style[s]=t[s]});return r}return e.getComputedStyle(r[0]).getPropertyValue(t)},r.attr=function(e){if(typeof e=="object"){for(s in e)r.each(function(){this.setAttribute(s,e[s])});return r}return r[0].getAttribute(e)},r}var i=r.on=function(e,t,n){e.addEventListener(t,function(e){n.call(e.target,e)},!1)};return r}(typeof window!="undefined"?window:global,typeof document!="undefined"?document:undefined);u.prototype={storeURL:null,allowNoInstall:!1,ignoreInternalError:!1,fatalInternalError:!1,supportHTML:null,templates:{fatalInternalError:"We have encountered a error that keeps us from continuing.  Please contact support: <%= supportHTML %>",internalError:"We have encountered an error.  You may close this dialog to continue, but please also contact support: <%= supportHTML %>",storeInstall:'Please visit the <a href="<%= quote(storeURL) %>">store page</a> to install the application.',refunded:'You purchased this app, but then got a refund.  If you still want to use the application, you must <a href="<%= quote(storeURL) %>">purchase the application again</a>.',invalidReceiptIssuer:'You purchased this application from <%= error.iss %> which is not a store we have a relationship with.  Please either <a href="<%= quote(storeURL) %>">re-purchase the application</a> or contact support: <%= supportHTML %>',invalidFromStore:'The store reports that your purchase receipt is invalid.  Please <a href="<%= quote(storeURL) %>">visit the store to reinstall the application</a>.',receiptFormatError:'Your purchase receipt is malformed.  Please <a href="<%= quote(storeURL) %>">visit the store to reinstall the application</a>.',genericError:'An error has occurred.  <a href="<%= quote(storeURL) %>">Reinstalling the application</a> may fix this problem.  If not please contact support: <%= supportHTML %>',mozAppsNotSupported:"This browser or device does not support the Marketplace Apps system."},respond:function(e){this.verifier=e;if(e.state instanceof e.states.VerificationIncomplete)throw window.console&&console.log&&(console.log("Prompter called with verifier",e,"before verification complete"),console.trace&&console.track()),"Prompter called before verification complete";if(e.state instanceof e.states.OK||e.state instanceof e.states.NetworkError)return;if(e.state instanceof e.states.MozAppsNotSupported){this.handleMozAppsNotSupported(e);return}if(e.state instanceof e.states.InternalError){if(this.ignoreInternalError)return;this.handleInternalError(e);return}if(e.state instanceof e.states.NeedsInstall){this.handleInstall(e);return}if(e.state instanceof e.states.NoValidReceipts){var t=null;e.iterReceiptErrors(function(n,r){t===null?t=r:t instanceof e.states.NetworkError&&(t=r)}),this.handleReceiptError(e,t);return}throw window.console&&console.log&&console.log("Unexpected state: "+e.state),"Unexpected state in verifier: "+e.state},handleMozAppsNotSupported:function(e){var t=!this.allowNoInstall;this.display(this.render(this.templates.mozAppsNotSupported),t)},handleInternalError:function(e){this.fatalInternalError?this.display(this.render(this.templates.fatalInternalError),!0):this.display(this.render(this.templates.internalError),!1)},handleInstall:function(e){var t=!this.allowNoInstall;if(this.allowNoInstall&&e.state instanceof e.states.NoReceipts)return;var n=this.templates.storeInstall,r=this.render(n);this.display(r,t)},handleReceiptError:function(e,t){this.error=t;if(t instanceof e.errors.Refunded)var n=this.templates.refunded;else if(t instanceof e.errors.InvalidReceiptIssuer)var n=this.templates.invalidReceiptIssuer;else if(t instanceof e.errors.InvalidFromStore)var n=this.templates.invalidFromStore;else if(t instanceof e.errors.ReceiptFormatError)var n=this.templates.receiptFormatError;else var n=this.templates.genericError;var r=this.render(n);this.display(r,!this.allowNoInstall)},overlayId:"moz-receiptverifier-overlay",generalStyle:"#OVERLAYID-message,#OVERLAYID-message *,#OVERLAYID-message a:hover,#OVERLAYID-message a:visited,#OVERLAYID-message a:active {\n  bottom:auto;clear:none;cursor:default;font-family:Helvetica,Arial,sans-serif;font-size:medium;font-style:normal;font-weight:normal;  height:auto;left:auto;letter-spacing:normal;line-height:1.4;max-height:none;max-width:none;min-height:0;min-width:0;overflow:visible;  right:auto;text-align:left;text-decoration:none;text-indent:0;text-transform:none;top:auto;visibility:visible;white-space:normal;  width:auto;z-index:auto;\n}\n#OVERLAYID-message a {color: #00f;}\n#OVERLAYID-message a:visited {color:#a0f;}\n#OVERLAYID-message a:hover {text-decoration:underline;}\n#OVERLAYID {\n  position:fixed;top:0;left:0;z-index:9999;background:#000;opacity:0.85;width:100%;height:100%;\n}\n#OVERLAYID-message {\n  z-index:1000;position:fixed;top:100px;left:50%;margin-left:-200px;width:400px;padding:0.75em 1em 0.75em 1em;  border:3px solid #ccc;background:#fff;opacity:1.0;color:#000;border-radius:1em;\n}\n#OVERLAYID-close {\n  display:block;position:fixed;top:91px;left:50%;margin-left:227px;z-index:1001;height:0;width:18px;padding:18px 0 0 0;  overflow:hidden;background:#000 none;border:2px solid #fff;border-radius:18px;  box-shadow:0 0 6px #000,1.6px 1.6px 1.6px rgba(0,0,0,0.3),-1.6px 1.6px 1.6px rgba(0,0,0,0.3),1.6px -1.6px 1.6px rgba(0,0,0,0.3),-1.6px -1.6px 1.6px rgba(0,0,0,0.3);  color:#fff;cursor:pointer;user-select:none;\n}\n#OVERLAYID-close-text {\n  display:block;text-align:center;width:18px;top:0px;left:0px;position:absolute;font-size:18px;line-height:18px;\n}\n",createOverlay:function(e){function r(){n.blocking?n.flash():n.removeOverlay()}this.removeOverlay(),this.addStyle(),this.blocking=e,this.overlay=o(document.createElement("div")),this.overlay.attr({id:this.overlayId}),this.message=o(document.createElement("div")),this.message.attr({id:this.overlayId+"-message"}),this.overlay[0].appendChild(this.message[0]);if(!e){this.close=o(document.createElement("div")),this.close.attr({id:this.overlayId+"-close"});var t=o(document.createElement("div"));t.attr({id:this.overlayId+"-close-text"}),t[0].appendChild(document.createTextNode("×")),this.close[0].appendChild(t[0]),this.overlay[0].appendChild(this.close[0])}o("body").css({"z-index":"-1"})[0].appendChild(this.overlay[0]);var n=this;this.overlay.on("click",function(e){var t=e.target;while(t){if(n.message&&t==n.message[0])return;if(n.overlay&&t==n.overlay[0])break;t=t.parentNode}r()}),this.close&&this.close.on("click",function(){r()}),o(document).on("keypress",function(e){e.keyCode==27&&r()})},flash:function(){if(!this.message)return;this.message.css({border:"3px solid #f00"});var e=this;setTimeout(function(){e.message&&e.message.css({border:"3px solid #ccc"})},2e3)},removeOverlay:function(){var e=o("#"+this.overlayId)[0];e&&e.parentNode.removeChild(e),this.overlay=null,this.message=null,this.close=null},addStyle:function(){var e=this.overlayId+"-style",t=o("#"+e);if(t[0])return;var n=document.createElement("style");n.id=e,n.setAttribute("type","text/css");var r=this.generalStyle;r=r.replace(/OVERLAYID/g,this.overlayId),n.appendChild(document.createTextNode(r)),document.head.appendChild(n)},display:function(e,t){this.message||this.createOverlay(t),this.message[0].innerHTML=e},quote:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&gt;").replace(/"/g,"&quot;")},_templateCache:{},render:function(e,t){t=t||this;if(this._templateCache[e])var n=this._templateCache[e];else{var n=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");this._templateCache[e]=n}return n(t)}},e.receipts.Prompter=u})(typeof exports=="undefined"?this.mozmarket?this.mozmarket:this.mozmarket={}:exports)