<?php

$filename = isset($_POST['filename']) ? $_POST['filename'] : 'myArchive10';

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

echo "OK";

?>
