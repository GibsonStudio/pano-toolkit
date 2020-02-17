

//TODO: menu - put add hotspot into its own section
//TODO: change hotspot icon to a smaller, solid icon





//bugs



function Pano (args) {

  var args = args || {};
  this.id = args.id || 0;
  this.name = args.name || "";
  this.mode = args.mode || 0; // 0 = runtime, 1 = offline edit, 2 = online edit
  this.active = args.active || false;
  this.clickedX = args.clickedX || 0;
  this.clickedY = args.clickedY || 0;
  this.lon = args.lon || 0;
  this.lat = args.lat || 0;
  this.length = args.length || 500;
  this.clickedLon = args.clickedLon || 0;
  this.clickedLat = args.clickedLat || 0;
  this.latMax = args.latMax || 85;

  this.autoRotate = false;
  this.mouseSpeed = 0.1; // 0.2
  this.touchSpeed = 0.1;
  this.speedMultiplier = args.speedMultiplier || this.mouseSpeed;
  this.fovMin = args.fovMin || 35;
  this.fovMax = args.fovMax || 90;
  this.fovIni = args.fovIni || 75;
  this.loadedScene = args.loadedScene || false;
  this.activeControl = false;
  this.scenes = [];
  this.mesh = false;
  this.material = false;
  this.clickedHotspot = false;

  this.resize = typeof args.resize === "undefined" ? true : args.resize;
  this.WIDTH = args.WIDTH || 980; // these display sizes are used if resizeCanvas = false;
  this.HEIGHT = args.HEIGHT || 524; // size for Storyline, 980 x 524

  this.mouse = {};
  this.mouse.x = 0;
  this.mouse.y = 0;


  this.container = false;
  this.camera = false;
  this.scene= false;
  this.renderer = false;


  this.init = function (loadDatabaseID) {

    var loadDatabaseID = loadDatabaseID || false;

    if (this.resize) {
      resizeMe();
    } else {
      $('#my-container').width(this.WIDTH);
      $('#my-container').height(this.HEIGHT);
    }

    if (Pano.mode >= 1) { Toolkit.Init(); }

    this.container = document.getElementById('my-canvas-container');

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( this.fovIni, this.WIDTH / this.HEIGHT, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(Pano.WIDTH, Pano.HEIGHT);
    this.renderer.domElement.id = 'my-canvas';

    this.container.appendChild(Pano.renderer.domElement);

    // add environment sphere and apply texture
    var geometry = new THREE.SphereBufferGeometry(this.length, 60, 40);
    geometry.scale(-1, 1, 1);

    var texture = new THREE.Texture();
    this.material = new THREE.MeshBasicMaterial({ map:texture });
    this.mesh = new THREE.Mesh( geometry, this.material );
    this.mesh.rotation.y = THREE.Math.degToRad(90); // so it starts in the center

    this.scene.add(this.mesh);

    // window resize event
    if (this.resize) { window.addEventListener('resize', function (e) { resizeMe(); }); }

    var canvasEl = document.getElementById("my-canvas-container");

    // mouse event handlers
    canvasEl.addEventListener('mousedown', function (e) { Pano.clicked(e); });
    document.addEventListener('mousemove', function (e) { Pano.eventMove(e); });
    document.addEventListener('mouseup', function (e) { Pano.eventStop(e); });
    document.addEventListener('wheel', function (e) { Pano.eventWheel(e); });

    // touch event handlers
    canvasEl.addEventListener('touchstart', Pano.clicked);
    canvasEl.addEventListener('touchmove', Pano.eventMove);
    canvasEl.addEventListener('touchend', Pano.eventStop);

    if (loadDatabaseID) {
      Toolkit.LoadFromDatabase(loadDatabaseID);
    } else {
      this.loadXML();
    }

    this.animate();

  }


  this.initDBLoad = function () {

    console.log("init");

    this.id = 0;
    this.name = "";
    this.active = false;
    this.scenes = [];
    this.clickedHotspot = false;

  }


  this.load = function (panoSceneID, args) {

    var args = args || {};
    var clickedHotspot = args.clickedHotspot || {};

    var panoScene = this.getSceneById(panoSceneID);
    panoScene.load({ clickedHotspot:clickedHotspot });

  }


  this.loadXML = function () {

    var myThis = this;

    $.ajax({
      url:"scenes.xml",
      type:"GET",
      dataType:"xml"
    }).done(function (data) { myThis.parseXML(data); });
  }


  this.parseXML = function (data) {

    console.log("XML loaded, parsing....");

    $(data).find("scene").each(function () {

      var id = $(this).attr("id");
      var displayName = $(this).attr("displayName");
      var img = $(this).attr("image");
      var lon = parseFloat($(this).attr("lon"));
      var lat = parseFloat($(this).attr("lat"));
      var isHomeScene = $(this).attr("isHomeScene");

      var panoScene = new PanoScene({ id:id, displayName:displayName, texture:img, lon:lon, lat:lat, isHomeScene:isHomeScene });

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

    if (Pano.mode >= 1) { Toolkit.AddSceneLinks(); }

    this.addMenuLinks();

    Pano.home();

  }


  this.addMenuLinks = function () {

    var cont = document.getElementById("pano-menu");
    cont.innerHTML = "";

    for (var i = 0; i < this.scenes.length; i++) {

      if (this.scenes[i].displayName) {

        var el = document.createElement("div");
        el.style.setProperty("font-size", "12px");
        el.style.setProperty("padding", "4px");
        el.style.setProperty("cursor", "pointer");
        el.innerHTML = this.scenes[i].displayName;

        el.sceneId = this.scenes[i].id;
        var myThis = this;
        el.onclick = function () { myThis.load(this.sceneId); }

        cont.appendChild(el);

      }

    }

    if (cont.innerHTML == "") { $("#menu").hide(); }
    else { $("#menu").show(); }

  }


  this.animate = function () {

    var myThis = this;

    window.requestAnimationFrame(function () { myThis.animate(); });

    this.checkControls();
    this.positionCamera();

    this.renderer.render(this.scene, this.camera);

    this.positionOverlays();

  }


  this.checkControls = function () {

    if (this.activeControl) { this.active = false; }

    if (this.activeControl == 'move-left') { this.lon += 1; }
    else if (this.activeControl == 'move-right') { this.lon -= 1; }
    else if (this.activeControl == 'move-up') { this.lat -= 1; }
    else if (this.activeControl == 'move-down') { this.lat += 1; }
    else if (this.activeControl == 'zoom-in') {
      var fov = this.camera.fov - 1;
      this.camera.fov = THREE.Math.clamp(fov, this.fovMin, this.fovMax);
      this.camera.updateProjectionMatrix();
    }
    else if (this.activeControl == 'zoom-out') {
      var fov = this.camera.fov + 1;
      this.camera.fov = THREE.Math.clamp(fov, this.fovMin, this.fovMax);
      this.camera.updateProjectionMatrix();
    }

    if (this.autoRotate) { this.lon -= 0.4; }

    if (this.lat > this.latMax) { this.lat = this.latMax; }
    if (this.lat < -this.latMax) { this.lat = -this.latMax; }
    if (this.lon < 0) { this.lon += 360; }
    if (this.lon > 360) { this.lon -= 360; }

  }


  this.positionCamera = function () {
    this.camera.rotation.set(0, toRads(this.lon), 0);
    this.camera.rotateX(-toRads(this.lat));
  }


  this.positionOverlays = function () {

    if (!this.loadedScene) { return false; }

    for (var i = 0; i < this.loadedScene.hotspots.length; i++) {

      var hs = this.loadedScene.hotspots[i];
      hs.animate();

    }

  }


  this.getSceneById = function (sceneID) {

    for (var i = 0; i < this.scenes.length; i++) {
      var p = this.scenes[i];
      if (p.id == sceneID) { return this.scenes[i]; }
    }

    return {};

  }


  this.getSceneIndexById = function (sceneID) {

    for (var i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].id == sceneID) { return i; }
    }

    return 0;

  }


  this.updatePosition = function () {

    var dx = this.mouse.x - this.clickedX;
    this.lon = this.clickedLon + (dx * this.speedMultiplier);

    var dy = this.clickedY - this.mouse.y;
    this.lat = Pano.clickedLat + (dy * this.speedMultiplier);
    this.lat = Math.max(Math.min(this.lat, this.latMax), -this.latMax);

  }


  this.getPosition = function (thisLon, thisLat) {

    var p = {};
    var hL = Math.cos(THREE.Math.degToRad(thisLat)) * Pano.length;
    p.x = -Math.sin(THREE.Math.degToRad(thisLon)) * hL;
    p.y = Math.sin(THREE.Math.degToRad(thisLat)) * Pano.length;
    p.z = Math.cos(THREE.Math.degToRad(thisLon)) * hL;
    return p;

  }


  this.toScreenPosition = function (myPos, cam) {

    var pos = new THREE.Vector3(myPos[0], myPos[1], myPos[2]);
    var vec = pos.project(cam);

    var myX = (vec.x + 1) / 2 * this.WIDTH;
    var myY = -(vec.y - 1) / 2 * this.HEIGHT;

    if (vec.z > 1) {
      myX = -200;
      myY = -200;
    }

    return { x: myX, y: myY };

  }


  this.toggleAutorotate = function () {
    this.autoRotate = !this.autoRotate;
  }


  this.getXML = function () {

    var xml = '<?xml version="1.0" encoding="utf-8" ?>' + "\n\n";
    xml += '<scenes>' + "\n\n";

    for (var i = 0; i < this.scenes.length; i++) {

      var s = this.scenes[i];

      var sceneTag = '<scene id="' + s.id + '" image="' + s.texture + '" lon="' + s.lon + '" lat="' + s.lat + '"';
      if (s.isHomeScene) { sceneTag  += ' isHomeScene="true"'; }
      if (s.displayName) { sceneTag += ' displayName="' + s.displayName + '"'; }
      sceneTag += '>';

      xml += "\t" + sceneTag + "\n";

      for (var j = 0; j < this.scenes[i].hotspots.length; j++) {

         xml += "\t\t";
         xml += this.scenes[i].hotspots[j].getXML();
         xml += "\n";

      }

      xml += "\t</scene>\n\n";

    }

    xml += "</scenes>";

    return xml;

  }


  this.getHomeSceneIndex = function () {

    for (var i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].isHomeScene) { return i; }
    }

    return 0;

  }


  this.home = function () {

    this.scenes[this.getHomeSceneIndex()].load();

  }


  this.sortScenes = function () {

    this.scenes.sort(function (a, b) {
      a = a.id.toLowerCase();
      b = b.id.toLowerCase();
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      return 0;
    });

  }


  this.clearHomeScene = function () {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].isHomeScene = false;
    }
  }


  this.clicked = function (e) {

    e.preventDefault();

    // need to re-capture mouse for touch eventStop
    try {
      this.mouse.x = e.clientX || e.touches[0].clientX;
      this.mouse.y = e.clientY || e.touches[0].clientY;
    } catch (err) {
    }

    this.active = true;

    if (e.touches) {
      this.speedMultiplier = this.touchSpeed;
    } else {
      this.speedMultiplier = this.mouseSpeed;
    }

    this.clickedX = this.mouse.x;
    this.clickedY = this.mouse.y;

    this.clickedLon = this.lon;
    this.clickedLat = this.lat;

  }


  this.eventMove = function (e) {

    try {
      this.mouse.x = e.clientX || e.touches[0].clientX;
      this.mouse.y = e.clientY || e.touches[0].clientY;
    } catch (err) {}

    if (!this.loadedScene) { return false; }

    if (this.active) { this.updatePosition(); }

    for (var i = 0; i < this.loadedScene.hotspots.length; i++) {
      if (this.loadedScene.hotspots[i].beingDragged) {
        this.loadedScene.hotspots[i].eventMove();
      }
    }

  }


  this.eventStop = function (e) {

    this.activeControl = false;
    var clickTolerance = 2;
    this.active = false;

    for (var i = 0; i < this.loadedScene.hotspots.length; i++) {
      this.loadedScene.hotspots[i].beingDragged = false;
    }

    //if ((Math.abs(this.clickedX - mouse.x) <= clickTolerance) && (Math.abs(this.clickedY - mouse.y) <= clickTolerance)) {
    //  eventClick(e);
    //}

  }


  this.eventWheel = function (e) {
    var fov = this.camera.fov + (event.deltaY * 0.05);
    this.camera.fov = THREE.Math.clamp(fov, this.fovMin, Pano.fovMax);
    this.camera.updateProjectionMatrix();
  }



}



