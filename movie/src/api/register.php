<?php
// Страница регистрации нового пользователя
if (isset($_POST['name'])) $name = $_POST['name'];
if(isset($_POST['login'])) $login = $_POST['login']; 
if (isset($_POST['password'])) $password = $_POST['password'];

require_once 'dbconnect.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, "utf8");

if($name == ''){
    $name = "User";
}
$password = md5(md5(trim($_POST['password'])));

$err = array('error' => '');

    // проверяем, не сущестует ли пользователя с таким именем
    $query = mysqli_query($link, "SELECT id FROM users WHERE login='".mysqli_real_escape_string($link, $login)."'");
    if(mysqli_num_rows($query) > 0) {
        $err['error'] = "Ошибка: Пользователь с таким логином уже существует в базе данных";
    }

    // Если нет ошибок, то добавляем в БД нового пользователя
    if($err['error'] == '') {   
        // выполняем операции с базой данных
        $query = "INSERT INTO users VALUES (NULL,'$name','$login','$password')";
        $result = mysqli_query($link, $query);
    }
echo json_encode($err['error']);
    
// закрываем подключение
mysqli_close($link); 

?>
