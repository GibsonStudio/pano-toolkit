



var addHotspotPopup = new Popup({ title:"Add Hotspot" });
addHotspotPopup.addField({ label:"ID", id:"id" });
addHotspotPopup.addField({ label:"Link", id:"link" });
addHotspotPopup.addField({ label:"Title", id:"title" });
addHotspotPopup.addField({ label:"Lat", id:"lat", type:"number" });
addHotspotPopup.addField({ label:"Lon", id:"lon", type:"number" });
addHotspotPopup.addButton({ text:"Add", callback:"debugAddHotspot" });
addHotspotPopup.addButton({ type:"cancel", text:"Close" });


var addScenePopup = new Popup({ title:"Add Scene" });
addScenePopup.addField({ label:"ID", id:"id" });
addScenePopup.addField({ label:"Image", id:"image" });
addScenePopup.addField({ label:"Lat", id:"lat", type:"number" });
addScenePopup.addField({ label:"Lon", id:"lon", type:"number" });
addScenePopup.addButton({ text:"Add", callback:"debugAddScene" });
addScenePopup.addButton({ type:"cancel", text:"Close" });

var uploadPopup;
var imagePicker;


function iniDebug () {

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
  el.onclick = function () { debugToggle(); }

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
    el.onclick = function () { debugLoadToggle(); }

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
  h += '<button class="debugButton" onclick="debugShowPanoInfo();">Info</button>';
  h += '<button class="debugButton" onclick="debugGenerateXML();">Get XML</button>';

  if (onlineMode) {
    h += '<button class="debugButton" onclick="debugSave();">Save</button>';
    h += '<button class="debugButton" onclick="debugDeletePano();">Delete</button>';
    h += '<button class="debugButton" onclick="debugUploadImage();">Upload Image</button>';
    h += '<button class="debugButton" onclick="debugPublish();">Publish</button>';
  }

  h += '</div>';

  h += '<div style="border:1px solid #999999; margin-bottom:10px;">';
  h += '<div style="font-size:12px; font-weight:bold;">Scene</div>';
  h += '<button class="debugButton" onclick="addScenePopup.show();">Add</button>';
  h += '<button class="debugButton" onclick="editCurrentScene();">Edit</button>';
  if (onlineMode) { h += '<button class="debugButton" onclick="debugChangeImage();">Change Image</button>'; }
  h += '<button class="debugButton" onclick="debugSetScenePosition();">Set Position</button>';
  h += '<button class="debugButton" onclick="debugDeleteCurrentScene();">Delete Current</button>';
  h += '<button class="debugButton" onclick="addHotspotPopup.show();">Add Hotspot</button>';
  h += '</div>';

  h += '<hr />';

  h += '<table>';
  h += '<tr> <td class="fieldTitle">Lon:</td> <td><input id="debugLon" type="number" value="0" /></td> </tr>';
  h += '<tr> <td class="fieldTitle">Lat:</td> <td><input id="debugLat" type="number" value="0" /></td> </tr>';
  h += '</table>';
  h += '<button class="debugButton" onclick="debugStorePanoInfo();">Store Info</button>';

  el.innerHTML = h;

  dc.appendChild(el);



  //   debug container
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
  h += '<button class="debugButton" onclick="debugRefreshSaved();">Refresh</button>';

  el.innerHTML = h;

  dc.appendChild(el);


  debugAddSceneLinks();

}








function debugToggle ()
{
  var debug = document.getElementById("debug");
  var debugLoad = document.getElementById("debugLoad");
  debug.hidden = !debug.hidden;
  debugLoad.hidden = true;
}



function debugLoadToggle ()
{
  var debug = document.getElementById("debug");
  var debugLoad = document.getElementById("debugLoad");
  debugLoad.hidden = !debugLoad.hidden;
  debug.hidden = true;

  if (!debugLoad.hidden) {
    debugRefreshSaved();
  }

}









/*
function debugUploadImage ()
{

  var u = new Upload({ title:"My Title", text:"Some load of text.<br /><br />Please upload something...." });
  u.show();

}


function uploadMessage (txt)
{
  new Message({ text:txt });
}
*/




function debugStorePanoInfo ()
{
  document.getElementById("debugLon").value = pano.lon.toFixed(2);
  document.getElementById("debugLat").value = pano.lat.toFixed(2);
}


function debugSetScenePosition ()
{
  pano.loadedScene.lon = parseFloat(pano.lon.toFixed(2));
  pano.loadedScene.lat = parseFloat(pano.lat.toFixed(2));
  new Message({ text:"Scene position updated OK" });
}



