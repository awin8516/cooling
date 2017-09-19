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
<link href="css/tmall.css" rel="stylesheet" type="text/css"/>
<script src="js/jquery-1.9.0.js" type="text/javascript"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>
<script src="js/wx_new_share.js" type="text/javascript"></script>
</head>

<body>
<div class="tmall-bg">
    <img src="images/tmall-qrcode.png">
</div>
<script>
    $(function(){
        var w = $('.tmall-bg').width();
        var h = w * 1.6;
        $('.tmall-bg').height(h+'px');
    });

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

