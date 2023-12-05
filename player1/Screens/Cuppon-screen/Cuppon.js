export class CupponScreen {
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
      bodyDiv.classList.add("body");

      // Crear div del cupón
      let cupponDiv = document.createElement("div");
      cupponDiv.classList.add("CUPPON");

      // Crear div del rectángulo
      let rectangleDiv = document.createElement("div");
      rectangleDiv.classList.add("rectangulo");

      // Crear elementos internos del rectángulo
      let title = document.createElement("h2");
      title.innerText = "Your coupon has been saved on your profile";
      title.style.fontSize = "30px";
      title.style.fontFamily = "'Poppins', sans-serif";

      let orangeCheck = document.createElement("img");
      orangeCheck.classList.add("orangecheck");
      orangeCheck.src = "./IMAGES/Blue Check.jpg";
      orangeCheck.alt = "";

      // Agregar elementos al DOM
      rectangleDiv.appendChild(title);
      rectangleDiv.appendChild(orangeCheck);
      cupponDiv.appendChild(rectangleDiv);

      // Crear botón y configurar el estilo
      this.backToRappiBtn = document.createElement("button");
      this.backToRappiBtn.id = "BacktoRappibtn";
      this.backToRappiBtn.innerText = "Back to Rappi";
      this.backToRappiBtn.style.fontSize = "22px";
      this.backToRappiBtn.style.borderRadius = "45px";
      this.backToRappiBtn.style.marginLeft = "10%";
      this.backToRappiBtn.style.marginTop = "10%";
      this.backToRappiBtn.style.height = "50px";
      this.backToRappiBtn.style.width = "250px";
      this.backToRappiBtn.style.backgroundColor = "#FF4B3D";
      this.backToRappiBtn.style.color = "azure";
      this.backToRappiBtn.style.borderColor = "none";
      this.backToRappiBtn.style.fontFamily = "'Poppins', sans-serif";
      this.backToRappiBtn.addEventListener("click", () => this.changePage());

      // Agregar elementos al DOM
      cupponDiv.appendChild(this.backToRappiBtn);
      bodyDiv.appendChild(cupponDiv);
      document.body.appendChild(bodyDiv);
        };
        p.draw = () => {
        };
    }
}