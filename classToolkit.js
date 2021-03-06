




function Toolkit (args) {

  var args = args || {};
  this.AddHotspotPopup = false;
  this.AddScenePopup = false;
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
    if (Pano.mode >= 2) {

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
    h += '.debugButton { background-color:#d4d4d4; color:#666666; margin:4px 4px; padding:4px; border:none; cursor:pointer; font-size:11px; }';
    h += '.fieldTitle { font-size:12px; color:#666666;}';
    h += '</style>';

    h += '<div style="font-size:12px; font-weight:bold;">Scene List:</div>';
    h += '<div id="debugSceneLinks" style="height:140px; overflow-y:auto; background-color:#fcfcfc; margin-bottom:10px; border:1px solid #666666;"></div>';

    h += '<div style="border:1px solid #999999; margin-bottom:10px;">';
    h += '<div style="font-size:12px; font-weight:bold;">Panorama</div>';
    h += '<button class="debugButton" onclick="Toolkit.EditPanoInfo();">Info</button>';
    h += '<button class="debugButton" onclick="Toolkit.ShowXML();">Show XML</button>';

    if (Pano.mode >= 2) {
      h += '<button class="debugButton" onclick="Toolkit.TrySave();">Save</button>';
      h += '<button class="debugButton" onclick="Toolkit.ShowDeletePopup();">Delete</button>';
      h += '<button class="debugButton" onclick="Toolkit.ShowUploadPopup();">Upload Image</button>';
      h += '<button class="debugButton" onclick="Toolkit.Publish();">Publish</button>';
      h += '<button class="debugButton" onclick="Toolkit.ViewPublished();">View Published</button>';
    }

    h += '</div>';

    h += '<div style="border:1px solid #999999; margin-bottom:10px;">';
    h += '<div style="font-size:12px; font-weight:bold;">Scene</div>';
    h += '<button class="debugButton" onclick="Toolkit.ShowAddScenePopup();">Add</button>';
    h += '<button class="debugButton" onclick="Toolkit.ShowEditScenePopup();">Edit</button>';
    h += '<button class="debugButton" onclick="Toolkit.ShowDeleteScenePopup();">Delete</button>';
    h += '<button class="debugButton" onclick="Toolkit.SetScenePosition();">Set Position</button>';
    h += '</div>';

    h += '<div style="border:1px solid #999999; margin-bottom:10px;">';
    h += '<div style="font-size:12px; font-weight:bold;">Hotspot</div>';
    h += '<button class="debugButton" onclick="Toolkit.ShowAddHotspotPopup();">Add</button>';
    h += '</div>';

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
    document.getElementById("debugLon").value = Pano.lon.toFixed(2);
    document.getElementById("debugLat").value = Pano.lat.toFixed(2);
  }


  this.SetScenePosition = function () {
    Pano.loadedScene.lon = parseFloat(Pano.lon.toFixed(2));
    Pano.loadedScene.lat = parseFloat(Pano.lat.toFixed(2));
    new Message({ text:"Scene position updated OK" });
  }


  this.EditPanoInfo = function () {

    var data = "Loaded Scene ID: " + Pano.loadedScene.id + "\n";
    data +='lon="' + Pano.lon.toFixed(2) + '" ';
    data += 'lat="' + Pano.lat.toFixed(2) + '"';

    var panoPopup = new Popup({ title:"Pano Info", width:"400px" });
    panoPopup.addField({ label:"name:", id:"name", value:Pano.name });
    panoPopup.addField({ label:"info", id:"info", type:"textarea", value:data });
    panoPopup.addButton({ text:"Update", callback:"Toolkit.UpdatePano" });
    panoPopup.addButton({ type:"cancel" });
    panoPopup.show();

  }


  this.UpdatePano = function (args) {

    if (args.name) {
      Pano.name = args.name;
      new Message({ text:"Pano updated OK" });
    }

  }


  this.AddSceneLinks = function () {

    Pano.sortScenes();

    var cont = document.getElementById("debugSceneLinks");
    cont.innerHTML = "";

    for (var i = 0; i < Pano.scenes.length; i++) {

      var el = document.createElement("div");
      el.style.setProperty("font-size", "12px");
      el.style.setProperty("padding", "4px");
      el.style.setProperty("cursor", "pointer");
      el.innerHTML = Pano.scenes[i].id + ' (' + Pano.scenes[i].texture + ')';

      el.sceneId = Pano.scenes[i].id;
      el.onclick = function () { Pano.load(this.sceneId); }

      cont.appendChild(el);

    }

  }


  this.AddScene = function (args) {

    var args = args || {};

    var myID = args.id ? args.id : "scene-" + Math.round(Math.random() * 100000);
    var myDisplayName = args.displayName ? args.displayName : "";
    var myImage = args.panosceneImage ? args.panosceneImage : "";
    var myLon = args.lon ? parseFloat(args.lon) : 0;
    var myLat = args.lat ? parseFloat(args.lat) : 0;

    var panoScene = new PanoScene({ id:myID, displayName:myDisplayName, texture:myImage, lon:myLon, lat:myLat });
    Pano.scenes.push(panoScene);

    this.AddSceneLinks();
    Pano.addMenuLinks();

  }


  this.EditScene = function (args) {

    var args = args || {};
    var displayName = typeof args.displayName === "undefined" ? "" : args.displayName;
    Pano.loadedScene.id = args.id ? args.id : Pano.loadedScene.id;
    Pano.loadedScene.displayName = displayName;
    Pano.loadedScene.texture = args.panosceneImage ? args.panosceneImage : Pano.loadedScene.texture;
    Pano.loadedScene.lon = args.lon ? parseFloat(args.lon) : Pano.loadedScene.lon;
    Pano.loadedScene.lat = args.lat ? parseFloat(args.lat) : Pano.loadedScene.lat;

    if (args.isHomeScene) { Pano.clearHomeScene(); }
    Pano.loadedScene.isHomeScene = args.isHomeScene ? args.isHomeScene : false;

    // reload scene?
    this.AddSceneLinks();
    Pano.addMenuLinks();
    Pano.loadedScene.loadTexture();

  }


  this.DeleteScene = function () {

    var sceneCount = Pano.scenes.length;
    if (sceneCount < 2) { return false; }

    var sIndex = Pano.scenes.indexOf(Pano.loadedScene);

    Pano.scenes.splice(sIndex, 1);
    this.AddSceneLinks();
    Pano.scenes[0].load();

  }


  this.AddHotspot = function (args) {

     var args = args || {};

     var myID = args.id ? args.id : "hs-" + Math.round(Math.random() * 100000);
     var myLink = args.link ? args.link : "";
     var myTitle = args.title ? args.title : "";
     var myImage = args.image ? args.image : "hotspot-red.png";
     var myLon = args.lon ? parseFloat(args.lon) : 180 - Pano.lon;
     var myLat = args.lat ? parseFloat(args.lat) : -Pano.lat;

     Pano.loadedScene.addHotspot({ id:myID, link:myLink, title:myTitle, img:myImage, lon:myLon, lat:myLat }, true);

  }


  this.UpdateHotspot = function (args) {

    var id = args.id ? args.id : "";
    var title = args.title ? args.title : "";
    var originalID = Pano.clickedHotspot.id;

    Pano.clickedHotspot.id = id;
    Pano.clickedHotspot.link = args.link ? args.link : "";
    Pano.clickedHotspot.title = title;
    Pano.clickedHotspot.img = args.image;
    Pano.clickedHotspot.sceneLon = args.sceneLon ? parseFloat(args.sceneLon) : 0;
    Pano.clickedHotspot.sceneLat = args.sceneLat ? parseFloat(args.sceneLat) : 0;

    // update html element
    var el = document.getElementById("overlay-" + originalID);
    el.id = "overlay-" + id;
    el.title = title;
    el.style.backgroundImage = 'url("img-system/' + args.image + '")';

  }


  this.DeleteHotspot = function () {
    Pano.clickedHotspot.delete();
  }


  this.ShowHotspotXML = function () {

    var xml = Pano.clickedHotspot.getXML();
    var xmlPopup = new Popup({ title:"XML data for hotspot", width:"500px" });
    xmlPopup.addField({ label:"xml", id:"xml", type:"textarea", value:xml, height:"300px" });
    xmlPopup.addButton({ type:"cancel" });
    xmlPopup.show();

  }


  this.HotspotClicked = function () {
    Pano.clickedHotspot.clicked();
  }


  this.ShowXML = function () {

    var xml = Pano.getXML();
    var xmlPopup = new Popup({ title:"XML data for scenes.xml", width:"500px" });
    xmlPopup.addField({ label:"xml", id:"xml", type:"textarea", value:xml, height:"300px" });
    xmlPopup.addButton({ type:"cancel" });
    xmlPopup.show();

  }












  // ******** popups ******** //

  this.ShowAddScenePopup = function () {

    this.AddScenePopup = new Popup({ title:"Add Scene" });
    this.AddScenePopup.addField({ label:"ID", id:"id" });
    this.AddScenePopup.addField({ label:"Display Name", id:"displayName" });
    this.AddScenePopup.addField({ label:"Image", id:"panosceneImage", value:"default.jpg" });
    this.AddScenePopup.addField({ label:"Lat", id:"lat", type:"number" });
    this.AddScenePopup.addField({ label:"Lon", id:"lon", type:"number" });
    this.AddScenePopup.addButton({ text:"Add", callback:"Toolkit.AddScene" });
    this.AddScenePopup.addButton({ type:"cancel", text:"Close" });

    if (Pano.mode >= 2) {
      this.AddScenePopup.addButton({ text:"Choose Image", callback:"Toolkit.ShowImagePicker", closeOnClick:false });
    }

    this.AddScenePopup.show();

  }


  this.ShowEditScenePopup = function () {

    var editScenePopup = new Popup({ title:"Edit Scene" });
    editScenePopup.addField({ label:"ID", id:"id", value:Pano.loadedScene.id });
    editScenePopup.addField({ label:"Display Name", id:"displayName", value:Pano.loadedScene.displayName });
    editScenePopup.addField({ label:"Image", id:"panosceneImage", value:Pano.loadedScene.texture });
    editScenePopup.addField({ label:"Lon", id:"lon", type:"number", value:Pano.loadedScene.lon });
    editScenePopup.addField({ label:"Lat", id:"lat", type:"number", value:Pano.loadedScene.lat });
    editScenePopup.addField({ label:"Is Home Scene:", id:"isHomeScene", type:"checkbox", value:Pano.loadedScene.isHomeScene });
    editScenePopup.addButton({ text:"Save", callback:"Toolkit.EditScene" });
    editScenePopup.addButton({ type:"cancel", text:"Cancel" });

    if (Pano.mode >= 2) {
      editScenePopup.addButton({ text:"Choose Image", callback:"Toolkit.ShowImagePicker", closeOnClick:false });
    }

    editScenePopup.show();

  }


  this.ShowDeleteScenePopup = function () {

    var myMessage = "This will remove the current scene.";
    myMessage += "<br /><br />The database is not updated until you save.";

    var del = new Popup({ title:"Delete?", text:myMessage });
    del.addButton({ text:"OK", callback:"Toolkit.DeleteScene()" });
    del.addButton({ type:"cancel" });
    del.show();

  }


  this.ShowAddHotspotPopup = function () {

    this.AddHotspotPopup = new Popup({ title:"Add Hotspot" });
    this.AddHotspotPopup.addField({ label:"ID", id:"id" });
    this.AddHotspotPopup.addField({ label:"Link", id:"link" });
    this.AddHotspotPopup.addField({ label:"Title", id:"title" });

    var hsOptions = [ ["Red", "hotspot-red.png"],
                    ["Blue", "hotspot-blue.png"],
                    ["Green", "hotspot-green.png"],
                    ["Black", "hotspot-black.png"],
                    ["Orange", "hotspot-orange.png"],
                    ["Yellow", "hotspot-yellow.png"],
                    ["Purple", "hotspot-purple.png"] ];
    this.AddHotspotPopup.addField({ label:"Image", id:"image", value:this.img, type:"select", options:hsOptions });

    this.AddHotspotPopup.addField({ label:"Lat", id:"lat", type:"number" });
    this.AddHotspotPopup.addField({ label:"Lon", id:"lon", type:"number" });
    this.AddHotspotPopup.addButton({ text:"Add", callback:"Toolkit.AddHotspot" });
    this.AddHotspotPopup.addButton({ type:"cancel", text:"Close" });
    this.AddHotspotPopup.show();

  }


  this.ShowEditHotspotPopup = function (hs) {

    var hp = new Popup({ id:"hotspot-options", title:"Hotspot Options:" });
    hp.addField({ label:"ID", id:"id", value:hs.id });
    hp.addField({ label:"Link", id:"link", value:hs.link });
    hp.addField({ label:"Title", id:"title", value:hs.title });

    var hsOptions = [ ["Red", "hotspot-red.png"],
                    ["Blue", "hotspot-blue.png"],
                    ["Green", "hotspot-green.png"],
                    ["Black", "hotspot-black.png"],
                    ["Orange", "hotspot-orange.png"],
                    ["Yellow", "hotspot-yellow.png"],
                    ["Purple", "hotspot-purple.png"] ];
    hp.addField({ label:"Image", id:"image", value:hs.img, type:"select", options:hsOptions });

    hp.addField({ label:"Scene Lon", id:"sceneLon", type:"number", value:hs.sceneLon });
    hp.addField({ label:"Scene Lat", id:"sceneLat", type:"number", value:hs.sceneLat });

    hp.addButton({ text:"Navigate To", callback:"Toolkit.HotspotClicked" });
    hp.addButton({ text:"Update", callback:"Toolkit.UpdateHotspot" });
    hp.addButton({ text:"Show XML", callback:"Toolkit.ShowHotspotXML" });
    hp.addButton({ text:"Delete", callback:"Toolkit.ShowDeleteHotspotPopup"});
    hp.addButton({type:"cancel" });
    hp.show();

  }


  this.ShowDeleteHotspotPopup = function () {

    var myMessage = "This will remove the current hotspot.";
    myMessage += "<br /><br />The database is not updated until you save.";

    var del = new Popup({ title:"Delete?", text:myMessage });
    del.addButton({ text:"OK", callback:"Toolkit.DeleteHotspot()" });
    del.addButton({ type:"cancel" });
    del.show();

  }










  // ******** save and load panorama ********


  this.TrySave = function () {

    if (!Pano.name) {
      new Message({ text:"ERROR: Save aborted, name cannot be blank. Set name in Pano Info." });
      return false;
    }

    var myThis = this;

    $.ajax({
      url:"php/panoExists.php",
      type:"POST",
      data: { id:Pano.id }
    }).done(function (data) {

      var data = JSON.parse(data);

      if (data.result == "0") {
        myThis.Save();
      } else {
        myThis.ShowSaveConfirmPopup();
      }

    });

  }


  this.ShowSaveConfirmPopup = function () {

    var myMessage = "This will overwrite the currently saved Panorama: \"" + Pano.name + "\".";

    var del = new Popup({ title:"Overwrite?", text:myMessage });
    del.addButton({ text:"Overwrite", callback:"Toolkit.Save()" });
    del.addButton({ type:"cancel" });
    del.show();

  }


  this.Save = function () {

    var myXML = Pano.getXML();

    $.ajax({
      url:"php/savePano.php",
      type:"POST",
      data: { id:Pano.id, name:Pano.name, xml:myXML }
    }).done(function (data) {

      var data = JSON.parse(data);

      if (data.insertID) {
        Pano.id = data.insertID;
        new Message({ text:"New pano saved OK (" + data.insertID + ")" });
      } else if (data.result == "OK") {
        new Message({ text:"Pano " + Pano.id + " updated OK." });
      } else {
        new Message({ text:data.result });
      }

    });

  }  


  this.PanoExists = function (panoId) {

    var panoId = panoId || 0;

    $.ajax({
      url:"php/panoExists.php",
      type:"POST",
      data: { id:panoId }
    }).done(function (data) {

      var data = JSON.parse(data);
      return data.result;

    });

  }


  this.RefreshSaved = function () {

    $.ajax({
      url:"php/getSaved.php"
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

        Pano.initDBLoad();
        var data = JSON.parse(data);
        Pano.id = data.id;
        Pano.name = data.name;
        Pano.scenes = [];
        Pano.parseXML(data.xml);

      }

    });

  }






  // ******** image picker ********

  this.ShowImagePicker = function () {

    this.ImagePicker = new ImagePicker();
    this.ImagePicker.show();

  }


  this.ChangeImage = function (img) {

    var el = document.getElementById("panosceneImage");
    el.value = img;

    this.ImagePicker.close();

  }





  // ******** image upload ********

  this.ShowUploadPopup = function () {

    this.Upload = new Upload({ title:"Upload File:", text:"Supported formats are jpg, jpeg, and png." });
    this.Upload.show();

  }


  this.CloseUploadPopup = function () {
    this.Upload.close();
  }







  // ******** delete panorama ********

  this.ShowDeletePopup = function () {

    var myMessage = "This will remove the currently loaded panorama data from the database.";
    myMessage += "<br /><br />This cannot be undone.";

    var del = new Popup({ title:"Delete?", text:myMessage });
    del.addButton({ text:"OK", callback:"Toolkit.DeletePano()" });
    del.addButton({ type:"cancel" });
    del.show();

  }


  this.DeletePano = function () {

    if (!Pano.id) {
      new Message({ text:"ERROR: No database panorama loaded." });
    } else {

      $.ajax({
        url:"php/deletePano.php",
        type:"POST",
        data: { id:Pano.id }
      }).done(function (data) {

        if (data == "OK") {

          new Message ({ text:"Panorama deleted OK. Loading default...." });
          Pano.id = 0;
          Pano.name = "";
          Pano.scenes = [];
          Pano.loadXML();
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
      data:{ id:Pano.id, filename:Pano.name }
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


  this.ViewPublished = function () {

    var myURL = "published/" + Pano.name + "/index.html";

    $.ajax({
      url:myURL
    }).done(function (data) {
      window.open(myURL, "_blank");
    }).error(function (err) {
      new Message({ text:"ERROR: " + myURL + " does not exist." });
    });


  }









}

















//
