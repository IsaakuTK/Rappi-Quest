export class CupponScreen {
    constructor() {
      // Inicializar variables necesarias
      this.backToRappiBtn = null;
  
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
  
      // Crear div del cupón
      let cupponDiv = document.createElement("div");
      cupponDiv.classList.add("CUPPON");
  
      // Crear div del rectángulo
      let rectangleDiv = document.createElement("div");
      rectangleDiv.classList.add("rectangulo");
  
      // Crear elementos internos del rectángulo
      let title = document.createElement("h2");
      title.innerText = "Your coupon has been saved on your profile";
      let orangeCheck = document.createElement("img");
      orangeCheck.classList.add("orangecheck");
      orangeCheck.src = "./IMAGES/Blue Check.jpg";
      orangeCheck.alt = "";
  
      // Agregar elementos al DOM
      rectangleDiv.appendChild(title);
      rectangleDiv.appendChild(orangeCheck);
      cupponDiv.appendChild(rectangleDiv);
  
      // Crear botón
      this.backToRappiBtn = document.createElement("button");
      this.backToRappiBtn.id = "BacktoRappibtn";
      this.backToRappiBtn.innerText = "Back to Rappi";
      this.backToRappiBtn.addEventListener("click", () => this.changePage());
  
      // Agregar elementos al DOM
      cupponDiv.appendChild(this.backToRappiBtn);
      bodyDiv.appendChild(cupponDiv);
      document.body.appendChild(bodyDiv);
    }
  
    changePage() {
      // Cambiar de página al hacer clic en el botón
      window.location.href = '../main-menu/main-menu.html';
    }
  }
  
  // Inicializar la clase
  new CupponScreen();