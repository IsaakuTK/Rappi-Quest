function setup() {
  noCanvas();
  createElements();
}

function draw() {}

function backMain() {
  window.location.href = "../take-photo/take-photo.html";
}

function movePlay() {
  window.location.href = "../../player1/index.html";
}

function createElements() {
  let backButton = createButton("");
  backButton.class("back");
  backButton.mousePressed(backMain);

  let backImage = createImg("../imgs/Frame.png", "back");
  backImage.size(30, 30);
  backButton.child(backImage);

  // Crear elementos del encabezado
  let header = createDiv("");
  header.class("head");
  let title = createElement("h1", "Maze");
  let number = createElement("p", "The first to reach the goal, wins.");

  // Crear elemento de imagen
  let imageNumber = createDiv("");
  imageNumber.class("photo");
  let mapimg = createImg("../imgs/map.png", "Rappi Logo");


  // Agregar elementos al DOM
  document.body.appendChild(backButton.elt);
  document.body.appendChild(header.elt);
  header.child(title);
  header.child(number);
  document.body.appendChild(imageNumber.elt);
  imageNumber.child(mapimg);

  let menuDiv = createDiv("");
  menuDiv.class("menu-buttons");

  let startButton = createButton("Next");
  startButton.mousePressed(movePlay);
  startButton.class("buttonPhoto");

  //menuDiv.parent("body");
  startButton.parent(menuDiv);

  let logoDiv = createDiv("");
  logoDiv.class("logo-div");

  let logo = createImg("../imgs/rappi-logo-2.png", "Rappi Logo");
  logo.style("max-width", "100%");
  logo.style("height", "auto");
  logo.style("margin-bottom", "20px");

  logo.parent(logoDiv);
}
