<?php
require_once 'dbconnect.php'; // подключаем скрипт
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
$link->set_charset("utf8");

$query ="SELECT *, ( SELECT round(AVG(rate)) FROM comments WHERE films.id = comments.id_film ) AS rate FROM films";

//$rate = "SELECT AVG(rate) FROM comments ORDER BY id_film";
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if($result)
{
   $data = array(); // в этот массив запишем то, что выберем из базы
    while($row = mysqli_fetch_assoc($result)){ // оформим каждую строку результата как ассоциативный массив
    $data[] = $row; // допишем строку из выборки как новый элемент результирующего массива
    //$data[] = $rate; //допишем в конец массива 
}
    echo json_encode($data); // и отдаём как json
     
    // очищаем результат
    mysqli_free_result($result);
}
// закрываем подключение
mysqli_close($link); 

?>
