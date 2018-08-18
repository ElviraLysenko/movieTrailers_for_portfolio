<?php

if(isset($_POST['caption'])) $caption = $_POST['caption'];
if (isset($_POST['file_name'])) $image = $_POST['file_name']; 
if (isset($_POST['text'])) $text = $_POST['text'];
if ($_COOKIE["date_of_news"]!='') $date = $_COOKIE["date_of_news"];
require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
    mysqli_set_charset($link, "utf8");

		if(($_FILES['file']['error'] == 0)&&($_FILES['file']['name'] !== '')){
			$name = mt_rand(0, 10000) . $image;
			if(move_uploaded_file($_FILES['file']['tmp_name'], '../img/news/'.$name)){
			   	$file = 'img/news/'.$name;
			}
		}

		if($_FILES['file']['name'] == '') {
		   	$file = 'img/news/default_image.jpg';
		}

        // выполняем операции с базой данных

        $query ="INSERT INTO news VALUES (NULL, '$caption', '$file', '$text', '$date')";
		
		$result = mysqli_query($link, $query);
   

// закрываем подключение
mysqli_close($link); 

?>
