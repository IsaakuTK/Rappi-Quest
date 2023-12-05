export class Takephoto {
  constructor(p5, changeScreenCallback) {
    this.p5 = p5;
    this.FRAME = 200;
    this.nameInput = this.p5.createInput();
    this.emailInput = this.p5.createInput();
    this.nextScreen = this.p5.createButton("Next");
    this.backButton = this.p5.createButton("");
    this.button1 = this.p5.createImg("./Screens/imgs/cheems1.webp", "Button 1");
    this.button2 = this.p5.createImg("./Screens/imgs/cheems2.webp", "Button 2");
    this.button3 = this.p5.createImg("./Screens/imgs/cheems3.jpg", "Button 3");
    this.changeScreen = changeScreenCallback;
    this.socket = io.connect('http://localhost:5500', { path: '/real-time' });

    this.p5.setup = () => {
      this.setup();
    };

    this.p5.draw = () => {
      this.draw();
    };

    this.createElements();
  }

  setup() {
    this.p5.noCanvas();
    this.p5.background(255, 243, 221);
    this.p5.noLoop();
  }

  draw() {
  }

  createElements() {
    this.backButton.style("background-color", "#294464");
    this.backButton.style("border-radius", "30px");
    this.backButton.style("width", "70px");
    // Crear botón de regresar
    let backImage = this.p5.createImg("./Screens/imgs/Frame.png", "back");
    backImage.size(30, 30);
    this.backButton.child(backImage);

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
      "Choose your favorite profile photo"
    );

    // Crear contenedor para las imágenes de botones
    let buttonContainer = this.p5.createDiv("");
    buttonContainer.style("display", "flex");
    buttonContainer.style("justify-content", "space-around");
    buttonContainer.style("margin-top", "100px");
    buttonContainer.style("margin-bottom", "100px");


    // Crear imágenes de botones
  

    // Establecer estilos para las imágenes de botones
    this.button1.style("width", "300px");
    this.button1.style("height", "300px");
    this.button2.style("width", "300px");
    this.button2.style("height", "300px");
    this.button3.style("width", "300px");
    this.button3.style("height", "300px");

    // Agregar botones al contenedor
    buttonContainer.child(this.button1);
    buttonContainer.child(this.button2);
    buttonContainer.child(this.button3);

    // Agregar elementos al DOM
    document.body.appendChild(this.backButton.elt);
    document.body.appendChild(header.elt);
    header.child(title);
    header.child(number);
    document.body.appendChild(buttonContainer.elt);

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

    menuDiv.child(inputContainer);

    this.nextScreen.style("background-color", "#ff4b3d");
    this.nextScreen.style("color", "#fff");
    this.nextScreen.style("font-family", "'Poppins', sans-serif");
    this.nextScreen.style("font-size", "22px");
    this.nextScreen.style("font-weight", "bolder");
    this.nextScreen.style("margin-top", "10px");
    this.nextScreen.style("width", "258px");
    this.nextScreen.style("height", "49px");
    this.nextScreen.style("border-radius", "40px");
    this.nextScreen.style("border", "none");
    this.nextScreen.style("outline", "none");
    this.nextScreen.style("cursor", "pointer");
    this.nextScreen.mousePressed(this.moveMaze);

    this.nextScreen.parent(menuDiv);
  }
  clear() {
    this.nameInput.hide();
    this.emailInput.hide();
    this.backButton.hide();
    this.nextScreen.hide();
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
      this.socket.on('existUser', (exist)=>{
        if(exist){
          alert("The Name or Email is already taken");
        }else{
          this.socket.emit('Mainmenu')
          console.log("yes"+this.changeScreen)
        }
      });
    } else {
      alert("Please enter your name and email before proceeding.");
    }
  };
  
}
