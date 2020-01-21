<style>
body { font-family:"Arial"; }
</style>

<?php

require('connect.php');

echo "Installing....<hr  />";

echo "Adding table <b>panoramas</b>....";

try {

  $sql = "CREATE TABLE IF NOT EXISTS panoramas (id int NOT NULL auto_increment, PRIMARY KEY (id), name varchar(100) UNIQUE, xml text)";
  $db->query($sql);
  echo 'OK<br /><br />';

} catch (PDOException $e) {
  echo "ERROR! ".$e."<br /><br />";
}


?>
