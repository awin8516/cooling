$(function() {
    var link = window.location.href;
    var temp = link.split('#');
    var url = encodeURIComponent(temp[0]);

    $.getJSON('weixin.php?url='+url, function (data) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    });
});

wx.ready(function() {
    wxShare();
});


function wxShare(share) {
    var _share = $.extend({
		timeline:'清凉妙用，向奇招致敬，不服来点！',
		title:'清凉妙用，向奇招致敬，不服来点！', 
		desc:'清凉妙用，向奇招致敬，不服来点！',
		link:'http://wechat.jointerchina.com/cooling/',
        imgUrl:'http://wechat.jointerchina.com/cooling/images/share.jpg'
	}, share || {});

    wx.onMenuShareTimeline({
        title: _share.timeline, // 分享标题
        link: _share.link, // 分享链接
        imgUrl: _share.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            shareSuccess("朋友圈");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: _share.title, // 分享标题
        desc: _share.desc, // 分享描述
        link: _share.link, // 分享链接
        imgUrl: _share.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            shareSuccess("好友");

        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQQ({
        title: _share.title, // 分享标题
        desc: _share.desc, // 分享描述
        link: _share.link, // 分享链接
        imgUrl: _share.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            shareSuccess("QQ");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareWeibo({
        title: _share.title, // 分享标题
        desc: _share.desc, // 分享描述
        link: _share.link, // 分享链接
        imgUrl: _share.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            shareSuccess("Weibo");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQZone({
        title: _share.title, // 分享标题
        desc: _share.desc, // 分享描述
        link: _share.link, // 分享链接
        imgUrl: _share.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            shareSuccess("Qzone");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
};

function shareSuccess(platform){
    $.post('ajax.php?act=share',{platform:platform}, function(){
        $('#shareTips').remove();
        Redirect('#PageGift');
    });
}
