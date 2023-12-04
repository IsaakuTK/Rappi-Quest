export class Takephoto {
  
  constructor(p5, changeScreenCallback) {
    this.p5 = p5;
    this.FRAME = 200;
    this.nameInput = this.p5.createInput();
    this.emailInput = this.p5.createInput();
    this.changeScreen = changeScreenCallback;
    this.socket = io.connect('http://localhost:5500', { path: '/real-time' });

    this.createElements();
    this.photoDiv = document.querySelector(".photo");
    this.canvasCreation(this.photoDiv);

    this.usePhoto = (video = undefined) => {
      if (video == undefined) {
        return;
      }

      let nuevaImg = video.get();
      nuevaImg.resize(this.FRAME, this.FRAME);
      this.p5.image(nuevaImg, 0, 0);
      video.hide();
      let pCanvas = document.querySelector(".p5Canvas");
      pCanvas.classList.remove("hidden");
      console.log(video);
    };
  }

canvasCreation(container) {
  this.p5.createCanvas(this.FRAME, this.FRAME); // Creamos el canvas
  let pCanvas = document.querySelector(".p5Canvas"); // seleccionamos el canvas
  pCanvas.classList.add("my-auto", "hidden");
  container.appendChild(pCanvas); // agregamos el canvas a el contendor
}

draw() {
}


backMain() {
  window.location.href = "../main-menu/main-menu.html";
}



createElements() {
  let backButton = this.p5.createButton("");
  backButton.class("back");
  backButton.mousePressed(this.backMain);

  // Crear botón de regresar
  let backImage = this.p5.createImg("./Screens/imgs/Frame.png", "back");
  backImage.size(30, 30);
  backButton.child(backImage);

  // Crear elementos del encabezado
  let header = this.p5.createDiv("");
  header.class("head");
  let title = this.p5.createElement("h1", "Photo");
  let number = this.p5.createElement(
    "p",
    "Take a photo to identify your self in the competition."
  );

  // Crear elemento de imagen con captura de video
  let photoDiv = this.p5.createDiv("");

  photoDiv.class("photo");
  let profileImage = this.p5.createCapture(this.p5.VIDEO);

  // Agregar elementos al DOM
  document.body.appendChild(backButton.elt);
  document.body.appendChild(header.elt);
  header.child(title);
  header.child(number);
  document.body.appendChild(photoDiv.elt);
  photoDiv.child(profileImage);

  //

  
  this.nameInput.attribute("placeholder", "Your Name");
  this.nameInput.class("inputField");


  this.emailInput.attribute("placeholder", "Your Email");
  this.emailInput.class("inputField");

  // Crear contenedor para los campos de entrada
  let inputContainer = this.p5.createDiv("");
  inputContainer.class("input-container");
  inputContainer.child(this.nameInput);
  inputContainer.child(this.emailInput);
  
  //photoDiv.child(p5Canvas);

  let menuDiv = this.p5.createDiv("");
  menuDiv.class("menu-buttons");

  let takePhoto = this.p5.createButton("Take a Photo");
  takePhoto.mousePressed((e) => {
    this.usePhoto(profileImage);
  });
  takePhoto.class("buttonPhoto");

  let nextScreen = this.p5.createButton("Next");
  nextScreen.mousePressed(this.moveMaze);
  nextScreen.class("buttonPhoto");

  //menuDiv.parent("body");
  takePhoto.parent(menuDiv);  
  nextScreen.parent(menuDiv);

  let logoDiv = this.p5.createDiv("");
  logoDiv.class("logo-div");

  let logo = this.p5.createImg("./Screens/imgs/rappi-logo-2.png", "Rappi Logo");
  logo.style("max-width", "100%");
  logo.style("height", "auto");
  logo.style("margin-bottom", "20px");

  logo.parent(logoDiv);
}


moveMaze = async () => {
  // Get the value from the nameInput

  const playerName = this.nameInput.value();
  const playerEmail = this.emailInput.value();

  // Check if the playerName is not empty before proceeding
  if (playerName.trim() !== "" && playerEmail.trim() !== "") {
    const nuevoUsuario = {
      nombre: playerName,
      correo: playerEmail,
      score: 0,
    };
    this.socket.emit('createUserDB', nuevoUsuario)
  } else {
    alert("Please enter your name and email before proceeding.");
  }
};

}
