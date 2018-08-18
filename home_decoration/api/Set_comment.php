<?php

if (isset($_POST['text'])) $text = $_POST['text'];
if (isset($_POST['rate'])) $rate_str = $_POST['rate'];
$rate = preg_replace("/[^0-9]/", '', $rate_str);
if ($_COOKIE["id"]!='') $id_user = $_COOKIE["id"];
if ($_COOKIE["comment_sending_date"]!='') $date = $_COOKIE["comment_sending_date"];
if ($_COOKIE["id_news"]!='') $news = $_COOKIE["id_news"];

require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
    mysqli_set_charset($link, "utf8");
   
     
        // выполняем операции с базой данных
            $query ="INSERT INTO comment VALUES (NULL, '$id_user', '$rate', '$date', '$text', '$news')";
            
            $result = mysqli_query($link, $query);
            
// закрываем подключение
mysqli_close($link); 


?>
