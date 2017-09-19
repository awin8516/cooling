<?php
/**
 * Created by PhpStorm.
 * User: lei
 * Date: 15/8/9
 * Time: 11:05
 */

set_time_limit(0);
error_reporting(0);
session_start();

if($_GET['code']) {

    require "config.inc.php";

    $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . APPID . '&secret=' . APPSECRET . '&code='.trim($_GET['code']).'&grant_type=authorization_code';
    $response = file_get_contents($url);
    $json = json_decode($response, true);
    $_SESSION['openid'] = $json['openid'];

    $mysql = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
    mysql_select_db(DB_NAME);
    mysql_set_charset('utf8');
    $sql = "insert into users(openid) value('".$json['openid']."')";
    mysql_query($sql);
    mysql_close($mysql);
}

header('Location: index.php');