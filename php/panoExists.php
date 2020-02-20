<?php

require('connect.php');

$id = isset($_POST['id']) ? $_POST['id'] : 0;

$sql = "SELECT* FROM panoramas WHERE id=:id";
$query = $db->prepare($sql);
$query->bindValue(":id", $id, PDO::PARAM_INT);
$query->execute();


$data = new stdClass();
$data->result = 0;

if ($query->rowCount() > 0) {
  $data->result = 1;
}

echo json_encode($data);

?>
