<?php

$id = isset($_POST['id']) ? $_POST['id'] : 0;
$filename = isset($_POST['filename']) ? $_POST['filename'] : "myPano";

$data = new stdClass();
$data->result = "";

if (!$id) {
  $data->result = "Error: No Pano ID sent.";
  echo json_encode($data);
  return false;
}

require("connect.php");
require('lib.php');

$sql ="SELECT * FROM panoramas WHERE id=:id";
$query = $db->prepare($sql);
$query->bindValue(":id", $id, PDO::PARAM_INT);
$query->execute();

if ($query->rowCount() < 1) {
  $data->result = "Error: Pano with ID:".$id." not found.";
  echo json_encode($data);
  return false;
}

$pano = $query->fetch();

$id = $pano['id'];
$name = $pano['name'];
$xml = $pano['xml'];

$publishDir = "..\\published\\";

// remove folder
removeDir($publishDir);

while (is_dir($publishDir)) {}

if (!is_dir($publishDir)) { mkdir($publishDir); }

// scenes.xml
$fh = fopen($publishDir."scenes.xml", "w");
fwrite($fh, $xml);
fclose($fh);

// index.html
$htmlData = file_get_contents("..\\templates\\index.html");
$htmlData = str_replace("[[title]]", $name, $htmlData);
$fh = fopen($publishDir."index.html", "w");
fwrite($fh, $htmlData);
fclose($fh);

// copy files
$files = ["classPano.js", "jquery-1.11.2.min.js", "lib.js", "style.css", "three.min.js"];

foreach ($files as $f) {
  copy("..\\".$f, $publishDir.$f);
}


// create folders
$folders = ["img", "img-system"];
foreach ($folders as $f) {
  mkdir($publishDir.$f);
}



// copy folder contents
$files = scandir("..\\img-system");

foreach ($files as $f) {
  if (is_file("..\\img-system\\".$f)) {
    copy("..\\img-system\\".$f, $publishDir."img-system\\".$f);
  }
}



// get used images and only copy those
$xmlObj = simplexml_load_string($xml);
$scenes = $xmlObj->scene;
$used_images = [];

foreach ($scenes as $scene) {
  $image = $scene->attributes()['image'];
  if ($image) { array_push($used_images, $image); }
}



// copy images

$files = scandir("..\\img");

foreach ($files as $f) {
  if (is_file("..\\img\\".$f) && in_array($f, $used_images)) {
    copy("..\\img\\".$f, $publishDir."img\\".$f);
  }
}





// zip up

if (substr($filename, -4) !== ".zip") { $filename .= '.zip'; }

$publishDir = "..\\published\\";
$outputDir = "..\\download\\";

$zipFile = $outputDir.$filename;

$zip = new ZipArchive();
$zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);

$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($publishDir), RecursiveIteratorIterator::LEAVES_ONLY);

foreach ($files as $name => $file) {

  if (!$file->isDir()) {
    $filePath = substr($file, strlen($publishDir));
    $zip->addFile($file, $filePath);
  }

}

$zip->close();

$data->filename = $filename;

$data->result = "Published OK";

echo json_encode($data);

?>
