var clickEvent = 'touchend mouseup', percent = 0;
var wxContent = {
	timeline:'清凉妙用，向奇招致敬，不服来点！',
	title:'清凉妙用，向奇招致敬，不服来点！', 
	desc:'清凉妙用，向奇招致敬，不服来点！',
	link:'http://wechat.jointerchina.com/cooling/index.php',
	imgUrl:'http://wechat.jointerchina.com/cooling/images/share.jpg'
};
var flagHome = flagRule = flagQuiz = 0;
	
var win = {width : $(window).width(), height:$(window).height()};
var timer = {};
var score = 0;
var answer = ['B','A','C','C','C','C','B'];
var LifeCount = 3;

var o = {
	ribbonHome  : $('#ribbonHome'),
	ribbonRule  : $('#ribbonRule'),
	ribbonQuiz  : $('#ribbonQuiz'),
	ribbonResult: $('#ribbonResult'),
	ribbonGift  : $('#ribbonGift'),
	peopleGif   : $('#peopleGif'),
	pageQuiz    : $('#PageQuiz'),
	brand       : $('#brandGroup>b>i'),
	brandInfo   : $('#brandGroup>b>s'),
	life        : $('#lifeGroup'),
	tipsOver    : $('#tipsOver'),
	pageResult  : $('#PageResult'),
	btnGift     : $('#btnGift'),
	resultScore : $('#resultScore')
};

var fn = {
	shareTips : function(){
		$('body').addClass('ovh');
		var shareTips = $('<div style="position:fixed;z-index:1000;top:0;width:100%;height:100%;text-align:right;background:rgba(0,0,0,.6);" id="shareTips"><img width="35%" style="margin-right:.8em" src="images/share-tips.png"></div>').appendTo('body');
		$('#shareTips').bind('click', function(e){
            e.preventDefault();
			shareTips.remove();
			$('body').removeClass('ovh');
		});
	},
	gifRefresh : function(img, src){
		img.attr('src', 'images/'+src+'.gif');
		setTimeout(function(){
			img.show();
		}, 60);
	},
	initHome : function(){
        fn.gifRefresh(o.ribbonHome, 'piaodai');
        o.ribbonHome.hide();
        setTimeout(function(){
            fn.gifRefresh(o.ribbonHome, 'piaodai');
        }, 10);

		wxContent.image    = 'http://wechat.jointerchina.com/cooling/images/share.jpg';
		wxContent.timeline = '清凉妙用，向奇招致敬，不服来点！';
		wxContent.title    = '清凉妙用，向奇招致敬，不服来点！';
		wxContent.desc     = '清凉妙用，向奇招致敬，不服来点！';
		wxShare(wxContent);

        flagHome += 1;
        if(flagHome == 2) flagHome = 0;
        if(flagHome == 1){
            o.ribbonHome.hide();
            setTimeout(function(){
                Redirect('#PageHome');
            },10);
        }
	},
	initRule : function(){
        fn.gifRefresh(o.ribbonRule, 'piaodai');
        o.ribbonRule.hide();
        setTimeout(function(){
            o.ribbonRule.show();
            fn.gifRefresh(o.ribbonRule, 'piaodai');
        }, 1);

        flagRule += 1;
        if(flagRule == 2) flagRule = 0;
        if(flagRule == 1){
            o.ribbonRule.hide();
            setTimeout(function() {
                Redirect('#PageRule');
            },1);
        }
	},
	initQuiz : function(){
        fn.gifRefresh(o.ribbonQuiz, 'piaodai');
        o.ribbonQuiz.hide();
        setTimeout(function(){
            o.ribbonQuiz.show();
            fn.gifRefresh(o.ribbonQuiz, 'piaodai');
        }, 1);
		fn.gifRefresh(o.peopleGif, 'photo-1');
		LifeCount = 3;
		score = 0;
		o.pageQuiz.attr('class','page page-quiz page-quiz-1 page-active');
		o.pageQuiz.data('quiz', '1');
		o.life.attr('class','life-group life-'+LifeCount);
		o.brand.parent().removeClass('brand-animation-true brand-animation-false');
		o.pageResult.attr('class','page page-result');

        flagQuiz += 1;
        if(flagQuiz == 2) flagQuiz = 0;
        if(flagQuiz == 1){
            o.ribbonQuiz.hide();
            setTimeout(function(){
                Redirect('#PageQuiz');
            });
        }
	},
	initResult : function(){
        wx.showOptionMenu();
		fn.gifRefresh(o.ribbonResult, 'piaodai');
		if(score <= 4){//game over
			console.log('failure');
			o.pageResult.attr('class','page page-result page-result-failure page-active');
			wxContent.image    = 'http://wechat.jointerchina.com/cooling/images/result-'+score+'.png';
			wxContent.timeline = '清凉妙用，向奇招致敬，不服来点！';
			wxContent.title    = '清凉妙用，向奇招致敬，不服来点！';
			wxContent.desc     = '清凉妙用，向奇招致敬，不服来点！';
			wxShare(wxContent);
		}else{//5-7分
			console.log('success');
			o.pageResult.attr('class','page page-result page-result-success page-active');
			o.resultScore.attr('class','result-score result-score-'+score);
			wxContent.image    = 'http://wechat.jointerchina.com/cooling/images/result-'+score+'.png';
			wxContent.timeline = '清凉妙用，向奇招致敬，不服来点！';
			wxContent.title    = '清凉妙用，向奇招致敬，不服来点！';
			wxContent.desc     = '清凉妙用，向奇招致敬，不服来点！';
			wxShare(wxContent);
		}
	},
	initGift : function(){
		fn.gifRefresh(o.ribbonGift, 'piaodai');
        setTimeout(function() {
            $('#jianyi').removeClass('anim-fly-right').removeClass('duration-5').removeClass('delay-10');
            $('#tmall').removeClass('anim-fly-left').removeClass('duration-5').removeClass('delay-10');
        }, 1000);
	},
	check : function(i,selected){
		console.log(i);
		console.log(selected);
		return (selected == answer[i-1]);
	},
	nextQuiz : function(current){
		if(current >=7){Redirect('#PageResult');return;};
		o.pageQuiz.addClass('page-quiz-transition');
		o.pageQuiz.removeClass('page-quiz-'+current);
		setTimeout(function(){
			fn.gifRefresh(o.ribbonQuiz, 'piaodai');
			fn.gifRefresh(o.peopleGif, 'photo-'+(current+1));
			o.pageQuiz.addClass('page-quiz-'+(current+1));
			o.pageQuiz.removeClass('page-quiz-transition');
			o.peopleGif.removeAttr('style');
		}, 600);
		o.pageQuiz.data('quiz', current+1);
		o.life.removeClass('life-anim');
		o.brand.parent().removeClass('brand-animation-true brand-animation-false');
	}
};

