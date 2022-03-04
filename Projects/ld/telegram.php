<?php

$car_number = $_POST['car_number'];
$from_where = $_POST['from_where'];
$to_where = $_POST['to_where'];
$car_status = $_POST['car_status'];
$load_status = $_POST['load_status'];
$pay_status = $_POST['pay_status'];
$comment = $_POST['comment'];
$loaded_time = $_POST['loaded_time'];
$unloading_time = $_POST['unloading_time'];

$token = "5149116023:AAGnUQDZJ4TOx1PPGVWG-2EXhlU4NDxjhdY";
$chat_id = "-749254678";

$urlFile =  "https://api.telegram.org/bot{$token}/sendMediaGroup";

function sendFileTelegram($fileTempName) {
  $token = "5149116023:AAGnUQDZJ4TOx1PPGVWG-2EXhlU4NDxjhdY";
  $chat_id = "-749254678";

  $urlSite = "https://api.telegram.org/bot{$token}/sendDocument";

  move_uploaded_file($_FILES['file']['tmp_name'], basename($_FILES['file']['name']));

  $document = new CURLFile(realpath($fileTempName));
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $urlSite);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $out = curl_exec($ch);
  curl_close($ch);

  unlink($_FILES['file']['name']);
}

$arr = array(
  'Номер машины: ' => $car_number,
  'Откуда: ' => $from_where,
  'Куда: ' => $to_where,
  'Статус машины: ' => $car_status,
  'Дата погрузки: ' => $loaded_time,
  'Дата разгрузки: ' => $unloading_time,
  'Оплачено: ' => $pay_status,
  'Статус разгрузки: ' => $load_status,
  'Комментарий: ' => $comment,
  'Файл: ' => $_FILES['file']['name'],
);

if ($_FILE[$file]["error"]) {
  echo "error";
}

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
sendFileTelegram($_FILES["file"]["name"]);

if ($sendToTelegram) {
  header('Location: index.html');
} else {
  echo "Error";
}
?>