<?php

$file = isset($_POST['file']) ? $_POST['file'] : false;
$data = new stdClass();


if (!$file) {
  $data->result = "ERROR: No file sent.";
  echo json_encode($data);
  return false;
}


$targetFile = "..\\img\\".basename($_FILES["fileToUpload"]["name"]);

// check files does not already exist
if (file_exists($targetFile)) {
  $data->result = "ERROR: File already exists.";
  echo json_encode($data);
  return false;
}



// upload file

$result = move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile);

if ($result) {
  $data->result = basename( $_FILES["fileToUpload"]["name"])." uploaded OK.";
} else {
  $data->result = "ERROR: Unknown error.";
}

echo json_encode($data);


?>
