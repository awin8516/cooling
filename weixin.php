<?php

set_time_limit(0);
error_reporting(0);
session_start();

require "config.inc.php";

define("URL", trim($_REQUEST['url']));

//获取client token
define("WX_CLIENT_TOKEN", "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s");

//获取jsapi_ticket
define("WX_GETTICKET", "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi");

$jsapi_file = 'jsapi.json';
$time = time();

if(!isset($_SESSION['jsapi'])){
    $jsapi = json_decode(file_get_contents($jsapi_file), true);
    $_SESSION['jsapi'] = $jsapi;
}

if($_SESSION['jsapi']['expires'] < $time)
{
    $url = sprintf(WX_CLIENT_TOKEN, APPID, APPSECRET);
    $client_token = json_decode(html($url), true);

    $url = sprintf(WX_GETTICKET, $client_token['access_token']);
    $jsapi_json = html($url);
    $jsapi = json_decode($jsapi_json, true);

    if($jsapi['errcode'] > 0) exit();

    $jsapi['expires'] = $time + $jsapi['expires_in'];

    file_put_contents($jsapi_file, json_encode($jsapi));

    $_SESSION['jsapi'] = $jsapi;
}

$array = array();
$array['jsapi_ticket'] = $_SESSION['jsapi']['ticket'];
$array['noncestr'] =  getOnceStr();
$array['timestamp'] =  $time;
$array['url'] = urldecode(URL);

ksort($array);

$temp = array();
foreach($array as $key => $value)
{
    $temp[] = $key.'='.$value;
}
$string = implode('&', $temp);

$json = array();
$json['appId'] = APPID;
$json['timestamp'] = $time;
$json['nonceStr'] = $array['noncestr'];
$json['signature'] = sha1($string);


echo json_encode($json);
exit();


//进行HTTP请求，留下请求页面
function html($url)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    $html = curl_exec($curl);
    curl_close($curl);

    return $html;
}

//获取随机字符串
function getOnceStr()
{
    $chars = 'abcdefghijklmnonqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $len = strlen($chars);
    $oncestr = '';

    for($i=0; $i<16; $i++)
    {
        $oncestr .= substr($chars, mt_rand(0, $len-1), 1);
    }

    return $oncestr;
}

