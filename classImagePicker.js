




function ImagePicker (args) {

  var args = args || {};
  this.id = args.id || "popup-" + Math.round(Math.random() * 100000);
  this.title = args.title || "Choose Image:";
  this.text = args.text|| "";
  this.width = args.width || "480px";


  this.show = function () {

    // hide, if already visible
    if (document.getElementById(this.id)) { this.close(); }

    // modal
    var modal = this.createModalElement();
    document.body.appendChild(modal);

    // form
    var upload = this.createElement();
    document.body.appendChild(upload);

  }



  this.close = function () {

    var modal = document.getElementById(this.id + "-modal");
    var upload = document.getElementById(this.id);
    document.body.removeChild(modal);
    document.body.removeChild(upload);

  }




  this.createElement = function () {

    var el = document.createElement("div");
    el.id = this.id;

    el.style.setProperty("font-family", "Arial");
    el.style.setProperty("width", this.width);
    el.style.setProperty("padding", "10px");
    el.style.setProperty("position", "absolute");
    el.style.setProperty("left", "50%");
    el.style.setProperty("top", "100px");
    el.style.setProperty("margin-left", "-150px");
    el.style.setProperty("border-radius", "4px");
    el.style.setProperty("background-color", "#fffff6");
    el.style.setProperty("color", "#666666");
    el.style.setProperty("z-index", "9999");

    // add title
    if (this.title) {

      var titleContainer = document.createElement("div");

      titleContainer.style.setProperty("font-size", "14px");
      titleContainer.style.setProperty("font-weight", "bold");
      titleContainer.style.setProperty("margin-bottom", "10px");

      titleContainer.innerHTML = this.title;
      el.appendChild(titleContainer);

    }

    // add text?
    if (this.text) {

      var textContainer = document.createElement("div");

      textContainer.style.setProperty("font-size", "12px");
      textContainer.style.setProperty("margin-bottom", "20px");

      textContainer.innerHTML = this.text;
      el.appendChild(textContainer);

    }


    // add iframe

    var frame = document.createElement("iframe");
    frame.src = "php/listImages.php";
    frame.style.setProperty("width", "100%");
    frame.style.setProperty("height", "400px");
    frame.style.setProperty("border", "none");
    el.appendChild(frame);


    // add buttons
    var bc = document.createElement("div");
    bc.style.setProperty("padding", "20px");

    var myThis = this;

    var b = document.createElement("button");
    b.innerHTML = "Cancel";
    b.style.setProperty("border", "none");
    b.style.setProperty("color", "666666");
    b.style.setProperty("background-color", "#d4d4d4");
    b.style.setProperty("font-size", "12px");
    b.style.setProperty("padding", "4px");
    b.style.setProperty("margin", "2px");
    b.style.setProperty("cursor", "pointer");
    b.onclick = function (event) { myThis.close(); }
    bc.appendChild(b);

    el.appendChild(bc);


    return el;

  }




  this.createModalElement = function () {

    var e = document.createElement("div");

    e.style.setProperty("width", "100%");
    e.style.setProperty("height", "100%");
    e.style.setProperty("background-color", "rgba(51,51,51,0.5)");
    e.style.setProperty("position", "fixed");
    e.style.setProperty("left", "0");
    e.style.setProperty("top", "0");
    e.style.setProperty("z-index", "1");

    e.id = this.id + "-modal";
    var myThis = this;
    e.onclick = function () { myThis.close(); };

    return e;

  }


}
