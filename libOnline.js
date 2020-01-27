



function loadFromDatabase (panoID)
{

  var panoID = panoID || false;
  if (!panoID) { return false; }

  $.ajax({
    url:"php/getData.php",
    type:"POST",
    data:{ id:panoID }
  }).done(function (data) {

    if (data == "error" || !data) {
      new Message({ text:"ERROR: Pano not loaded." });
    } else {

      pano.init();
      var data = JSON.parse(data);
      pano.id = data.id;
      pano.name = data.name;
      pano.scenes = [];
      parseXML(data.xml);

    }

  });

}



function debugRefreshSaved ()
{

  $.ajax({
    url:"php/getSavedPanoramas.php"
  }).done(function (data) {
    var el = document.getElementById("savedPanoramas");
    el.innerHTML = data;
  });

}




function debugChangeImage ()
{

  imagePicker = new ImagePicker();
  imagePicker.show();

}



function debugChangeSceneImage (img)
{

  imagePicker.close();

  if (pano.loadedScene) {

    pano.loadedScene.texture = img;
    debugAddSceneLinks();
    pano.loadedScene.loadTexture();

  }

}




function debugUploadImage ()
{

  uploadPopup = new Upload({ title:"Upload File:", text:"Supported formats are jpg, jpeg, and png." });
  uploadPopup.show();

}


function debugCloseUpload ()
{
  uploadPopup.close();
}



function debugDeletePano ()
{

  var myMessage = "This will remove the currently loaded panorama data from the database.";
  myMessage += "<br /><br />This cannot be undone.";

  var del = new Popup({ title:"Delete?", text:myMessage });
  del.addButton({ text:"OK", callback:"debugDeleteConfirmed" });
  del.addButton({ type:"cancel" });
  del.show();

}



function debugDeleteConfirmed ()
{

  if (!pano.id) {
    new Message({ text:"ERROR: No database panorama loaded." });
  } else {

    $.ajax({
      url:"php/deletePano.php",
      type:"POST",
      data: { id:pano.id }
    }).done(function (data) {

      if (data == "OK") {

        new Message ({ text:"Panorama deleted OK. Loading default...." });
        pano.id = 0;
        pano.name = "";
        pano.scenes = [];
        loadXML();

      } else {
        new Message({ text:data });
      }

    });

  }

}


function debugPublish ()
{

  $.ajax({
    url:"php/publish.php",
    type:"POST",
    data:{ id:pano.id, filename:pano.name }
  }).done(function (data) {

    var data = JSON.parse(data);
    new Message({ text:data.result });

    // download zip?
    if (data.filename) {

      var link = data.filename;
      var dl = document.createElement("a");
      dl.download = link;
      dl.href = "download\\" + link;
      dl.click();

    }

  });

}






function debugSave ()
{

    var myXML = pano.getXML();

    $.ajax({
      url:"php/savePano.php",
      type:"POST",
      data: { id:pano.id, name:pano.name, xml:myXML }
    }).done(function (data) {

      var data = JSON.parse(data);

      if (data.insertID) {
        pano.id = data.insertID;
        new Message({ text:"New pano saved OK (" + data.insertID + ")" });
      } else if (data.result == "OK") {
        new Message({ text:"Pano " + pano.id + " updated OK." });
      } else {
        new Message({ text:data.result });
      }

    });

}