function PanoScene (args) {

  var args = args || {};
  this.id = args.id || 'pano-scene';
  this.displayName = args.displayName || '';
  this.texture = args.texture || this.id + '.jpg';
  this.hotspots = args.hotspots || [];
  this.lat = args.lat || 0;
  this.lon = args.lon || 0;
  this.isHomeScene = args.isHomeScene || false;

  this.tx = false;
  this.loader = false;


  this.loadTexture = function (args) {

    var args = args || {};
    var clickedHotspot = args.clickedHotspot || {};
    var myThis = this;
    $("#loading-message").show();

    this.loader = new THREE.TextureLoader().load('img\\' + this.texture, function (texture) {
      myThis.tx = texture;
      Pano.material.map = myThis.tx;
      myThis.ini({ clickedHotspot:clickedHotspot });
      $("#loading-message").hide();
    });

  }


  this.getHotspotById = function (id) {
    for (var i = 0; i < this.hotspots.length; i++) {
      if (this.hotspots[i].id == id) { return this.hotspots[i]; }
    }
    return false;
  }


  this.load = function (args) {

    var args = args || {};
    var clickedHotspot = args.clickedHotspot || {};
    $("#my-overlays").html("");

    // load scene texture?
    if (!this.tx) {
      this.loadTexture({ clickedHotspot:clickedHotspot });
    } else {
      Pano.material.map = this.tx;
      this.ini({ clickedHotspot:clickedHotspot });
    }

  }


  this.ini = function (args) {

    var args = args || {};
    var clickedHotspot = args.clickedHotspot || {};

    // move to default position
    Pano.lat = this.lat;
    Pano.lon = this.lon;

    // override position with hotspot data?
    if (clickedHotspot.sceneLon) { Pano.lon = clickedHotspot.sceneLon; }
    if (clickedHotspot.sceneLat) { Pano.lat = clickedHotspot.sceneLat; }

    // reset zoom (camera fov)
    Pano.camera.fov = Pano.fovIni;
    Pano.camera.updateProjectionMatrix();

    this.addHotspots();

    Pano.loadedScene = this;

  }


  this.addHotspots = function () {

    for (var i = 0; i < this.hotspots.length; i++) {
      this.hotspots[i].addToOverlays();
    }

  }


  this.addHotspot = function (args, addToOverlays) {

    var args = args || {};
    var addToOverlays = addToOverlays || false;
    var hs = new PanoHotspot(args);

    this.hotspots.push(hs);

    if (addToOverlays) { hs.addToOverlays(); }

  }



}


