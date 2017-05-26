/**
 * Created by mat on 16-12-14.
 */

var plugin={};

plugin.ab2str=function(data) {
  if (!data) return null;
  if (data.constructor.name == "ArrayBuffer") {
    data = new Uint8Array(data)
  }
  return decode_utf8(String.fromCharCode.apply(null, data))
}

plugin.str2ab=function(str,ab, n){
  str = encode_utf8(str);
  var len = str.length;
  if (n) len++;
  if (!ab) {
    ab = new ArrayBuffer(len)
  }
  var i = new Uint8Array(ab);
  if (n) i[str.length] = 0;
  for (var r = 0,
         s = str.length; r < s; r++) {
    i[r] = str.charCodeAt(r)
  }
  return ab
}


plugin.bufferToHex=function(ab) {
  var arr = new Uint8Array(ab);
  var hex = "";
  for (var index in arr) {
    index = arr[index];
    if (index < 16) hex += "0" + index.toString(16);
    else hex += index.toString(16)
  }
  return hex
}
plugin.hexToBuffer=function (hex) {
  var ab = new ArrayBuffer(hex.length / 2);
  var arr = new Uint8Array(ab);
  for (var i = 0; i < hex.length / 2; i++) {
    var sub = hex.substr(i * 2, 2);
    arr[i] = parseInt(sub, 16)
  }
  return ab
}
plugin.base64ToAb=function (b64) {
  var t = window.atob(b64);
  var len = t.length;
  var arr = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    var r = t.charCodeAt(i);
    arr[i] = r
  }
  return arr.buffer
}
function abToBase64(ab) {
  var str = "";
  var arr = new Uint8Array(ab);
  var len = arr.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(arr[i])
  }
  return window.btoa(str)
}

function decode_utf8(ab) {
  return decodeURIComponent(escape(ab))
}

module.exports=plugin;
