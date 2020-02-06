
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


function initVars () {

  Pano = new Pano();
  if (debugMode) { Toolkit = new Toolkit(); }

}


function toRads (ang) { return (ang / 180) * Math.PI; }


function ToggleHelp () {
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





function resizeMe ()
{

  Pano.WIDTH = window.innerWidth;
  Pano.HEIGHT = window.innerHeight;
  $('#my-container').width(Pano.WIDTH);
  $('#my-container').height(Pano.HEIGHT);
  $('#my-canvas').width(Pano.WIDTH);
  $('#my-canvas').height(Pano.HEIGHT);

  // move controls
  var cL = $("#controls-container").width();
  var cL = (Pano.WIDTH / 2) - (cL / 2);
  $("#controls-container").css({ 'left': cL + 'px' });

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
