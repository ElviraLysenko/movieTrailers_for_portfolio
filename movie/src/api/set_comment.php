<?php
$comment = '';
$rate = 0;
if (isset($_POST['comment'])) $comment = $_POST['comment'];
if (isset($_POST['rate'])) $rate = $_POST['rate'];
if ($_COOKIE['log']!='') $user_log = $_COOKIE['log'];
if ($_COOKIE['comment_sending_date']!='') $date = $_COOKIE['comment_sending_date'];
if ($_COOKIE['film']!='') $id_film = $_COOKIE['film'];

require_once 'dbconnect.php'; // подключаем скрипт
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
    mysqli_set_charset($link, "utf8");
   		
   	$massage = array('error' => '');
   		// поиск авторизированного пользователя
   		$idLog = mysqli_fetch_row(mysqli_query($link, "SELECT id FROM users WHERE login='".$user_log."'"));
   		$id_user = $idLog[0];
   		
      // запись комментария в бд
      if($rate == 0) { $query = "INSERT INTO comments VALUES (NULL, '$id_user', '$id_film', '$comment', NULL, '$date')"; }
      else { $query = "INSERT INTO comments VALUES (NULL, '$id_user', '$id_film', '$comment', '$rate', '$date')"; }
      $result = mysqli_query($link, $query);
      if($result == FALSE)
    	{   
        	$massage['error'] = "что-то пошло не так";
    	}
  	echo json_encode($massage['error']);
// закрываем подключение
mysqli_close($link); 

?>
