
var Pano;
var Toolkit;

// if debugMode = true, the panorama can be edited
var debugMode = (typeof debugMode === 'undefined') ? false : debugMode;

// if onlineMode = true, the code which connects to a MySQL database and saves the panoramas is enabled
var onlineMode = (typeof onlineMode === 'undefined') ? false : onlineMode;


if (debugMode) {

  var h = '<script src="classPopup.js"></script>';
  h += '<script src="classMessage.js"></script>';
  h += '<script src="classToolkit.js"></script>';

  if (onlineMode) {
    //h += '<script src="libOnline.js"></script>';
    h += '<script src="classUpload.js"></script>';
    h += '<script src="classImagePicker.js"></script>';
  }

  document.write(h);

}

var resizeCanvas = true;
var WIDTH = 800; // these display sizes are used if resizeCanvas = false;
var HEIGHT = 600; // size for Storyline, 980 x 524
var preloadImages = false;

var mouse = {};
mouse.x = 0;
mouse.y = 0;

var container, camera, scene, renderer, mesh; //TODO, move these to Pano? - mesh not used in global context







function initVars ()
{

  Pano = new Pano(); // global ref must me called pano, TODO: change this to Pano
  if (debugMode) { Toolkit = new Toolkit(); }

}




function loadXML ()
{

  $.ajax({
    url:"scenes.xml",
    type:"GET",
    dataType:"xml"
  }).done(function (data) { parseXML(data); });

}




function parseXML (data)
{

  console.log("XML loaded, parsing....");

  $(data).find("scene").each(function () {

    var id = $(this).attr("id");
    var img = $(this).attr("image");
    var lon = parseFloat($(this).attr("lon"));
    var lat = parseFloat($(this).attr("lat"));
    var isHomeScene = $(this).attr("isHomeScene");

    var panoScene = new PanoScene({ id:id, texture:img, lon:lon, lat:lat, isHomeScene:isHomeScene });

    $(this).find("hotspot").each(function () {

      var args = {};
      args.id = $(this).attr("id");
      args.link = $(this).attr("link");
      args.title = $(this).attr("title");
      args.lon = parseFloat($(this).attr("lon"));
      args.lat = parseFloat($(this).attr("lat"));
      args.sceneLon = parseFloat($(this).attr("sceneLon"));
      args.sceneLat = parseFloat($(this).attr("sceneLat"));

      panoScene.addHotspot(args);

    });

    Pano.scenes.push(panoScene);

  });

  if (debugMode) { Toolkit.AddSceneLinks(); }

  Pano.home();

}




function animate ()
{

  window.requestAnimationFrame(animate);

  checkControls();
  positionCamera();

  renderer.render(scene, camera);

  positionOverlays();

}



function positionCamera ()
{
  camera.rotation.set(0, toRads(Pano.lon), 0);
  camera.rotateX(-toRads(Pano.lat));
}


function toRads (ang) { return (ang / 180) * Math.PI; }


function init (loadDatabaseData)
{

  var loadDatabaseData = loadDatabaseData || false;

  if (resizeCanvas) {
    resizeMe();
  } else {
    $('#my-container').width(WIDTH);
    $('#my-container').height(HEIGHT);
  }

  if (debugMode) { Toolkit.Init(); }

  container = document.getElementById('my-canvas-container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( Pano.fovIni, WIDTH / HEIGHT, 1, 1100);
  camera.target = new THREE.Vector3(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  renderer.domElement.id = 'my-canvas';

  container.appendChild(renderer.domElement);

  // add environment sphere and apply texture
  var geometry = new THREE.SphereBufferGeometry(Pano.length, 60, 40);
  geometry.scale(-1, 1, 1);

  var texture = new THREE.Texture();
  Pano.material = new THREE.MeshBasicMaterial({ map:texture });
  Pano.mesh = new THREE.Mesh( geometry, Pano.material );
  Pano.mesh.rotation.y = THREE.Math.degToRad(90); // so it starts in the center

  scene.add(Pano.mesh);

  // window resize event
  if (resizeCanvas) { window.addEventListener('resize', function (e) { resizeMe(); }); }

  var canvasEl = document.getElementById("my-canvas-container"); // ("my-container");

  // mouse event handlers
  canvasEl.addEventListener('mousedown', function (e) { panoClicked(e); });
  document.addEventListener('mousemove', function (e) { eventMove(e); });
  document.addEventListener('mouseup', function (e) { eventStop(e); });
  document.addEventListener('wheel', function (e) { eventWheel(e); });

  // touch event handlers
  canvasEl.addEventListener('touchstart', panoClicked);
  canvasEl.addEventListener('touchmove', eventMove);
  canvasEl.addEventListener('touchend', eventStop);

  if (loadDatabaseData) {
    loadFromDatabase(5);
  } else {
    loadXML();
  }


  animate();

}




function checkControls ()
{

  if (Pano.activeControl) { Pano.active = false; }

  if (Pano.activeControl == 'move-left') { Pano.lon += 1; }
  else if (Pano.activeControl == 'move-right') { Pano.lon -= 1; }
  else if (Pano.activeControl == 'move-up') { Pano.lat -= 1; }
  else if (Pano.activeControl == 'move-down') { Pano.lat += 1; }
  else if (Pano.activeControl == 'zoom-in') {
    var fov = camera.fov - 1;
    camera.fov = THREE.Math.clamp(fov, Pano.fovMin, Pano.fovMax);
    camera.updateProjectionMatrix();
  }
  else if (Pano.activeControl == 'zoom-out') {
    var fov = camera.fov + 1;
    camera.fov = THREE.Math.clamp(fov, Pano.fovMin, Pano.fovMax);
    camera.updateProjectionMatrix();
  }

  if (Pano.autoRotate) { Pano.lon -= 0.4; }

  if (Pano.lat > Pano.latMax) { Pano.lat = Pano.latMax; }
  if (Pano.lat < -Pano.latMax) { Pano.lat = -Pano.latMax; }
  if (Pano.lon < 0) { Pano.lon += 360; }
  if (Pano.lon > 360) { Pano.lon -= 360; }

}




function ToggleHelp ()
{
  $("#help").toggle();
}







function enterFullscreen ()
{

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen(); // Firefox
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen(); // Chrome and Safari
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen(); // IE
  }

}



function exitFullscreen ()
{

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }

}






