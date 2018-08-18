<?php
header("Content-Type: text/html; charset=utf-8");
//страница авторизации пользователя
if(isset($_POST['login'])) $login = $_POST['login']; 
if (isset($_POST['password'])) $password = $_POST['password'];
require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
$password = md5(md5(trim($_POST['password'])));
$err = array('error' => "");
    // проверяем,сущестует ли пользователь с таким именем
    $query = mysqli_query($link, "SELECT id FROM users WHERE login='".mysqli_real_escape_string($link, $login)."' AND password='".mysqli_real_escape_string($link, $password)."'");
    $row_id = mysqli_fetch_row($query);

    if(mysqli_num_rows($query) == 0)
    {   
        $err['error'] = "Ошибка. Неверный логин или пароль.";
    }

echo json_encode($err['error']);

// закрываем подключение
mysqli_close($link);
?>
