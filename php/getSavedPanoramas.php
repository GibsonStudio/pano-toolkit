<?php

require('connect.php');

$sql = "SELECT* FROM panoramas WHERE deleted <> 1 OR deleted IS NULL";
$query = $db->prepare($sql);
$query->execute();
$rows = $query->fetchAll();

$html = "";

foreach ($rows as $row) {

  $id = $row['id'];
  $name = $row['name'] ? $row['name'] : 'blank';

  $html .= '<div style="font-size:12px; padding:4px; cursor:pointer; background-color:#e2e2e2; margin-bottom:4px;" ';
  $html .= 'onclick="loadFromDatabase('.$id.')">'.$name.'</div>';

}

echo $html;

?>
