


function Upload (args) {

  var args = args || {};
  this.id = args.id || "popup-" + Math.round(Math.random() * 100000);
  this.action = args.action || "php/uploadFile.php";
  this.method = args.method || "POST";
  this.title = args.title || "";
  this.text = args.text|| "";
  this.width = args.width || "340px";


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

    var form = document.createElement("form");
    form.id = "uploadForm";
    form.action = this.action;
    form.method = this.method;
    form.enctype = "multipart/form-data";
    form.target = "_blank";

    var input = document.createElement("input");
    input.type = "file";
    input.name = "file";
    input.id = "file";
    form.appendChild(input);

    el.appendChild(form);


    // add buttons
    var bc = document.createElement("div");
    bc.style.setProperty("padding", "20px");

    var myThis = this;

    var b1 = document.createElement("button");
    b1.innerHTML = "Upload";
    b1.style.setProperty("border", "none");
    b1.style.setProperty("color", "666666");
    b1.style.setProperty("background-color", "#d4d4d4");
    b1.style.setProperty("font-size", "12px");
    b1.style.setProperty("padding", "4px");
    b1.style.setProperty("margin", "2px");
    b1.style.setProperty("cursor", "pointer");
    b1.onclick = function (event) { document.getElementById("uploadForm").submit(); myThis.close(); }
    bc.appendChild(b1);

    var b2 = document.createElement("button");
    b2.innerHTML = "Cancel";
    b2.style.setProperty("border", "none");
    b2.style.setProperty("color", "666666");
    b2.style.setProperty("background-color", "#d4d4d4");
    b2.style.setProperty("font-size", "12px");
    b2.style.setProperty("padding", "4px");
    b2.style.setProperty("margin", "2px");
    b2.style.setProperty("cursor", "pointer");
    b2.onclick = function (event) { myThis.close(); }
    bc.appendChild(b2);

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
