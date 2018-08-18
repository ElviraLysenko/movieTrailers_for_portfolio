<?php

if(isset($_POST['caption'])) $caption = $_POST['caption'];
if (isset($_POST['file_name'])) $image = $_POST['file_name']; 
if (isset($_POST['text'])) $text = $_POST['text'];
if ($_COOKIE["id_news"]!='') $id = $_COOKIE["id_news"];
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
			else  {
				echo "что-то не получается с фото";
			}
		}
		

		if($_FILES['file']['name'] == '') {
		   	$file = $image;
		}

        // выполняем операции с базой данных

		$query = "UPDATE news SET caption = '$caption', image = '$file', text = '$text' WHERE id = '$id'";
		
		$result = mysqli_query($link, $query);
     

// закрываем подключение
mysqli_close($link); 

?>
