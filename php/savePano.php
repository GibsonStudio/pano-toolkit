<?php

require("connect.php");

$id = isset($_POST['id']) ? $_POST['id'] : 0;
$name = isset($_POST['name']) ? $_POST['name'] : "";
$xml = isset($_POST['xml']) ? $_POST['xml'] : false;

// update or new?

$sql = "SELECT * FROM panoramas WHERE id=:id";
$query = $db->prepare($sql);
$query->bindValue(":id", $id, PDO::PARAM_STR);
$query->execute();
$update = false;

if ($query->rowCount()) {

  // update
  $update = true;
  $sql = 'UPDATE panoramas SET name=:name, xml=:xml WHERE id=:id';

} else {

  // new
  $sql = 'INSERT INTO panoramas (name, xml) VALUES (:name, :xml)';

}

$query = $db->prepare($sql);
if ($update) { $query->bindValue(":id", $id, PDO::PARAM_INT); }
$query->bindValue(":name", $name, PDO::PARAM_STR);
$query->bindValue(":xml", $xml, PDO::PARAM_STR);
$query->execute();

$data = new stdClass();
$data->result = "";
$data->insertID = 0;

if ($update) {

  if ($query->rowCount()) {
    $data->result = "OK";
  } else {
    $data->result = "No data updated. Probably no new data.";
  }

} else {
  $data->insertID = $db->lastInsertId();
}

echo json_encode($data);

?>
