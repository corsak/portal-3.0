function beep(number){
	plus.device.beep( number );
}
function dial(number){
	plus.device.dial( number, false );
}
function setCache(k,v){
	window.localStorage[k] = v;
}
function setFullscreen(v){
	plus.navigator.setFullscreen(v);
}
function closeSplashscreen(){
	plus.navigator.closeSplashscreen();
}
function setStatusBarStyle(){
	plus.navigator.setStatusBarStyle("UIStatusBarStyleDefault");
}
function getCache(k){
	var data=window.localStorage[k];
	return data;
}
function removeCache(k){
	window.localStorage.removeItem(k);
}
function message(s){
	plus.nativeUI.alert(s);
}
function vibrate(ms){
	plus.device.vibrate( milliseconds );;
}
function openMms(phone,body){
	var mms = plus.messaging.createMessage(plus.messaging.TYPE_MMS);
	mms.to = [phone];
	mms.body = body;
	plus.messaging.sendMessage( mms );
}
function openSms(phone,body){
	var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
	//msg.silent = true; 
	msg.to = [phone];
	msg.body = body;
	plus.messaging.sendMessage(msg,openSmsCallback);
}

function openSmsCallback(){
	//mui.alert("sent!");
}

function openEmail(to,body){
	var msg = plus.messaging.createMessage(plus.messaging.TYPE_MAIL);
	msg.to = to;
	msg.body = body;
	//msg.addAttachment("_www/a.doc");
	plus.messaging.sendMessage( msg );
}