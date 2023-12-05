
function setup() {
    noCanvas();
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
    let header = createDiv('');
    header.class('head');
    let title = createElement('h1', 'Congratulations');

    // Crear elemento de imagen y número
    let paragraph = document.createElement("p");
    paragraph.innerText =
      "You completed the rappi quest with a new time mark, you won the discount code for the restaurant in where you scanned the QR";
    let orangecheck = createImg('./IMAGES/Check.jpg', 'save');
    orangecheck.child(orangecheck);
    // Crear cuppon
    let couponCode = document.createElement("h3");
    couponCode.innerText = "7269-1a19-1be1-082n";

    let saveCouponBtn = createButton('');
    saveCouponBtn.class('save');
    saveCouponBtn.mousePressed(cambiarPagina);

    // Agregar elementos al DOM
    rectangleDiv.appendChild(title);
    rectangleDiv.appendChild(paragraph);
    rectangleDiv.appendChild(orangeCheck);
    rectangleDiv.appendChild(couponCode);
    congratsDiv.appendChild(rectangleDiv);
    // Agregar elementos al DOM
    congratsDiv.appendChild(this.saveCouponBtn);
    bodyDiv.appendChild(congratsDiv);
    document.body.appendChild(bodyDiv);

  }

  function draw() {
  }

  function cambiarPagina() {
    window.location.href = '../Cuppon-screen/p5.html';
  }
// Inicializar la clase
new CongratsScreen();