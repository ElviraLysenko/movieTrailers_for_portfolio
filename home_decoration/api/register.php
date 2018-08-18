<?php
// Страница регистрации нового пользователя
$nick_name = "User";
if(isset($_POST['email'])) $email = $_POST['email']; 
if (isset($_POST['password'])) $password = $_POST['password'];
if (isset($_POST['nick_name'])) $nick_name = $_POST['nick_name'];

require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

$password = md5(md5(trim($_POST['password'])));
 
$err = array('error' => '');

    // проверяем, не сущестует ли пользователя с таким именем
    $query = mysqli_query($link, "SELECT id FROM users WHERE email='".mysqli_real_escape_string($link, $_POST['email'])."'");
    if(mysqli_num_rows($query) > 0)
    {
       $err['error'] = "Ошибка: Пользователь с таким логином уже существует в базе данных";
    }

    // Если нет ошибок, то добавляем в БД нового пользователя
    if($err['error'] == '') {   
        // выполняем операции с базой данных
        $query = "INSERT INTO users VALUES (NULL,'$email','$password','$nick_name')";

        $result = mysqli_query($link, $query); 
    }

echo json_encode($err['error']);
    
// закрываем подключение
mysqli_close($link); 

?>
