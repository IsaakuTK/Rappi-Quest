
function setup() {
    noCanvas();
   // Crear div contenedor
   let bodyDiv = document.createElement("div");
   bodyDiv.classList.add("body");

   // Crear div de disculpa
   let sorryDiv = document.createElement("div");
   sorryDiv.classList.add("SORRY");

   // Crear div del rectángulo
   let rectangleDiv = document.createElement("div");
   rectangleDiv.classList.add("rectangulo");

   // Crear elementos internos del rectángulo
   let title = document.createElement("h1");
   title.innerText = "Sorry";
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
   this.backToRappiBtn.addEventListener("click", () => this.changePage());

   // Agregar elementos al DOM
   sorryDiv.appendChild(this.backToRappiBtn);
   bodyDiv.appendChild(sorryDiv);
   document.body.appendChild(bodyDiv);
 }

  function draw() {
  }

  function cambiarPagina() {
    window.location.href = '../main-menu/main-menu.html';
  }

  // Inicializar la clase
new SorryScreen();