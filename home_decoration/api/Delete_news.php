<?php

if ($_COOKIE["id_news"]!='') $id = $_COOKIE["id_news"];
require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
    mysqli_set_charset($link, "utf8");

        // выполняем операции с базой данных

		$query = "DELETE FROM news WHERE id = '$id'";
		
		$result = mysqli_query($link, $query);
        if($result) { 			  
			echo "Выполнение запроса прошло успешно";
            header("Location: http://127.0.0.1/home_decoration/"); exit();
		}

// закрываем подключение
mysqli_close($link); 

?>