function PanoHotspot (args) {

  var args = args || {};
  this.id = args.id || 'hotspot-' + Math.round(Math.random() * 100000);
  this.link = args.link || this.id;

  this.img = args.img || 'hotspot-red.png';
  this.imgW = args.imgW || 50;
  this.imgH = args.imgH || 50;
  this.imgCursor = args.imgCursor || 'pointer';
  this.title = args.title || '';

  this.lat = args.lat || 0;
  this.lon = args.lon || 0;
  this.sceneLon = args.sceneLon || 0;
  this.sceneLat = args.sceneLat || 0;

  this.beingDragged = false;
  this.distanceFromOrigin = args.distanceFromOrigin || 500;

  this.clickedX = args.clickedX || 0;
  this.clickedY = args.clickedY || 0;
  this.clickedLon = args.clickedLon || 0;
  this.clickedLat = args.clickedLat || 0;
  this.latMax = args.latMax || 85;
  this.speedMultiplier = 0.1;

  var p = Pano.getPosition(this.lon, this.lat);
  this.position = [p.x, p.y, p.z];


  this.addToOverlays = function () {

    if (document.getElementById("overlay-" + this.id)) { return false; }

    var el = document.createElement("div");
    el.id = "overlay-" + this.id;

    el.style.setProperty("width", this.imgW + "px");
    el.style.setProperty("height", this.imgH + "px");
    el.style.setProperty("background-image", "url(img-system/" + this.img + ")");
    el.style.setProperty("background-size", "100% 100%");
    el.style.setProperty("position", "absolute");
    el.style.setProperty("left", "100px");
    el.style.setProperty("top", "100px");
    if (this.imgCursor) { el.style.setProperty("cursor", this.imgCursor); }

    if (this.title) { el.title = this.title; }
    var myThis = this;

    if (Pano.mode >= 1) {
      el.onmouseup = function (event) { myThis.mouseUpMe(event); }
      el.onmousedown = function (event) { myThis.mouseDownMe(event); }
    } else {
      el.onmousedown = function (event) { myThis.clicked(event); }
    }

    document.getElementById("my-overlays").appendChild(el);

  }


  this.getXML = function () {

    var xml = '<hotspot id="' + this.id + '" ';
    xml += 'lon="' + (this.lon).toFixed(2) + '" ';
    xml += 'lat="' + (this.lat).toFixed(2) + '" ';
    if (this.title) { xml += 'title="'+ this.title + '" '; }
    if (this.link && this.link != this.id) { xml += 'link="'+ this.link + '" '; }
    if (this.sceneLat) { xml += 'sceneLat="'+ this.sceneLat + '" '; }
    if (this.sceneLon) { xml += 'sceneLon="'+ this.sceneLon + '" '; }
    xml += '></hotspot>';

    return xml;

  }


  this.delete = function () {

    // remove object
    for (var i = 0; Pano.loadedScene.hotspots.length; i++) {
      if (Pano.loadedScene.hotspots[i] == this) {
        Pano.loadedScene.hotspots.splice(i, 1);
        break;
      }
    }

    // remove html element
    var hel = document.getElementById("overlay-" + this.id);
    document.getElementById("my-overlays").removeChild(hel);

  }


  this.clicked = function () {
    Pano.load(this.link, { clickedHotspot:this });
  }


  this.mouseUpMe = function (e) {

    this.beingDragged = false;

    try {
      Pano.mouse.x = e.clientX || e.touches[0].clientX;
      Pano.mouse.y = e.clientY || e.touches[0].clientY;
    } catch (err) {
      console.log("Event ERROR");
    }

    if (Pano.mouse.x == this.clickedX && Pano.mouse.y == this.clickedY) {

      if (Pano.mode >= 1) {

        Pano.clickedHotspot = this;
        var hp = new Popup({ id:"hotspot-options", title:"Hotspot Options:" });
        hp.addField({ label:"ID", id:"id", value:this.id });
        hp.addField({ label:"Link", id:"link", value:this.link });
        hp.addField({ label:"Title", id:"title", value:this.title });
        hp.addField({ label:"Scene Lon", id:"sceneLon", type:"number", value:this.sceneLon });
        hp.addField({ label:"Scene Lat", id:"sceneLat", type:"number", value:this.sceneLat });

        hp.addButton({ text:"Navigate To", callback:"Toolkit.HotspotClicked" });
        hp.addButton({ text:"Update", callback:"Toolkit.UpdateHotspot" });
        hp.addButton({ text:"Show XML", callback:"Toolkit.ShowHotspotXML" });
        hp.addButton({ text:"Delete", callback:"Toolkit.ShowDeleteHotspotPopup"});
        hp.addButton({type:"cancel" });
        hp.show();

      } else {
        Pano.load(this.link, { clickedHotspot:this });
      }

    }

  }


  this.mouseDownMe = function (e) {

    if (Pano.mode == 0) { return false; }

    e.preventDefault();

    try {
      Pano.mouse.x = e.clientX || e.touches[0].clientX;
      Pano.mouse.y = e.clientY || e.touches[0].clientY;
    } catch (err) {
      console.log("Event ERROR");
    }

    this.clickedX = Pano.mouse.x;
    this.clickedY = Pano.mouse.y;

    this.clickedLon = this.lon;
    this.clickedLat = this.lat;

    this.beingDragged = true;

  }

  // called by requestAnimationFrame in lib.js
  this.animate = function () {

    // is it being dragged?
    if (this.beingDragged) {
      var p = Pano.getPosition(this.lon, this.lat);
      this.position = [p.x, p.y, p.z];
    }

    this.positionMyElement();

  }

  // positions the html element on the screen
  this.positionMyElement = function () {

    var pos = Pano.toScreenPosition(this.position, Pano.camera);
    var xPos = pos.x - (50 / 2);
    var yPos = pos.y - (50 / 2);
    $('#overlay-' + this.id).css({ 'left': xPos + 'px', 'top': yPos + 'px' });

  }


  this.eventMove = function () {

    var dx = Pano.mouse.x - this.clickedX;
    this.lon = this.clickedLon + (dx * this.speedMultiplier);

    var dy = this.clickedY - Pano.mouse.y;
    this.lat = this.clickedLat + (dy * this.speedMultiplier);
    this.lat = Math.max(Math.min(this.lat, this.latMax), -this.latMax);

  }


}












//
