<?php
require_once 'dbconnect.php'; // подключаем скрипт
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
$link->set_charset("utf8");

$query ="SELECT users.nick_name, comment.rate, comment.date_uploud, comment.text_comment, comment.id_news FROM users INNER JOIN comment ON users.id = comment.id_user";

$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if($result)
{
   $data = array(); // в этот массив запишем то, что выберем из базы
    while($row = mysqli_fetch_assoc($result)){ // оформим каждую строку результата как ассоциативный массив
    $data[] = $row; // допишем строку из выборки как новый элемент результирующего массива
}
    echo json_encode($data); // и отдаём как json
     
    // очищаем результат
    mysqli_free_result($result);
}
// закрываем подключение
mysqli_close($link); 

?>