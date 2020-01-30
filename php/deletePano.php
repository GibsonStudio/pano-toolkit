<?php

$id = isset($_POST['id']) ? $_POST['id'] : 0;

if (!$id) {
  echo 'ERROR: No ID sent.';
  return false;
}

require('connect.php');

//$query = $db->prepare("DELETE FROM panoramas WHERE id=:id");

$query = $db->prepare("UPDATE panoramas SET deleted='1' WHERE id=:id");
$query->bindValue(":id", $id, PDO::PARAM_INT);
$query->execute();

if ($query->rowCount() > 0) {
  echo 'OK';
} else {
  echo 'ERROR: Panorama not deleted.';
}

?>
