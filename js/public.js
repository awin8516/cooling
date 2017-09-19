var browser = {
	versions : function(){
		var u = navigator.userAgent.toLowerCase(), app = navigator.appVersion;
		return {//移动终端浏览器版本信息                                 
			trident : u.indexOf('trident') > -1, //IE内核                                 
			presto : u.indexOf('presto') > -1, //opera内核                                 
			webKit : u.indexOf('applewebkit') > -1, //苹果、谷歌内核                                 
			gecko : u.indexOf('gecko') > -1 && u.indexOf('khtml') == -1, //火狐内核                                
			mobile : !!u.match(/AppleWebKit.*Mobile.*/)
					|| !!u.match(/AppleWebKit/), //是否为移动终端                                 
			ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                 
			android : u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或者uc浏览器                                 
			iPhone : u.indexOf('iphone') > -1 || u.indexOf('mac') > -1, //是否为iPhone或者QQHD浏览器                    
			iPad: u.indexOf('ipad') > -1, //是否iPad       
			webApp : u.indexOf('safari') == -1,//是否web应该程序，没有头部与底部
			google:u.indexOf('chrome')>-1,
			wechat:u.match(/MicroMessenger/i) == 'micromessenger'
		};
	}(),
	language : (navigator.browserLanguage || navigator.language).toLowerCase()
};
window.onload = function(){
	if(browser.versions.android){
		document.getElementsByTagName('body')[0].className += ' android';	
	}else if(browser.versions.iPhone){
		document.getElementsByTagName('body')[0].className += ' iphone';	
	}else if(browser.versions.iPad){
		document.getElementsByTagName('body')[0].className += ' ipad';	
	};
	if(browser.versions.wechat){
		document.getElementsByTagName('body')[0].className += ' wechat';	
	};
};

function loading(o){
	if(o == false ){
		hide();
		return;
	};
	o = $.extend({	
		target:'body',
		size:4,
		class:'',
		color:'#633D21',
		title:'加载中...',
		layout:'bottom'
	}, o || {});
	o.target = $(o.target);
	this.show = function(){
		o.target.css('overflow','hidden');
		o.target.addClass('loading-box');
		var layout = o.layout == 'right' ? 'inline-block' : 'block';
		var size   = o.layout == 'right' ? o.size*.4 : o.size;
		var loading = $('<div id="loading" class="loading '+o.class+'">'+
							'<div class="loading-center">'+
								'<div class="loading-anim" style="width:'+size+'em;height:'+size+'em;">'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
									'<i style="background-color:'+o.color+';"></i>'+
								'</div>'+
								'<div class="loading-title" style="display:'+layout+';font-size:'+(o.size*.3)+'em;color:'+o.color+'">'+o.title+'</div>'+
							'</div>'+
						'</div>').appendTo(o.target);
	};
	this.hide = function(){
		o.target.removeClass('loading-box');
		$(".loading", o.target).remove();
		o.target.css('overflow','visible');
	};
	this.show();
}

//载入图片函数
function readyImage(src, progress, callback){
	var counter  = 0, len = src.length;
	function check(s){
		counter++;
		var pro = 100/len*counter >100 ? 100 :100/len*counter;
		progress && progress.call(this, pro);
		if(counter >= len){callback && callback.call(this, counter);};
	};
	if($.type(src) === "string" && src!='') img.src=src;
	else if($.type(src) === "array" && len>0){
		for(var i=0; i<src.length; i++){
			var img = new Image(); //创建一个Image对象，实现图片的预下载
			img.src=src[i];
			(function(k){
				if (img.complete) {
					check(src[k]);
				} else {
					img.onload = function () {
						check(src[k]);
					};
				};
			})(i);
		}//end for
	}//end else
};

function imgAnim(o, imgs, time){//img逐帧动画
	time = time || 100;
	var n=0;
	timer.imganim = setInterval(function(){
		$(o)[0].src = imgs[n];
		n++;
		n = n > imgs.length-1 ? 0 : n;
	}, time);
}

