<?php
/**
 * Created by PhpStorm.
 * User: lei
 * Date: 15/8/9
 * Time: 15:36
 */

set_time_limit(0);
error_reporting(0);
session_start();

$act = trim($_GET['act']);
if(empty($act)) exit();

require "config.inc.php";

$mysql = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
mysql_select_db(DB_NAME);
mysql_set_charset('utf8');

if($act=='share' or $act == 'b2b'){
    $platform = trim($_POST['platform']);
    $sql = "insert into ".$act."s(openid, platform) value('".$_SESSION['openid']."','".$platform."')";
    mysql_query($sql);
}


mysql_close($mysql);