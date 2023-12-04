export class Takephoto {
  constructor(p5, changeScreenCallback) {
    this.p5 = p5;
    this.FRAME = 200;
    this.nameInput = this.p5.createInput();
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


  canvasCreation(container) {
    this.p5.createCanvas(this.FRAME, this.FRAME); // Creamos el canvas
    let pCanvas = document.querySelector(".p5Canvas"); // seleccionamos el canvas
    pCanvas.classList.add("my-auto", "hidden");
    pCanvas.style('object-fit', 'cover');
    pCanvas.style('display', 'flex');
    pCanvas.style('justify-content', 'center');
    pCanvas.style('border', '5px solid #002046bf');
    pCanvas.style('width', '200px');
    pCanvas.style('height', '200px');
    pCanvas.style('border-radius', '300px');
    pCanvas.style('margin-block', '20px');
    container.appendChild(pCanvas); // agregamos el canvas a el contendor
  }

  canvasCreation(container) {
    this.p5.createCanvas(this.FRAME, this.FRAME); // Creamos el canvas
    let pCanvas = document.querySelector(".p5Canvas"); // seleccionamos el canvas
    pCanvas.classList.add("my-auto", "hidden");
    container.appendChild(pCanvas); // agregamos el canvas a el contendor
  }

  draw() {
  }

  createElements() {
    let body = this.p5.select('body');
    body.style('background-color', '#fff3dd');

    let backButton = this.p5.createButton("");
    backButton.class("back");
    backButton.mousePressed(this.backMain);
    this.applyBackButtonStyles(backButton);

    // Crear botón de regresar
    let backImage = this.p5.createImg("./Screens/imgs/Frame.png", "back");
    backImage.size(30, 30);
    backButton.child(backImage);

    // Crear elementos del encabezado
    let header = this.p5.createDiv("");
    header.class("head");
    header.style('display', 'flex');
    header.style('flex-direction', 'column');
    header.style('align-items', 'center');
    header.style('color', '#fe3f23');
    header.style('font-family', 'Poppins, sans-serif');
    header.style('font-size', '15px');

    let title = this.p5.createElement("h1", "Photo");
    let number = this.p5.createElement(
      "p",
      "Take a photo to identify yourself in the competition."
    );

    // Crear elemento de imagen con captura de video
    let photoDiv = this.p5.createDiv("");
    photoDiv.class("photo");
    photoDiv.style('transform', 'scaleX(-1)');
    photoDiv.style('display', 'flex');
    photoDiv.style('justify-content', 'center');

    let profileImage = this.p5.createCapture(this.p5.VIDEO);

    profileImage.style('object-fit', 'cover');
    profileImage.style('display', 'flex');
    profileImage.style('justify-content', 'center');
    profileImage.style('border', '5px solid #002046bf');
    profileImage.style('width', '200px');
    profileImage.style('height', '200px');
    profileImage.style('border-radius', '300px');
    profileImage.style('margin-block', '20px');
    profileImage.style('margin-left', '180px');


    // Agregar elementos al DOM
    document.body.appendChild(backButton.elt);
    document.body.appendChild(header.elt);
    header.child(title);
    header.child(number);
    document.body.appendChild(photoDiv.elt);
    photoDiv.child(profileImage);

    this.nameInput.attribute("placeholder", "Your Name");
    this.nameInput.class("inputField");
    this.nameInput.style('width', '258px');
    this.nameInput.style('height', '49px');
    this.nameInput.style('border-radius', '40px');
    this.nameInput.style('margin-left', '10px');
    this.nameInput.style('text-align', 'center'); /* Centrar el texto del placeholder */
    this.nameInput.style('margin-bottom', '10px');

    let emailInput = this.p5.createInput();
    emailInput.attribute("placeholder", "Your Email");
    //estilos del
    emailInput.class("inputField");
    emailInput.style('width', '258px');
    emailInput.style('height', '49px');
    emailInput.style('border-radius', '40px');
    emailInput.style('margin-left', '10px');
    emailInput.style('text-align', 'center'); /* Centrar el texto del placeholder */
    emailInput.style('margin-bottom', '10px');

    // Crear contenedor para los campos de entrada
    let inputContainer = this.p5.createDiv("");
    inputContainer.class("input-container");
    inputContainer.style('text-align', 'center');
    inputContainer.style('margin-top', '20px');
    inputContainer.style('display', 'flex');
    inputContainer.style('flex-direction', 'column');
    inputContainer.style('align-items', 'center');
    inputContainer.child(this.nameInput);
    inputContainer.child(emailInput);

    //photoDiv.child(p5Canvas);

    let menuDiv = this.p5.createDiv("");
    menuDiv.class("menu-buttons");
    menuDiv.style('display', 'flex');
    menuDiv.style('flex-direction', 'column');
    menuDiv.style('align-items', 'center');

    let takePhoto = this.p5.createButton("Take a Photo");
    takePhoto.mousePressed((e) => {
      this.usePhoto(profileImage);
    });
    takePhoto.class("buttonPhoto");
    this.applyButtonStyles(takePhoto);

    let nextScreen = this.p5.createButton("Next");
    nextScreen.mousePressed(this.moveMaze);
    nextScreen.class("buttonPhoto");
    this.applyButtonStyles(nextScreen);

    //menuDiv.parent("body");
    takePhoto.parent(menuDiv);
    nextScreen.parent(menuDiv);

    let logoDiv = this.p5.createDiv("");
    logoDiv.class("logo-div");
    logoDiv.style('display', 'flex');
    logoDiv.style('flex-direction', 'column');
    logoDiv.style('align-items', 'center');
    logoDiv.style('margin', '30px');

    let logo = this.p5.createImg("./Screens/imgs/rappi-logo-2.png", "Rappi Logo");
    logo.style("max-width", "100%");
    logo.style("height", "auto");
    logo.style("margin-bottom", "20px");

    logo.parent(logoDiv);
  }

  moveMaze = () => {
    // Get the value from the nameInput
    const playerName = this.nameInput.value();

    // Check if the playerName is not empty before proceeding
    if (playerName.trim() !== "") {
      // Proceed with your logic here
    } else {
      alert("Please enter your name before proceeding.");
    }
  };

  applyButtonStyles(button) {
    button.style('background-color', '#ff4b3d');
    button.style('color', '#fff');
    button.style('font-family', 'Poppins, sans-serif');
    button.style('font-size', '22px');
    button.style('font-weight', 'bolder');
    button.style('margin-top', '10px');
    button.style('width', '258px');
    button.style('height', '49px');
    button.style('border-radius', '40px');
    button.style('border', 'none');
    button.style('outline', 'none');
    button.style('cursor', 'pointer');
    button.style('transition', 'background-color 0.3s');

    button.mouseOver(() => {
      button.style('border', '2px solid #ff4b3d');
      button.style('background-color', '#fff');
      button.style('color', '#ff4b3d');
    });

    button.mouseOut(() => {
      button.style('border', 'none');
      button.style('background-color', '#ff4b3d');
      button.style('color', '#fff');
    });

    button.mousePressed(() => {
      button.style('transform', 'scale(0.95)');
    });

    button.mouseReleased(() => {
      button.style('transform', 'scale(1)');
    });
  }

  applyBackButtonStyles(button) {
    button.style('background-color', '#294464');
    button.style('border-radius', '30px');
    button.style('width', '70px');

    button.mouseOver(() => {
      button.style('background-color', '#002046');
      button.style('color', '#fff');
    });

    button.mouseOut(() => {
      button.style('background-color', '#294464');
      button.style('color', '');
    });

    button.mousePressed(() => {
      button.style('transform', 'scale(0.95)');
    });

    button.mouseReleased(() => {
      button.style('transform', 'scale(1)');
    });
  }
}