o.brand.on(clickEvent, function(e){
	e.preventDefault();
	var self = $(this);
	var current = parseInt(o.pageQuiz.data('quiz'));
	var checked = fn.check(current, self.parent().attr('title').toUpperCase());
	console.log(checked);
	$(this).parent().addClass('brand-animation-'+checked);
	if(checked){//选对，切到下一题
		score++;
		setTimeout(function(){
			fn.nextQuiz(current);
		}, 7000);
	}else{//选错，扣一个生命值
		LifeCount--;
		setTimeout(function(){
			o.life.attr('class','life-group life-'+LifeCount);
			o.life.addClass('life-anim');
		}, 2500);
		setTimeout(function(){
			if(LifeCount == 0){
				Redirect('#PageResult');
			}else{
				fn.nextQuiz(current);
			};
		}, 7000);
	};
});

o.btnGift.bind('click', function(e){
	e.preventDefault();
	fn.shareTips();
});

function preloadImage(callback){
	readyImage([
		'images/bg.png',
		'images/question-bg.png',
		'images/btn-rule.jpg',
		'images/btn-start.jpg',
		'images/home.jpg',
		'images/home-title.png',
		'images/home-tiger.png',
		'images/couplet-left.png',
		'images/couplet-right.png',
		'images/piaodai.gif',
		'images/title-bg.png',
		'images/title-1.png',
		'images/title-2.png',
		'images/title-3.png',
		'images/title-4.png'
	],null, callback);
}
if(browser.versions.wechat){
	wx.ready(function(){
		preloadImage(function(){
			Redirect('#PageHome');
		});
	});
}else{
	preloadImage(function(){
		Redirect('#PageHome');
	});
}
if(win.height/win.width < 1.578 ){
	$('#Container').height(win.width*1.578);
};

$(document).ready(function(e){
	bindUrl();
	//Redirect('#PageLoading');
	//Redirect('#PageHome');
	//Redirect('#PageQuiz');
	//Redirect('#PageResult');


    $('#jianyi').bind('click', function () {
        linkTo('健一', 'http://m.j1.com/qingliangyou.html');
    });

    $('#tmall').bind('click', function () {
        linkTo('天猫', 'tmall.php');
    });
	
	$(window).on('orientationchange',window_orientationchange);//横屏提示
	function window_orientationchange(e){//横屏提示
		if(window.orientation==90) $('#turnTips').show();
		else $('#turnTips').hide();
	}//end func
});


function linkTo(platform, url){
    $.post('ajax.php?act=b2b',{platform:platform}, function(res){
        window.location.href = url;
    });
}