<?php

$id = isset($_POST['id']) ? $_POST['id'] : false;
if (!$id) { echo "error"; }

require('connect.php');

$sql = "SELECT * FROM panoramas WHERE id=:id";
$query = $db->prepare($sql);
$query->bindValue(":id", $id, PDO::PARAM_INT);
$query->execute();

if ($query->rowCount() < 1) {
  echo "error";
  return false;
}

$pano = $query->fetch();
$data = new stdClass();
$data->id = $pano['id'];
$data->name = $pano['name'];
$data->xml = $pano["xml"];


echo json_encode($data);

?>
