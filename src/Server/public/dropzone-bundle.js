!function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r){Dropzone.options.myDropzone={paramName:"file",maxFilesize:100,maxFiles:5,dictDefaultMessage:"Drop Files or Click Here to Upload.<br>Maximum Size: <b>50 MB</b>",accept:(e,r)=>{if(e.name.length>=250)return r("File Name too long.");r()},fallback:()=>alert("Your browser does not support dropzone..."),init(){this.on("success",(e,r)=>{null==r.error?alert(`${r.name} Uploaded.\nID: ${r.id}`):alert(`Error: ${r.error}`)}),this.on("maxfilesexceeded",e=>this.removeFile(e))}}}]);