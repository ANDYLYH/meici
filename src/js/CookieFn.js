function setCookies(name, value, expires, path, domain, secure) {

	var cookieText = name + "=" + value;

	if(expires instanceof Date) {
		cookieText += ";expires=" + expires;
	}
	if(path) {
		cookieText += ";path=" + path;
	}
	if(domain) {
		cookieText += ";domain=" + domain;
	}
	if(secure) {
		cookieText += ";secure=";
	}
	document.cookie = cookieText;
	return document.cookie;
}

function getCookie(name) {
	var cookie =document.cookie;
	var arr = cookie.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split("=");

		if(arr2.length >= 2) {
			if(arr2[0] == name) {
				return arr2[1];
			}
		}
	}
	return "";
}

function removeCookie(name) {
	var d = new Date();
	document.cookie = name + "=;expires=" + d;
	return document.cookie;
}