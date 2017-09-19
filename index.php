<?php
set_time_limit(0);
error_reporting(0);
session_start();

require "config.inc.php";

if(!$_SESSION['openid']){
        $callback = urlencode(CALLBACK);
        $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.APPID.'&redirect_uri='.$callback.'&response_type=code&scope=snsapi_base&state=cooling#wechat_redirect';
        header('Location:'.$url);
        exit();
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="
        width = device-width,
        initial-scale = 1 ,
        minimum-scale = 1 ,
        maximum-scale = 1 ,
        user-scalable = no,
        target-densitydpi=500"
/>
<title>龙虎清凉油</title>
<link href="css/style.css?v=0912" rel="stylesheet" type="text/css"/>
<link href="css/keyframes.css?v=0912" rel="stylesheet" type="text/css"/>
<script src="js/jquery-1.9.0.js" type="text/javascript"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>
<script src="js/wx_new_share.js" type="text/javascript"></script>
<script src="js/public.js" type="text/javascript"></script>
</head>

<body>
<div id="Container" class="container">
	<!--<img id="ShareImg" class="shareimg" src="images/share-img.jpg">-->
	<div id="PageLoading" class="page page-loading page-active" data-page="加载页">
        <img src="images/loading.png">
    </div><!--加载页-->
    
    <div id="PageHome" class="page page-home" data-page="首页" data-callback="fn.initHome">
        <div class="page-mask">
            <div class="page-scale">
                <div class="page-content">
                    <div class="page-title page-title-home">
                    	<img id="ribbonHome" class="img-gif" src="">
                        <b class="page-title-word page-title-word-1 anim-stamp duration-5 delay-20 forwards" title="龙"></b>
                        <b class="page-title-word page-title-word-2 anim-stamp duration-5 delay-22 forwards" title="虎"></b>
                        <b class="page-title-word page-title-word-3 anim-stamp duration-5 delay-24 forwards" title="精"></b>
                        <b class="page-title-word page-title-word-4 anim-stamp duration-5 delay-26 forwards" title="神"></b>
                    </div>
                    <div class="page-home-content">
                        <b class="page-home-title anim-fade-in duration-5 delay-5 forwards" title="清凉妙用"></b>
                        <b class="page-home-couplet-left anim-fly-right duration-5 delay-10 forwards" title="長期交往居家旅行必備"></b>
                        <b class="page-home-couplet-right anim-fly-left duration-5 delay-15 forwards" title="交友約會搭訕聚會靈藥"></b>
                        <b class="page-home-tiger anim-fade-in duration-5 delay-20 forwards" title="两只老虎图"></b>
                    </div>
                    <div class="btns btns-home anim-fly-down-in duration-3 delay-20 forwards">
                        <a href="javascript:;" class="btn btn-start" data-url="#PageQuiz">开始游戏</a>
                        <i></i>
                        <a href="javascript:;" class="btn btn-rule" data-url="#PageRule">游戏规则</a>
                    </div>
                </div>
            </div>
        </div>
    </div><!--首页-->
    
    <div id="PageRule" class="page page-rule" data-page="游戏规则" data-callback="fn.initRule">
        <div class="page-mask">
            <div class="page-scale">
                <div class="page-content">
                    <div class="page-title page-title-rule">
                    	<img id="ribbonRule" class="img-gif" src="">
                        <b class="page-title-word page-title-word-1 anim-stamp duration-5 delay-20 forwards" title="龙"></b>
                        <b class="page-title-word page-title-word-2 anim-stamp duration-5 delay-22 forwards" title="虎"></b>
                        <b class="page-title-word page-title-word-3 anim-stamp duration-5 delay-24 forwards" title="精"></b>
                        <b class="page-title-word page-title-word-4 anim-stamp duration-5 delay-26 forwards" title="神"></b>
                    </div>
                    <div class="btns btns-rule anim-fly-down-in duration-3 delay-10 forwards">
                        <a href="javascript:;" class="btn btn-home" data-url="#PageHome">返回首页</a>
                        <i></i>
                        <a href="javascript:;" class="btn btn-start" data-url="#PageQuiz">开始游戏</a>
                    </div>
                </div>
            </div>
        </div>
    </div><!--游戏规则-->
    
    <div id="PageQuiz" class="page page-quiz" data-quiz="" data-page="测试" data-callback="fn.initQuiz">
    	<img id="peopleGif" class="people-gif" src="">
        <div class="page-mask">
            <div class="page-scale">
                <div class="page-content">
                    <div class="page-title page-title-home">
                    	<img id="ribbonQuiz" class="img-gif" src="">
                        <b class="page-title-word page-title-word-1 duration-5 delay-20 forwards" title="龙"></b>
                        <b class="page-title-word page-title-word-2 duration-5 delay-22 forwards" title="虎"></b>
                        <b class="page-title-word page-title-word-3 duration-5 delay-24 forwards" title="精"></b>
                        <b class="page-title-word page-title-word-4 duration-5 delay-26 forwards" title="神"></b>
                    </div>
                    <div class="page-quiz-content">
                        <div id="brandGroup" class="brand-group">
                            <b class="page-quiz-brand page-quiz-brand-a" title="a"><i></i><s></s><u></u></b>
                            <b class="page-quiz-brand page-quiz-brand-b" title="b"><i></i><s></s><u></u></b>
                            <b class="page-quiz-brand page-quiz-brand-c" title="c"><i></i><s></s><u></u></b>
                        </div>
                        <!--<div id="tipsOver" class="tips-over"></div>-->
                        <div id="lifeGroup" class="life-group">
                            <i><b></b></i>
                            <i><b></b></i>
                            <i><b></b></i>
                            <u>-1</u>
                        </div>
                    </div>
                    <div class="page-quiz-question" title="测试-问题描述"></div>
                </div>
            </div>
        </div>
    </div><!--测试-->
    
    <div id="PageResult" class="page page-result" data-page="游戏结果" data-callback="fn.initResult">
        <div class="page-mask">
            <div class="page-scale">
                <div class="page-content">
                    <div class="page-title page-title-rule">
                    	<img id="ribbonResult" class="img-gif" src="">
                        <b class="page-title-word page-title-word-1 anim-stamp duration-5 delay-20 forwards" title="龙"></b>
                        <b class="page-title-word page-title-word-2 anim-stamp duration-5 delay-22 forwards" title="虎"></b>
                        <b class="page-title-word page-title-word-3 anim-stamp duration-5 delay-24 forwards" title="精"></b>
                        <b class="page-title-word page-title-word-4 anim-stamp duration-5 delay-26 forwards" title="神"></b>
                    </div>
                    <div class="page-result-content">
                        <div id="resultScore" class="result-score result-score-0"></div>
                    </div>
                    <div class="btns btns-result anim-fly-down-in duration-3 delay-5 forwards">
                        <a href="javascript:;" class="btn btn-retry" data-url="#PageHome">重新来过</a>
                        <a href="javascript:;" class="btn btn-gift" id="btnGift">领取奖品</a>
                    </div>
                </div>
            </div>
        </div>
    </div><!--结果-->
    
    <div id="PageGift" class="page page-gift" data-page="奖品" data-callback="fn.initGift">
        <div class="page-mask">
            <div class="page-scale">
                <div class="page-content">
                    <div class="page-title page-title-gift">
                    	<img id="ribbonGift" class="img-gif" src="">
                        <b class="page-title-word page-title-word-1 anim-stamp duration-5 delay-20 forwards" title="龙"></b>
                        <b class="page-title-word page-title-word-2 anim-stamp duration-5 delay-22 forwards" title="虎"></b>
                        <b class="page-title-word page-title-word-3 anim-stamp duration-5 delay-24 forwards" title="精"></b>
                        <b class="page-title-word page-title-word-4 anim-stamp duration-5 delay-26 forwards" title="神"></b>
                    </div>
                    <div class="page-home-content">
                        <b class="page-gift-title anim-fade-in duration-5 delay-5 forwards" title="标题"></b>
                        <b class="page-gift-pro anim-fly-right duration-5 delay-10 forwards" title="清凉油图片"></b>
                        <b class="page-gift-ticket anim-fly-left duration-5 delay-15 forwards" title="券图片"></b>
                        <b class="page-gift-subtitle anim-fade-in duration-5 delay-20 forwards" title="说明文字"></b>
                        <a href="javascript:;" id="jianyi" class="btn btn-pro anim-fly-right duration-5 delay-10 forwards">健一网</a>
                        <a href="javascript:;" id="tmall" class="btn btn-ticket anim-fly-left duration-5 delay-15 forwards">天猫店</a>
                    </div>
                    <div class="btns btns-home anim-fly-down-in duration-3 delay-20 forwards">
                        <a href="javascript:;" class="btn btn-gift-tips1">清凉妙用</a>
                        <i></i>
                        <a href="javascript:;" class="btn btn-gift-tips2">盛情回馈</a>
                    </div>
                </div>
            </div>
        </div>
    </div><!--奖品-->
    
    <div id="turnTips" class="turn-tips"></div>
    <div id="DialogMask" class="dialog-mask"></div>
    <audio src="images/bg.mp3" autoplay="autoplay" loop="loop" />
</div>
<script src="js/index.js" type="text/javascript"></script>
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?04eff259a0d59ace3b1af46557608c81";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
</body>
</html>