function positionOverlays ()
{

  if (!Pano.loadedScene) { return false; }

  for (var i = 0; i < Pano.loadedScene.hotspots.length; i++) {

    var hs = Pano.loadedScene.hotspots[i];
    hs.animate();

  }

}




function resizeMe ()
{
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  $('#my-container').width(WIDTH);
  $('#my-container').height(HEIGHT);
  $('#my-canvas').width(WIDTH);
  $('#my-canvas').height(HEIGHT);

  // move controls
  var cL = $("#controls-container").width();
  var cL = (WIDTH / 2) - (cL / 2);
  $("#controls-container").css({ 'left': cL + 'px' });

}






function panoClicked (e)
{

  e.preventDefault();

  // need to re-capture mouse for touch eventStop
  try {
    mouse.x = e.clientX || e.touches[0].clientX;
    mouse.y = e.clientY || e.touches[0].clientY;
  } catch (err) {
  }

  Pano.active = true;

  if (e.touches) {
    Pano.speedMultiplier = Pano.touchSpeed;
  } else {
    Pano.speedMultiplier = Pano.mouseSpeed;
  }

  Pano.clickedX = mouse.x;
  Pano.clickedY = mouse.y;

  Pano.clickedLon = Pano.lon;
  Pano.clickedLat = Pano.lat;

}



function eventMove (e)
{

  //e.preventDefault(); // this was stopping the selecting of text in a popup

  try {
    mouse.x = e.clientX || e.touches[0].clientX;
    mouse.y = e.clientY || e.touches[0].clientY;
  } catch (err) {}

  if (!Pano.loadedScene) { return false; }

  if (Pano.active) { Pano.updatePosition(); }

  for (var i = 0; i < Pano.loadedScene.hotspots.length; i++) {
    if (Pano.loadedScene.hotspots[i].beingDragged) {
      Pano.loadedScene.hotspots[i].eventMove();
    }
  }

}



function eventStop (e)
{

  //e.preventDefault(); // is this needed?
  Pano.activeControl = false;
  var clickTolerance = 2;
  Pano.active = false;

  for (var i = 0; i < Pano.loadedScene.hotspots.length; i++) {
    Pano.loadedScene.hotspots[i].beingDragged = false;
  }

  if ((Math.abs(Pano.clickedX - mouse.x) <= clickTolerance) && (Math.abs(Pano.clickedY - mouse.y) <= clickTolerance)) {
    eventClick(e);
  }

}



function eventWheel (e)
{
  var fov = camera.fov + (event.deltaY * 0.05);
  camera.fov = THREE.Math.clamp(fov, Pano.fovMin, Pano.fovMax);
  camera.updateProjectionMatrix();
}




function eventClick (e)
{
}









// ******** index.html buttons ******** //

function toggleFullscreen ()
{

  if (!document.fullscreenElement && !document.mozFullScreenElement
    && !document.webkitFullscreenElement && !document.msFullscreenElement ) {

    enterFullscreen();

  } else {

    exitFullscreen();

  }

}











// functions to get and set variable in Articulate Storyline
function getStorylineVar (varName)
{
  try {
    var p = parent.GetPlayer();
    return p.GetVar(varName);
  } catch (err) {}
}


function setStorylineVar (varName, val)
{
  try {
    var p = parent.GetPlayer();
    p.SetVar(varName, val);
  } catch (err) {}
}









//
