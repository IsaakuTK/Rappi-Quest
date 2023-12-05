export class Takephoto {
  constructor(p5, changeScreenCallback) {
    this.p5 = p5;
    this.FRAME = 200;
    this.nameInput = this.p5.createInput();
    this.emailInput = this.p5.createInput();
    this.changeScreen = changeScreenCallback;
    this.socket = io.connect('http://localhost:5500', { path: '/real-time' });

    // Llamada a la función setup para configurar el canvas
    this.p5.setup = () => {
      this.p5.createCanvas(this.FRAME, this.FRAME);
      document.body.style.backgroundColor = '#fff3dd';
    };

    // Llamada a la función draw para manejar el dibujo
    this.p5.draw = () => {
      // Puedes agregar lógica de dibujo aquí si es necesario
    };

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
    // Creamos el canvas
    this.p5.createCanvas(this.FRAME, this.FRAME);
  
    // Seleccionamos el canvas
    let pCanvas = this.p5.select(".p5Canvas");
  
    // Establecemos estilos usando funciones de p5.js
    pCanvas.style("margin", "auto 0");
    pCanvas.hide(); // Utilizamos la función hide() para ocultar el canvas
    container.child(pCanvas.elt); // Agregamos el canvas al contenedor
  }
  

  draw() {
    // Puedes agregar lógica de dibujo aquí si es necesario
  }

  backMain() {
    window.location.href = "../main-menu/main-menu.html";
  }

  createElements() {
    let backButton = this.p5.createButton("");
    backButton.style("background-color", "#294464");
    backButton.style("border-radius", "30px");
    backButton.style("width", "70px");
    backButton.mousePressed(this.backMain);

    // Crear botón de regresar
    let backImage = this.p5.createImg("./Screens/imgs/Frame.png", "back");
    backImage.size(30, 30);
    backButton.child(backImage);

    // Crear elementos del encabezado
    let header = this.p5.createDiv("");
    header.style("display", "flex");
    header.style("flex-direction", "column");
    header.style("align-items", "center");
    header.style("color", "#fe3f23");
    header.style("font-family", "'Poppins', sans-serif");
    header.style("font-size", "15px");

    let title = this.p5.createElement("h1", "Photo");
    let number = this.p5.createElement(
      "p",
      "Take a photo to identify yourself in the competition."
    );

    // Crear elemento de imagen con captura de video
    let photoDiv = this.p5.createDiv("");
    photoDiv.style("transform", "scaleX(-1)");
    photoDiv.style("display", "flex");
    photoDiv.style("justify-content", "center");

    let profileImage = this.p5.createCapture(this.p5.VIDEO);

    // Agregar elementos al DOM
    document.body.appendChild(backButton.elt);
    document.body.appendChild(header.elt);
    header.child(title);
    header.child(number);
    document.body.appendChild(photoDiv.elt);
    photoDiv.child(profileImage);

    this.nameInput.attribute("placeholder", "Your Name");
    this.nameInput.style("width", "258px");
    this.nameInput.style("height", "49px");
    this.nameInput.style("border-radius", "40px");
    this.nameInput.style("text-align", "center");
    this.nameInput.style("margin-bottom", "10px");

    this.emailInput.attribute("placeholder", "Your Email");
    this.emailInput.style("width", "258px");
    this.emailInput.style("height", "49px");
    this.emailInput.style("border-radius", "40px");
    this.emailInput.style("text-align", "center");
    this.emailInput.style("margin-bottom", "10px");

    // Crear contenedor para los campos de entrada
    let inputContainer = this.p5.createDiv("");
    inputContainer.style("text-align", "center");
    inputContainer.style("margin-top", "20px");
    inputContainer.child(this.nameInput);
    inputContainer.child(this.emailInput);

    let menuDiv = this.p5.createDiv("");
    menuDiv.style("display", "flex");
    menuDiv.style("flex-direction", "column");
    menuDiv.style("align-items", "center");

    let takePhoto = this.p5.createButton("Take a Photo");
    takePhoto.style("background-color", "#ff4b3d");
    takePhoto.style("color", "#fff");
    takePhoto.style("font-family", "'Poppins', sans-serif");
    takePhoto.style("font-size", "22px");
    takePhoto.style("font-weight", "bolder");
    takePhoto.style("margin-top", "10px");
    takePhoto.style("width", "258px");
    takePhoto.style("height", "49px");
    takePhoto.style("border-radius", "40px");
    takePhoto.style("border", "none");
    takePhoto.style("outline", "none");
    takePhoto.style("cursor", "pointer");
    takePhoto.mousePressed((e) => {
      this.usePhoto(profileImage);
    });

    let nextScreen = this.p5.createButton("Next");
    nextScreen.style("background-color", "#ff4b3d");
    nextScreen.style("color", "#fff");
    nextScreen.style("font-family", "'Poppins', sans-serif");
    nextScreen.style("font-size", "22px");
    nextScreen.style("font-weight", "bolder");
    nextScreen.style("margin-top", "10px");
    nextScreen.style("width", "258px");
    nextScreen.style("height", "49px");
    nextScreen.style("border-radius", "40px");
    nextScreen.style("border", "none");
    nextScreen.style("outline", "none");
    nextScreen.style("cursor", "pointer");
    nextScreen.mousePressed(this.moveMaze);

    takePhoto.parent(menuDiv);
    nextScreen.parent(menuDiv);

    let logoDiv = this.p5.createDiv("");
    logoDiv.style("display", "flex");
    logoDiv.style("flex-direction", "column");
    logoDiv.style("align-items", "center");
    logoDiv.style("margin", "30px");

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