var RedirectTimer;
function Dialog(o,act,showcall,hidecall){
	clearTimeout(RedirectTimer);
	function hide(){
		$(o).hide();
		$("#DialogMask").removeClass('dialog-mask-show '+o.replace('#','dialog-mask-'));
		$("html").removeClass("noscroll");
		hidecall && hidecall.call(this);
	}
	function show(){
		$('.dialog:visible').hide();
		$(o).show();
		$("#DialogMask").removeClass().addClass('dialog-mask dialog-mask-show '+o.replace('#','dialog-mask-'));
		$("html").addClass("noscroll");
		if($('.dialog-close-x', $(o)).length <=0){$(o).append('<a class="dialog-close dialog-close-x"></a>')};
		$('.dialog-close', $(o)).on(clickEvent, function(e){e.preventDefault();hide();});
		if(typeof($(o).attr("data-time"))!= "undefined" ){
			RedirectTimer = window.setTimeout(function(){Redirect($(o).attr("data-next"))}, parseInt($(o).attr("data-time")));
		}
		showcall && showcall.call(this);
	}
	act=='hide' ? hide() : show();
}

function Alert(title,callback){
	var _alert = $('<div id="popup-alert" class="popup-alert"><div>'+title+'<p><a class="popup-close popup-close-x">确定</a></p></div></div>').appendTo('body');
	$('.popup-close', _alert).on(clickEvent, function(e){
		e.preventDefault();
		_alert.remove();
		callback && callback.call(this);
	});
	return false;
}

function Redirect(selecter,callback){
	if($(selecter).length > 0) {
		$('.dialog:visible').hide();
		$('#DialogMask:visible').attr('class', 'dialog-mask');
		clearTimeout(RedirectTimer);
		var $prevPage = $('#Container>.page-active');
		$prevPage.addClass('page-closing').removeClass('page-active');
		setTimeout(function(){$prevPage.removeClass('page-closing');}, 3000);
		if($(selecter).data("init")=="true"){
			$(selecter).children().hide().filter(".page-init").show();
		}	
		$(selecter).addClass('page-active');
		var time = $(selecter).data("time");
		var _callback = $(selecter).data("callback");
		if(typeof(time)!= "undefined" ){
			RedirectTimer = window.setTimeout(function(){Redirect($(selecter).data("next"))}, parseInt(time));
		};
		callback && callback.call(this);
		if(typeof(_callback)!= "undefined" ){
			eval(_callback+'()');
		};
		//PageAuto();
		/*trackFunc(null, {category:'PV', action:'页面监测', label:$(selecter).data('page')});*/
	}
}

function bindUrl(event){
	$("[data-url]").on(clickEvent, function(event){
		event.preventDefault();
		var e = event.target || event.srcElement;
		var selecter = $(e).closest("[data-url]").attr('data-url');
		Redirect(selecter);
	});
}

function PageAuto(){
	if($("#PageResult").length <= 0 && $(window).height() < $(window).width()){				
		$("body").append('<div id="VerticalTips" class="vertical-tips"></div>');
	}else{
		$("#VerticalTips").remove();
	}
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}//end func

function Trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g,"");
}//end func

function GetRand(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
};

function Rand(){
	return(new Date().getTime());   
}

function GetRandArr(Min, Max, Len){
	var arr = [],rand ,n=0;
	for(var i=0;i<100;i++){
		var _rand = GetRand(Min,Max);
		if(_rand != rand && _rand != arr[0] && _rand != arr[1] && _rand != arr[2] && _rand != arr[3]){
			rand = _rand;
			arr.push(rand);
			n++;
		}
		if(n==Len) break;
	}
	return arr;//[0, 3, 5]
}

function randArray(data){//打乱数组顺序
	var arrlen = data.length;
	var try1 = new Array();
	for(var i = 0;i < arrlen; i++){try1[i] = i;}
	var try2 = new Array();
	for(var i = 0;i < arrlen; i++){
		try2[i] = try1.splice(Math.floor(Math.random() * try1.length),1);
	}
	var try3 = new Array();
	for(var i = 0; i < arrlen; i++){
		try3[i] = data[try2[i]];
	}
	return try3;
};

$("head").append('<style>.winW{width:'+$(window).width()+'px;}.winH{height:'+$(window).height()+'px;}</style>');


/**/
function ShareDebug(){
	$('#share-debug').remove();
	var debug  =  $('<div id="share-debug" class="share-debug">'+
						'<p>link:'+wxContent.link+'</p>'+
						'<p>image:'+wxContent.image+'</p>'+
						'<p>timeline:'+wxContent.timeline+'</p>'+
						'<p>message:'+wxContent.message+'</p>'+
						'<p>description:'+wxContent.description+'</p>'+
					'</div>').appendTo('body');
};
//setInterval(ShareDebug, 200);
