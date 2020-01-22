

<style>
body { margin:0; padding:0; font-family:"Arial"; }
.pickerImage {
  width:140px; height:70px;
  border:1px solid #999999;
  margin:0px 10px 10px 0px;
  cursor:pointer;
}
</style>

<?php

$imageDir = "..\\img\\";

$files = scandir($imageDir);

foreach ($files as $f) {
  if (is_file("..\\img\\".$f)) {
    $h = '<img class="pickerImage" src="'.$imageDir.$f.'" title="'.$f.'" alt="'.$f.'" ';
    $h .= 'onclick="parent.debugChangeSceneImage(\''.$f.'\')" />';
    echo $h;
  }
}

?>
