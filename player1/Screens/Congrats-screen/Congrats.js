export class Congratulations {
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

      // Crear div de felicitaciones
      let congratsDiv = document.createElement("div");
      congratsDiv.classList.add("CONGRATS");

      // Crear div del rectángulo
      let rectangleDiv = document.createElement("div");
      rectangleDiv.classList.add("rectangulo");

      // Crear elementos del encabezado
      let header = p.createDiv('');
      header.class('head');
      let title = p.createElement('h1', 'Congratulations');
      title.style('font-size', '35px');
      title.style('font-family', 'Poppins, sans-serif');

      // Crear elemento de párrafo y configurar el estilo
      let paragraph = p.createElement("p", "You completed the rappi quest with a new time mark, you won the discount code for the restaurant where you scanned the QR");
      paragraph.style('font-family', 'Poppins, sans-serif');
      paragraph.style('text-align', 'center');

      // Crear elemento de imagen y número
      let orangecheck = p.createImg('./IMAGES/Check.jpg', 'save');
      orangecheck.class('orangecheck');

      // Crear cupón
      let couponCode = p.createElement("h3", "7269-1a19-1be1-082n");
      couponCode.style('font-family', 'Poppins, sans-serif');

      // Crear botón y configurar el estilo
      this.saveCouponBtn = p.createButton('Save Your Coupon');
      this.saveCouponBtn.class('save');
      this.saveCouponBtn.style('font-size', '22px');
      this.saveCouponBtn.style('border-radius', '45px');
      this.saveCouponBtn.style('margin-left', '10%');
      this.saveCouponBtn.style('margin-top', '10%');
      this.saveCouponBtn.style('height', '50px');
      this.saveCouponBtn.style('width', '250px');
      this.saveCouponBtn.style('background-color', '#FF4B3D');
      this.saveCouponBtn.style('color', 'azure');
      this.saveCouponBtn.style('border-color', 'none');
      this.saveCouponBtn.style('font-family', 'Poppins, sans-serif');
      this.saveCouponBtn.mousePressed(() => this.cambiarPagina());

      // Agregar elementos al DOM
      rectangleDiv.appendChild(title);
      rectangleDiv.appendChild(paragraph);
      rectangleDiv.appendChild(orangecheck);
      rectangleDiv.appendChild(couponCode);
      congratsDiv.appendChild(rectangleDiv);
      congratsDiv.appendChild(this.saveCouponBtn);

      bodyDiv.appendChild(congratsDiv);
      document.body.appendChild(bodyDiv);
    };
  }
}
