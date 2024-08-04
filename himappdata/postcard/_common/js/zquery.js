
var __zquery_document_loaded = false;
var __zquery_document_loaded_callbacks = [];


function ZQueryDOMCollection(selector){
    this._selector = selector;
    this.getDoms = function(){
        return document.querySelectorAll(this._selector);
    }

    this.text = function (t) {
        if(t){
            this.getDoms().forEach(d => d.innerText = t);
        }
        else{
            return this.getDoms()[0].innerText;
        }
    }

    this.val = function(v){
        if(v){
            this.getDoms().forEach(d => d.value = v);
        }
        else{
            return this.getDoms()[0].value;
        }
    }

    this.click = function(callback){
        this.getDoms().forEach(d => d.addEventListener("click",callback));
    }

    this.show = function(){
        this.getDoms().forEach(d => d.style.visibility="visible");
    }
    
    this.hide = function(){
        this.getDoms().forEach(d => d.style.visibility="hidden");
    }

    this.css = function(key,value){
        this.getDoms().forEach(d => d.style[key]=value);
    }
    this.img = function (src) {
        this.getDoms().forEach(d => d.src = src);
    }

    this.fitParent = function(){
        this.getDoms().forEach(d => {
            var parent = d.parentElement;
            var thisWidth = d.clientWidth;
            var thisHeight = d.clientHeight;
            var parentWidth = parent.clientWidth;
            var parentHeight = parent.clientHeight;

            var thisRatio = thisHeight / thisWidth;
            var parentRatio = parentHeight / parentWidth;

            var scaleFactor = 1.0;
            if(parentRatio > thisRatio){
                scaleFactor = parentWidth / thisWidth;

            }
            else{
                scaleFactor = parentHeight / thisHeight;
            }
            d.style.transform = "scale("+scaleFactor*0.995+")"

        });
    }
}

var $ = function(o){
    var type = typeof(o);
    if(type == "function"){
        if(__zquery_document_loaded){
            o();
        }
        else{
            __zquery_document_loaded_callbacks.push(o);
        }
    }
    if(type == "string"){
        return new ZQueryDOMCollection(o);
    }


}

window.addEventListener("load", function(){
    __zquery_document_loaded_callbacks.forEach(f => f());
    __zquery_document_loaded = true;
});


function objectToUrlParam(param){
    var searchstr="";
    var keys = Object.keys(param);
    for (var i = 0;i<keys.length;i++){
        searchstr = searchstr+keys[i];
        searchstr = searchstr+"=";
        searchstr = searchstr +encodeURI(param[keys[i]]);
        if(i<keys.length-1){
            searchstr = searchstr+"&";
        }
    }
    return searchstr;
}

Object.defineProperty($, "query", {
  get: function () {
    const queryParams = {};
	const queryString = window.location.search.substr(1);
  
	// 如果没有查询参数，返回空对象
	if (!queryString) {
		return queryParams;
	}

	const paramPairs = queryString.split('&');
  
	paramPairs.forEach(pair => {
		const pairArr = pair.split('=');
		const key = pairArr[0];
		const value = pairArr[1] ? decodeURIComponent(pairArr[1]) : true;
		queryParams[key] = value;
	});
  
	return queryParams;
  },
});


$.post = function(url,param){
    var callback = new Promise(function(resolve,reject){

        var loginreq = new XMLHttpRequest();

        loginreq.onreadystatechange=function()
        {
            if (loginreq.readyState==4)
            {
                if(loginreq.status=200){
                    try{
                        var result = loginreq.responseText;
                        resolve(result);
                    }catch(e){
                        reject(e);
                    }
                }
                else{
                    reject(loginreq.status);
                }
            }
        }
    
        loginreq.open("POST",url,true);
        loginreq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        loginreq.withCredentials=true;
        try{
            loginreq.send(objectToUrlParam(param));
        }catch(err){
            reject(err);
        }
    });
    return callback;
}

$.postJson = function(url,param){
    var callback = new Promise(function(resolve,reject){

        var loginreq = new XMLHttpRequest();

        loginreq.onreadystatechange=function()
        {
            if (loginreq.readyState==4)
            {
                if(loginreq.status=200){
                    try{
                        var result = loginreq.responseText;
                        resolve(result);
                    }catch(e){
                        reject(e);
                    }
                }
                else{
                    reject(loginreq.status);
                }
            }
        }
    
        loginreq.open("POST",url,true);
        loginreq.setRequestHeader("Content-type","application/json");
        loginreq.setRequestHeader("Access-Control-Allow-Origin", "*");
        loginreq.withCredentials=true;
        try{
            loginreq.send(JSON.stringify(param));
        }catch(err){
            reject(err);
        }
    });
    return callback;
}


$.ajax = function(url,param){
    var callback = new Promise(function(resolve,reject){

        var loginreq = new XMLHttpRequest();

        loginreq.onreadystatechange=function()
        {
            if (loginreq.readyState==4)
            {
                if(loginreq.status=200){
                    try{
                        var result = loginreq.responseText;
                        resolve(result);
                    }catch(e){
                        reject(e);
                    }
                }
                else{
                    reject(loginreq.status);
                }
            }
        }
        var _url = url;
        if(param){
            _url = _url + "?"+objectToUrlParam(param);
        }
        loginreq.open("GET",_url,true);
        loginreq.withCredentials=true;
        try{
            loginreq.send();
        }catch(err){
            reject(err);
        }
    });
    return callback;
}


$.cloneObject = function(obj){
    return JSON.parse(JSON.stringify(obj));
}

$.formatDate = function(date){
    if(typeof(date) == "string"){
        date = new Date(date);
    }
    var datestr = "";

    datestr+=date.getFullYear();
    datestr+="-";
    if(date.getMonth() < 9){
        datestr += "0";
    }
    datestr+=""+(date.getMonth()+1);
    datestr+="-";
    if(date.getDate() < 10){
        datestr += "0";
    }
    datestr+=""+(date.getDate());
    
    datestr+=" ";

    if(date.getHours() < 10){
        datestr += "0";
    }
    datestr+=""+(date.getHours());
    datestr+=":";

    if(date.getMinutes() < 10){
        datestr += "0";
    }
    datestr+=""+(date.getMinutes());

    return datestr;
}
