export class Congrats {
    constructor(p5, changeScreenCallback) {
      constructor(p5, changeScreenCallback){
        this.p5 = p5;
        this.FRAME = 200;
        this.nameInput = this.p5.createInput();
        this.changeScreen = changeScreenCallback;
        this.socket = io.connect('http://localhost:5500', { path: '/real-time' });
    }
    canvasCreation(container){
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
        pCanvas.style('border', '5px solid #294464');
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

    draw(){
    }
    createElements() {
/////////////////////////////////////////////////////////
        let body = this.p5.select('body');
        body.style('background-color', '#FFFFFF');
        // Crear elementos del encabezado
        let header = this.p5.createDiv("");
        header.class("head");
        header.style('display', 'flex');
        header.style('flex-direction', 'column');
        header.style('align-items', 'center');
        header.style('color', '#fe3f23');
        header.style('font-family', 'Poppins, sans-serif');
        header.style('font-size', '15px');

      let saveButton = this.p5.createButton("");
      saveButton.class("back");
      saveButton.mousePressed(this.backMain);
      this.applysaveButtonStyles(saveButton);
////////////////////////////////////////////////////////


      let title = this.p5.createElement("h1", "Photo");
      let number = this.p5.createElement(
        "p",
        "Take a photo to identify yourself in the competition."
      );


      // Agregar elementos al DOM
      document.body.appendChild(backButton.elt);
      document.body.appendChild(header.elt);
      header.child(title);
      header.child(number);
      document.body.appendChild(photoDiv.elt);
      photoDiv.child(profileImage);


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
      button.style('background-color', '#FF4B3D');
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
/////////////////////////////////////////////////////////
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
  }}