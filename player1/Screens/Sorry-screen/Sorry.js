export class SorryScreen {
  constructor() {
    // Configurar funciones de p5.js
    new p5(this.sketch.bind(this));
  }
  setup() {
    this.p5.noCanvas();
    this.p5.background(255, 243, 221);
    this.p5.noLoop();
  }
  sketch(p) {
    p.setup = () => {
    // Crear div contenedor
    let bodyDiv = document.createElement("div");
    bodyDiv.style.margin = '0';
    bodyDiv.style.display = 'flex';
    bodyDiv.style.alignItems = 'center';
    bodyDiv.style.justifyContent = 'center';
    bodyDiv.style.height = '100vh';
    bodyDiv.style.backgroundColor = '#FF4B3D';

    // Crear div de disculpa
    let sorryDiv = document.createElement("div");
    sorryDiv.style.display = 'flex';
    sorryDiv.style.alignItems = 'center';
    sorryDiv.style.flexDirection = 'column';

    // Crear div del rectángulo
    let rectangleDiv = document.createElement("div");
    rectangleDiv.style.display = 'flex';
    rectangleDiv.style.alignItems = 'center';
    rectangleDiv.style.flexDirection = 'column';
    rectangleDiv.style.borderRadius = '10px';
    rectangleDiv.style.width = '300px';
    rectangleDiv.style.height = '450px';
    rectangleDiv.style.backgroundColor = '#ffffff';
    rectangleDiv.style.border = '2px solid #000000';
    rectangleDiv.style.textAlign = 'center';
    rectangleDiv.style.fontFamily = 'Poppins, sans-serif';
    rectangleDiv.style.marginTop = '20px';

    // Crear elementos internos del rectángulo
    let title = document.createElement("h1");
    title.innerText = "Sorry";
    title.style.fontSize = '50px';
    title.style.fontFamily = 'Poppins, sans-serif';

    let paragraph = document.createElement("p");
    paragraph.innerText =
      "You completed the rappi quest but you didn't beat the best times, try again later when you can play again";

    let orangeCheck = document.createElement("img");
    orangeCheck.classList.add("orangecheck");
    orangeCheck.src = "./IMAGES/X.jpg";
    orangeCheck.alt = "";

    // Agregar elementos al DOM
    rectangleDiv.appendChild(title);
    rectangleDiv.appendChild(paragraph);
    rectangleDiv.appendChild(orangeCheck);
    sorryDiv.appendChild(rectangleDiv);

    // Crear botón
    this.backToRappiBtn = document.createElement("button");
    this.backToRappiBtn.id = "BacktoRappibtn";
    this.backToRappiBtn.innerText = "Back to Rappi";
    this.backToRappiBtn.style.fontSize = '22px';
    this.backToRappiBtn.style.borderRadius = '45px';
    this.backToRappiBtn.style.marginTop = '20px';
    this.backToRappiBtn.style.height = '50px';
    this.backToRappiBtn.style.width = '250px';
    this.backToRappiBtn.style.color = '#FF4B3D';
    this.backToRappiBtn.style.backgroundColor = 'azure';
    this.backToRappiBtn.style.border = 'none';
    this.backToRappiBtn.style.fontFamily = 'Poppins, sans-serif';
    this.backToRappiBtn.addEventListener("click", () => this.changePage());

    // Agregar elementos al DOM
    sorryDiv.appendChild(this.backToRappiBtn);
    bodyDiv.appendChild(sorryDiv);
    document.body.appendChild(bodyDiv);
  };
  p.draw = () => {
  };
}
}