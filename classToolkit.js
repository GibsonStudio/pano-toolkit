




function Toolkit (args) {

  var args = args || {};

  // Add Hotspot Popup
  this.AddHotspotPopup = new Popup({ title:"Add Hotspot" });
  this.AddHotspotPopup.addField({ label:"ID", id:"id" });
  this.AddHotspotPopup.addField({ label:"Link", id:"link" });
  this.AddHotspotPopup.addField({ label:"Title", id:"title" });
  this.AddHotspotPopup.addField({ label:"Lat", id:"lat", type:"number" });
  this.AddHotspotPopup.addField({ label:"Lon", id:"lon", type:"number" });
  this.AddHotspotPopup.addButton({ text:"Add", callback:"Toolkit.AddHotspot" });
  this.AddHotspotPopup.addButton({ type:"cancel", text:"Close" });

  // Add Scene Popup
  this.AddScenePopup = new Popup({ title:"Add Scene" });
  this.AddScenePopup.addField({ label:"ID", id:"id" });
  this.AddScenePopup.addField({ label:"Image", id:"image", value:"default.jpg" });
  this.AddScenePopup.addField({ label:"Lat", id:"lat", type:"number" });
  this.AddScenePopup.addField({ label:"Lon", id:"lon", type:"number" });
  this.AddScenePopup.addButton({ text:"Add", callback:"Toolkit.AddScene" });
  this.AddScenePopup.addButton({ type:"cancel", text:"Close" });

  this.Upload = false;
  this.ImagePicker = false;




  // ******** general functions ********

  this.Init = function () {

    var dc = document.getElementById("dummy-container");

    // menu button
    var el = document.createElement("div");

    el.style.setProperty("position", "absolute");
    el.style.setProperty("left", "0px");
    el.style.setProperty("top", "50px");
    el.style.setProperty("width", "60px");
    el.style.setProperty("padding", "8px");
    el.style.setProperty("background-color", "#005eb8");
    el.style.setProperty("color", "#ffffff");
    el.style.setProperty("font-size", "12px");
    el.style.setProperty("border-top-right-radius", "8px");
    el.style.setProperty("border-bottom-right-radius", "8px");
    el.style.setProperty("cursor", "pointer");
    el.innerHTML = "menu";
    el.onclick = function () { Toolkit.MenuToggle(); }

    dc.appendChild(el);

    // load button
    if (onlineMode) {

      var el = document.createElement("div");

      el.style.setProperty("position", "absolute");
      el.style.setProperty("left", "0px");
      el.style.setProperty("top", "90px");
      el.style.setProperty("width", "60px");
      el.style.setProperty("padding", "8px");
      el.style.setProperty("background-color", "#005eb8");
      el.style.setProperty("color", "#ffffff");
      el.style.setProperty("font-size", "12px");
      el.style.setProperty("border-top-right-radius", "8px");
      el.style.setProperty("border-bottom-right-radius", "8px");
      el.style.setProperty("cursor", "pointer");
      el.innerHTML = "load";
      el.onclick = function () { Toolkit.LoadMenuToggle(); }

      dc.appendChild(el);

    }

    //   debug container
    var el = document.createElement("div");
    el.id = "debug";

    el.style.setProperty("position", "absolute");
    el.style.setProperty("left", "0px");
    el.style.setProperty("top", "140px");
    el.style.setProperty("width", "240px");
    //el.style.setProperty("height", "400px");
    el.style.setProperty("background-color", "#fffff6");
    el.style.setProperty("padding", "10px");
    el.style.setProperty("border-top-right-radius", "8px");
    el.style.setProperty("border-bottom-right-radius", "8px");
    el.hidden = false;

    var h = "";

    h += '<style>';
    h += '.debugButton { background-color:#d4d4d4; color:#666666; margin:4px 10px; padding:4px; border:none; cursor:pointer; font-size:11px; }';
    h += '.fieldTitle { font-size:12px; color:#666666;}';
    h += '</style>';

    h += '<div style="font-size:12px; font-weight:bold;">Scene List:</div>';
    h += '<div id="debugSceneLinks" style="height:140px; overflow-y:auto; background-color:#fcfcfc; margin-bottom:10px; border:1px solid #666666;"></div>';

    h += '<div style="border:1px solid #999999; margin-bottom:10px;">';
    h += '<div style="font-size:12px; font-weight:bold;">Panorama</div>';
    h += '<button class="debugButton" onclick="Toolkit.EditPanoInfo();">Info</button>';
    h += '<button class="debugButton" onclick="Toolkit.ShowXML();">Show XML</button>';

    if (onlineMode) {
      h += '<button class="debugButton" onclick="Toolkit.Save();">Save</button>';
      h += '<button class="debugButton" onclick="Toolkit.ShowDeleteDialog();">Delete</button>';
      h += '<button class="debugButton" onclick="Toolkit.ShowUploadDialog();">Upload Image</button>';
      h += '<button class="debugButton" onclick="Toolkit.Publish();">Publish</button>';
    }

    h += '</div>';

    h += '<div style="border:1px solid #999999; margin-bottom:10px;">';
    h += '<div style="font-size:12px; font-weight:bold;">Scene</div>';
    h += '<button class="debugButton" onclick="Toolkit.AddScenePopup.show();">Add</button>';
    h += '<button class="debugButton" onclick="Toolkit.ShowEditSceneDialog();">Edit</button>';
    if (onlineMode) { h += '<button class="debugButton" onclick="Toolkit.ShowImagePicker();">Change Image</button>'; }
    h += '<button class="debugButton" onclick="Toolkit.SetScenePosition();">Set Position</button>';
    h += '<button class="debugButton" onclick="Toolkit.DeleteCurrentScene();">Delete Current</button>';
    h += '<button class="debugButton" onclick="Toolkit.AddHotspotPopup.show();">Add Hotspot</button>';
    h += '</div>';

    h += '<hr />';

    h += '<table>';
    h += '<tr> <td class="fieldTitle">Lon:</td> <td><input id="debugLon" type="number" value="0" /></td> </tr>';
    h += '<tr> <td class="fieldTitle">Lat:</td> <td><input id="debugLat" type="number" value="0" /></td> </tr>';
    h += '</table>';
    h += '<button class="debugButton" onclick="Toolkit.StoreInfo();">Store Info</button>';

    el.innerHTML = h;

    dc.appendChild(el);



    //   load container
    var el = document.createElement("div");
    el.id = "debugLoad";

    el.style.setProperty("position", "absolute");
    el.style.setProperty("left", "0px");
    el.style.setProperty("top", "140px");
    el.style.setProperty("width", "240px");
    el.style.setProperty("background-color", "#fffff6");
    el.style.setProperty("padding", "10px");
    el.style.setProperty("border-top-right-radius", "8px");
    el.style.setProperty("border-bottom-right-radius", "8px");
    el.hidden = true;

    var h = '<div style="font-size:12px; font-weight:bold;">Saved Panoramas:</div>';
    h += '<div id="savedPanoramas" style="height:140px; overflow-y:auto; background-color:#fcfcfc; margin-bottom:10px; border:1px solid #666666;"></div>';
    h += '<button class="debugButton" onclick="Toolkit.RefreshSaved();">Refresh</button>';

    el.innerHTML = h;

    dc.appendChild(el);


    this.AddSceneLinks();

  }


  this.MenuToggle = function () {
    var debug = document.getElementById("debug");
    var debugLoad = document.getElementById("debugLoad");
    debug.hidden = !debug.hidden;
    debugLoad.hidden = true;
  }


  this.LoadMenuToggle = function () {

    var debug = document.getElementById("debug");
    var debugLoad = document.getElementById("debugLoad");
    debugLoad.hidden = !debugLoad.hidden;
    debug.hidden = true;

    if (!debugLoad.hidden) {
      Toolkit.RefreshSaved();
    }

  }


  this.StoreInfo = function () {
    document.getElementById("debugLon").value = pano.lon.toFixed(2);
    document.getElementById("debugLat").value = pano.lat.toFixed(2);
  }


  this.SetScenePosition = function () {
    pano.loadedScene.lon = parseFloat(pano.lon.toFixed(2));
    pano.loadedScene.lat = parseFloat(pano.lat.toFixed(2));
    new Message({ text:"Scene position updated OK" });
  }


  this.EditPanoInfo = function () {

    var data = "Loaded Scene ID: " + pano.loadedScene.id + "\n";
    data +='lon="' + pano.lon.toFixed(2) + '" ';
    data += 'lat="' + pano.lat.toFixed(2) + '"';

    var panoPopup = new Popup({ title:"Pano Info", width:"400px" });
    panoPopup.addField({ label:"name:", id:"name", value:pano.name });
    panoPopup.addField({ label:"info", id:"info", type:"textarea", value:data });
    panoPopup.addButton({ text:"Update", callback:"Toolkit.UpdatePano" });
    panoPopup.addButton({ type:"cancel" });
    panoPopup.show();

  }


  this.UpdatePano = function (args) {

    if (args.name) {
      pano.name = args.name;
      new Message({ text:"Pano updated OK" });
    }

  }


  this.AddSceneLinks = function () {

    pano.sortScenes();

    var cont = document.getElementById("debugSceneLinks");
    cont.innerHTML = "";

    for (var i = 0; i < pano.scenes.length; i++) {

      var el = document.createElement("div");
      el.style.setProperty("font-size", "12px");
      el.style.setProperty("padding", "4px");
      el.style.setProperty("cursor", "pointer");
      el.innerHTML = pano.scenes[i].id + ' (' + pano.scenes[i].texture + ')';

      el.sceneId = pano.scenes[i].id;
      el.onclick = function () { pano.load(this.sceneId); }

      cont.appendChild(el);

    }

  }


  this.ShowEditSceneDialog = function () {

    var editScenePopup = new Popup({ title:"Edit Scene" });
    editScenePopup.addField({ label:"ID", id:"id", value:pano.loadedScene.id });
    editScenePopup.addField({ label:"Image", id:"texture", value:pano.loadedScene.texture });
    editScenePopup.addField({ label:"Lon", id:"lon", type:"number", value:pano.loadedScene.lon });
    editScenePopup.addField({ label:"Lat", id:"lat", type:"number", value:pano.loadedScene.lat });
    editScenePopup.addField({ label:"Is Home Scene:", id:"isHomeScene", type:"checkbox", value:pano.loadedScene.isHomeScene });
    editScenePopup.addButton({ text:"Save", callback:"Toolkit.EditScene" });
    editScenePopup.addButton({ type:"cancel", text:"Cancel" });
    editScenePopup.show();

  }


  this.EditScene = function (args) {

    var args = args || {};
    pano.loadedScene.id = args.id ? args.id : pano.loadedScene.id;
    pano.loadedScene.texture = args.texture ? args.texture : pano.loadedScene.texture;
    pano.loadedScene.lon = args.lon ? parseFloat(args.lon) : pano.loadedScene.lon;
    pano.loadedScene.lat = args.lat ? parseFloat(args.lat) : pano.loadedScene.lat;

    if (args.isHomeScene) { pano.clearHomeScene(); }
    pano.loadedScene.isHomeScene = args.isHomeScene ? args.isHomeScene : false;

    // reload scene?
    this.AddSceneLinks();
    pano.loadedScene.loadTexture();

  }


  this.AddScene = function (args) {

    var args = args || {};

    var myID = args.id ? args.id : "scene-" + Math.round(Math.random() * 100000);
    var myImage = args.image ? args.image : "";
    var myLon = args.lon ? parseFloat(args.lon) : 0;
    var myLat = args.lat ? parseFloat(args.lat) : 0;

    var panoScene = new PanoScene({ id:myID, texture:myImage, lon:myLon, lat:myLat });
    pano.scenes.push(panoScene);

    this.AddSceneLinks();

  }


  this.DeleteCurrentScene = function () {

    var sceneCount = pano.scenes.length;
    if (sceneCount < 2) { return false; }

    var sIndex = pano.scenes.indexOf(pano.loadedScene);

    pano.scenes.splice(sIndex, 1);
    this.AddSceneLinks();
    pano.scenes[0].load();

  }


  this.AddHotspot = function (args) {

     var args = args || {};

     var myID = args.id ? args.id : "hs-" + Math.round(Math.random() * 100000);
     var myLink = args.link ? args.link : "";
     var myTitle = args.title ? args.title : "";
     var myLon = args.lon ? parseFloat(args.lon) : 180 - pano.lon;
     var myLat = args.lat ? parseFloat(args.lat) : -pano.lat;

     pano.loadedScene.addHotspot({ id:myID, link:myLink, title:myTitle, lon:myLon, lat:myLat }, true);

  }


  this.ShowXML = function () {

    var xml = pano.getXML();
    var xmlPopup = new Popup({ title:"XML data for scenes.xml", width:"500px" });
    xmlPopup.addField({ label:"xml", id:"xml", type:"textarea", value:xml, height:"300px" });
    xmlPopup.addButton({ type:"cancel" });
    xmlPopup.show();

  }


  this.UpdateHotspot = function (args) {

    var id = args.id ? args.id : "";
    var title = args.title ? args.title : "";
    var originalID = pano.clickedHotspot.id;

    pano.clickedHotspot.id = id;
    pano.clickedHotspot.link = args.link ? args.link : "";
    pano.clickedHotspot.title = title;
    pano.clickedHotspot.sceneLon = args.sceneLon ? parseFloat(args.sceneLon) : 0;
    pano.clickedHotspot.sceneLat = args.sceneLat ? parseFloat(args.sceneLat) : 0;

    // update html element
    var el = document.getElementById("overlay-" + originalID);
    el.id = "overlay-" + id;
    el.title = title;

  }


  this.DeleteHotspot = function (args) {
    pano.clickedHotspot.delete();
  }


  this.ShowHotspotXML = function () {

    var xml = pano.clickedHotspot.getXML();
    var xmlPopup = new Popup({ title:"XML data for hotspot", width:"500px" });
    xmlPopup.addField({ label:"xml", id:"xml", type:"textarea", value:xml, height:"300px" });
    xmlPopup.addButton({ type:"cancel" });
    xmlPopup.show();

  }


  this.HotspotClicked = function () {
    pano.clickedHotspot.clicked();
  }












  // ******** save and load panorama ********

  this.Save = function () {

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


  this.RefreshSaved = function () {

    $.ajax({
      url:"php/getSavedPanoramas.php"
    }).done(function (data) {
      var el = document.getElementById("savedPanoramas");
      el.innerHTML = data;
    });

  }


  this.LoadFromDatabase = function (panoID) {

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






  // ******** image picker ********

  this.ShowImagePicker = function () {

    this.ImagePicker = new ImagePicker();
    this.ImagePicker.show();

  }


  this.ChangeImage = function (img) {

    this.ImagePicker.close();

    if (pano.loadedScene) {

      pano.loadedScene.texture = img;
      this.AddSceneLinks();
      pano.loadedScene.loadTexture();

    }

  }





  // ******** image upload ********

  this.ShowUploadDialog = function () {

    this.Upload = new Upload({ title:"Upload File:", text:"Supported formats are jpg, jpeg, and png." });
    this.Upload.show();

  }


  this.CloseUploadDialog = function () {
    this.Upload.close();
  }







  // ******** delete panorama ********

  this.ShowDeleteDialog = function () {

    var myMessage = "This will remove the currently loaded panorama data from the database.";
    myMessage += "<br /><br />This cannot be undone.";

    var del = new Popup({ title:"Delete?", text:myMessage });
    del.addButton({ text:"OK", callback:"Toolkit.DeletePano()" });
    del.addButton({ type:"cancel" });
    del.show();

  }


  this.DeletePano = function () {

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
          Toolkit.RefreshSaved();

        } else {
          new Message({ text:data });
        }

      });

    }

  }








  // ******** publish ********

  this.Publish = function () {

    new Message({ text:"Publishing...." });

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








}

















//
