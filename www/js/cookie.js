// Criar
function setCookie(name, value, exMins = 1){    //função universal para criar cookie
	var expires;
	var date; 
	
	date = new Date(); //  criando o COOKIE com a data atual
	date.setTime(date.getTime()+(exMins*60*1000));
	expires = date.toUTCString();
	
	document.cookie = name+"="+value+"; expires="+expires+"; path=/";
}

// Obter
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2){
		ret = parts.pop().split(";").shift();
	}
	if(ret === undefined){
		return false;
	}
	return ret;
}

function setExpire(name, exMins = 1){
	value = getCookie(name);
	setCookie(name, value, exMins);
}