function debugShowPanoInfo ()
{

  var data = "Loaded Scene ID: " + pano.loadedScene.id + "\n";
  data +='lon="' + pano.lon.toFixed(2) + '" ';
  data += 'lat="' + pano.lat.toFixed(2) + '"';

  var panoPopup = new Popup({ title:"Pano Info", width:"400px" });
  panoPopup.addField({ label:"name:", id:"name", value:pano.name });
  panoPopup.addField({ label:"info", id:"info", type:"textarea", value:data });
  panoPopup.addButton({ text:"Update", callback:"debugUpdatePano" });
  panoPopup.addButton({ type:"cancel" });
  panoPopup.show();

}



function debugUpdatePano (args)
{

  if (args.name) {
    pano.name = args.name;
    new Message({ text:"Pano updated OK" });
  }

}


function debugAddSceneLinks ()
{

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





function editCurrentScene ()
{

  var editScenePopup = new Popup({ title:"Edit Scene" });
  editScenePopup.addField({ label:"ID", id:"id", value:pano.loadedScene.id });
  editScenePopup.addField({ label:"Image", id:"texture", value:pano.loadedScene.texture });
  editScenePopup.addField({ label:"Lon", id:"lon", type:"number", value:pano.loadedScene.lon });
  editScenePopup.addField({ label:"Lat", id:"lat", type:"number", value:pano.loadedScene.lat });
  editScenePopup.addField({ label:"Is Home Scene:", id:"isHomeScene", type:"checkbox", value:pano.loadedScene.isHomeScene });
  editScenePopup.addButton({ text:"Save", callback:"editScene" });
  editScenePopup.addButton({ type:"cancel", text:"Cancel" });
  editScenePopup.show();

}


function editScene (args)
{

  var args = args || {};
  pano.loadedScene.id = args.id ? args.id : pano.loadedScene.id;
  pano.loadedScene.texture = args.texture ? args.texture : pano.loadedScene.texture;
  pano.loadedScene.lon = args.lon ? parseFloat(args.lon) : pano.loadedScene.lon;
  pano.loadedScene.lat = args.lat ? parseFloat(args.lat) : pano.loadedScene.lat;

  if (args.isHomeScene) { pano.clearHomeScene(); }
  pano.loadedScene.isHomeScene = args.isHomeScene ? args.isHomeScene : false;

  // reload scene?
  debugAddSceneLinks();
  pano.loadedScene.loadTexture();

}



function debugAddScene (args)
{

  var args = args || {};

  var myID = args.id ? args.id : "scene-" + Math.round(Math.random() * 100000);
  var myImage = args.image ? args.image : "";
  var myLon = args.lon ? parseFloat(args.lon) : 0;
  var myLat = args.lat ? parseFloat(args.lat) : 0;

  var panoScene = new PanoScene({ id:myID, texture:myImage, lon:myLon, lat:myLat });
  pano.scenes.push(panoScene);

  debugAddSceneLinks();

}





function debugDeleteCurrentScene ()
{

  var sceneCount = pano.scenes.length;
  if (sceneCount < 2) { return false; }

  var sIndex = pano.scenes.indexOf(pano.loadedScene);

  pano.scenes.splice(sIndex, 1);
  debugAddSceneLinks();
  pano.scenes[0].load();

}



function debugAddHotspot (args)
{

   var args = args || {};

   var myID = args.id ? args.id : "hs-" + Math.round(Math.random() * 100000);
   var myLink = args.link ? args.link : "";
   var myTitle = args.title ? args.title : "";
   var myLon = args.lon ? parseFloat(args.lon) : 180 - pano.lon;
   var myLat = args.lat ? parseFloat(args.lat) : -pano.lat;

   pano.loadedScene.addHotspot({ id:myID, link:myLink, title:myTitle, lon:myLon, lat:myLat }, true);

}





function debugGenerateXML ()
{

  var xml = pano.getXML();
  var xmlPopup = new Popup({ title:"XML data for scenes.xml", width:"500px" });
  xmlPopup.addField({ label:"xml", id:"xml", type:"textarea", value:xml, height:"300px" });
  xmlPopup.addButton({ type:"cancel" });
  xmlPopup.show();

}




function panoHotspotClicked () {
  pano.clickedHotspot.clicked();
}





function panoHotspotUpdate (args) {

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




function panoHotspotDelete (args)
{
  pano.clickedHotspot.delete();
}



function panoHotspotShowXML ()
{

  var xml = pano.clickedHotspot.getXML();
  var xmlPopup = new Popup({ title:"XML data for hotspot", width:"500px" });
  xmlPopup.addField({ label:"xml", id:"xml", type:"textarea", value:xml, height:"300px" });
  xmlPopup.addButton({ type:"cancel" });
  xmlPopup.show();

}

















//
