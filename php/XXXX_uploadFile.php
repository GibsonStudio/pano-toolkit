<style>
body { margin:0; padding:0; font-family:"Arial"; }
#container { position:relative; width:100%; height:100%; background-color:#005eb8; }
#dialog {
  position:absolute; left:50%; top:50%; width:360px;
  margin-top:-100px; margin-left:-180px; padding:20px;
  background-color:#f9423a; border:1px solid #e2e2e2;
  text-align:center;
}
#buttons { margin-top:20px; }
button {
  border:none; background-color:#123123; color:#666666;
  padding:4px; font-size:12px; min-width:80px; cursor:pointer;
}
</style>

<?php

$message = "This is cool!!";


$targetFile = "..\\img\\".basename($_FILES["file"]["name"]);


// check files does not already exist
if (file_exists($targetFile)) {
  $message = "ERROR: File already exists.";
  //echo json_encode($data);
  //return false;
} else {

// upload file

  $result = copy($_FILES["file"]["tmp_name"], $targetFile);

  if ($result) {
    $message = basename( $_FILES["file"]["name"])." uploaded OK.";
  } else {
    $message = "ERROR: Unknown error.";
  }

}

//echo json_encode($data);


?>

<script>
window.opener.uploadMessage("<?php echo $message; ?>");
window.close();
</script>

<div id="container">

  <div id="dialog">
    <?php echo $message; ?>

    <div id="buttons">
      <button onclick="window.opener.uploadMessage('<?php echo $message; ?>');window.close();">OK</button>
    </div>

  </div>

</div>
