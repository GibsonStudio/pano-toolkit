<style>
body { padding:0; margin:0; font-family:"Arial"; }
button {
  border:none; color:#666666; background-color:#d4d4d4;
  font-size:12px; padding:4px; margin:2px; cursor:pointer;
}
.error { font-size:12px; color:#f9423a; padding-bottom:10px; }
.ok { font-size:12px; color:#307C28; padding-bottom:10px; }
</style>

<?php

$submitted = isset($_POST['submitted']) ? $_POST['submitted'] : false;

if ($submitted) {

  $targetFile = "..\\img\\".basename($_FILES["file"]["name"]);

  // check files does not already exist
  if (!$_FILES["file"]["name"]) {

    echo '<div class="error">ERROR: No file specified.</div>';
    $submitted = false;

  } elseif (file_exists($targetFile)) {

    echo '<div class="error">ERROR: '.$_FILES["file"]["name"].' already exists.</div>';
    $submitted = false;

  } else {

  // upload file

    $result = copy($_FILES["file"]["tmp_name"], $targetFile);

    if ($result) {
      echo '<div class="ok">'.basename( $_FILES["file"]["name"]).' uploaded OK.</div>';
    } else {
      echo '<div class="error">ERROR: Unknown error.</div>';
    }

    echo '<button onclick="parent.debugCloseUpload()">OK</button>';

  }

}

?>



<?php if (!$submitted) { ?>
<form id="upload-form" action="#" method="POST" enctype="multipart/form-data">
  <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" />
  <input type="hidden" name="submitted" value="true" />
</form>

<div style="padding=top:20px;">
  <button onclick="document.getElementById('upload-form').submit()">Upload</button>
  <button onclick="parent.debugCloseUpload()">Cancel</button>
</div>
<?php } ?>
