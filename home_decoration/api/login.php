<?php
header("Content-Type: text/html; charset=utf-8");
//страница авторизации пользователя
if(isset($_POST['email'])) $email = $_POST['email']; 
if (isset($_POST['password'])) $password = $_POST['password'];
require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
$password = md5(md5(trim($_POST['password'])));
$err = array('error' => "");
    // проверяем,сущестует ли пользователь с таким именем
    $query = mysqli_query($link, "SELECT id FROM users WHERE email='".mysqli_real_escape_string($link, $_POST['email'])."' AND password='".mysqli_real_escape_string($link, $password)."'");
    $nickname = mysqli_query($link, "SELECT nick_name FROM users WHERE email='".mysqli_real_escape_string($link, $_POST['email'])."' AND password='".mysqli_real_escape_string($link, $password)."'");
    $row_id = mysqli_fetch_assoc($query);
    $row_nick = mysqli_fetch_assoc($nickname);
    if(mysqli_num_rows($query) > 0)
    {   
        setcookie("id", $row_id['id'], time()+43200, '/'); 
        setcookie("nick_name", $row_nick['nick_name'], time()+43200, '/'); 
    }
    else {
        $err['error'] = "Ошибка. Неверный логин или пароль.";
    }
    
echo json_encode($err['error']);

// закрываем подключение
mysqli_close($link);
?>