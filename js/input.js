define(["require"],function(t){function r(t,r){var i=t.keyCode,s;switch(i){case 32:s="SPACE";break;default:s=String.fromCharCode(e.keyCode)}n[s]=r}var n={};return document.addEventListener("keydown",function(e){r(e,!0)}),document.addEventListener("keyup",function(e){r(e,!1)}),window.addEventListener("blur",function(){n={}}),{isDown:function(e){return n[e]}}})