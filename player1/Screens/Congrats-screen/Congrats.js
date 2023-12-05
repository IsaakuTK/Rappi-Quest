import p5 from 'p5';
function setup() {
    noCanvas();
    //cuadrado blanco
    let saveImage = createImg('./IMAGES/Rectangle 5.jpg', 'save');
    saveImage.child(saveImage);

    // Crear elementos del encabezado
    let header = createDiv('');
    header.class('head');
    let title = createElement('h1', 'Congratulations');

    // Crear elemento de imagen y número
    let paragraph = document.createElement("p");
    paragraph.innerText =
      "You completed the rappi quest with a new time mark, you won the discount code for the restaurant in where you scanned the QR";
    // Crear cuppon
    let couponCode = document.createElement("h3");
    couponCode.innerText = "7269-1a19-1be1-082n";

    let saveButton = createButton('');
    saveButton.class('save');
    saveButton.mousePressed(cambiarPagina);

    // Agregar elementos al DOM
    document.body.appendChild(backButton.elt);
    document.body.appendChild(header.elt);
    saveImage.child(header);
    header.child(title);
    header.child(paragraph);
    header.child(couponCode);
    header.child(saveButton);

  }

  function draw() {
  }

  function cambiarPagina() {
    window.location.href = '../Cuppon-screen/p5.html';
  }
