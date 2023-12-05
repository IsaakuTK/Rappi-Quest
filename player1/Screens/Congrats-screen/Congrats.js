    function setup() {
    noCanvas();
    let saveButton = createButton('');
    saveButton.class('save');
    saveButton.mousePressed(cambiarPagina);

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

    // Agregar elementos al DOM
    document.body.appendChild(backButton.elt);
    document.body.appendChild(header.elt);
    header.child(corona);
    header.child(title);
    document.body.appendChild(imageNumber.elt);
    imageNumber.child(profileImage);
    imageNumber.child(number);
  }

  function draw() {
  }

  function cambiarPagina() {
    window.location.href = '../Cuppon-screen/p5.html';
  }
