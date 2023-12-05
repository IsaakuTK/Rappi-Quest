// Importar la librería p5.js
import p5 from 'p5';

// Definir una clase que utilizará p5.js
class CongratsScreen {
  constructor() {
    // Inicializar variables necesarias
    this.saveCouponBtn = null;

    // Configurar funciones de p5.js
    new p5(this.sketch);
  }

  // Función de configuración de p5.js
  sketch(p) {
    p.setup = () => {
      // Crear elementos y configurar eventos cuando el DOM esté completamente cargado
      p.createCanvas(window.innerWidth, window.innerHeight);
      this.createHTML();
    };
  }

  createHTML() {
    // Crear div contenedor
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("body");

    // Crear div de felicitaciones
    let congratsDiv = document.createElement("div");
    congratsDiv.classList.add("CONGRATS");

    // Crear div del rectángulo
    let rectangleDiv = document.createElement("div");
    rectangleDiv.classList.add("rectangulo");

    // Crear elementos internos del rectángulo
    let title = document.createElement("h1");
    title.innerText = "Congratulations!";
    let paragraph = document.createElement("p");
    paragraph.innerText =
      "You completed the rappi quest with a new time mark, you won the discount code for the restaurant in where you scanned the QR";
    let orangeCheck = document.createElement("img");
    orangeCheck.classList.add("orangecheck");
    orangeCheck.src = "./IMAGES/Check.jpg";
    orangeCheck.alt = "";
    let couponCode = document.createElement("h3");
    couponCode.innerText = "7269-1a19-1be1-082n";

    // Agregar elementos al DOM
    rectangleDiv.appendChild(title);
    rectangleDiv.appendChild(paragraph);
    rectangleDiv.appendChild(orangeCheck);
    rectangleDiv.appendChild(couponCode);
    congratsDiv.appendChild(rectangleDiv);

    // Crear botón
    this.saveCouponBtn = document.createElement("button");
    this.saveCouponBtn.id = "saveCouponBtn";
    this.saveCouponBtn.innerText = "Save Your Coupon";
    this.saveCouponBtn.addEventListener("click", () => this.changePage());

    // Agregar elementos al DOM
    congratsDiv.appendChild(this.saveCouponBtn);
    bodyDiv.appendChild(congratsDiv);
    document.body.appendChild(bodyDiv);
  }

  changePage() {
    // Cambiar de página al hacer clic en el botón
    window.location.href = '../Cuppon-screen/p5.html';
  }
}

// Inicializar la clase
new CongratsScreen();
