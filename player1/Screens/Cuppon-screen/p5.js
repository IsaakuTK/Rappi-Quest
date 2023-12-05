export class CupponScreen {
    constructor() {
        // Configurar funciones de p5.js
        new p5(this.sketch.bind(this));
    }

    clean() {
        // Implement clean-up logic if needed
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
            title.style.textAlign = "center"; // Center text

            let orangeCheck = document.createElement("img");
            orangeCheck.classList.add("orangecheck");
            orangeCheck.src = "./IMAGES/Blue check.png";
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
            this.backToRappiBtn.style.margin = "10% auto"; // Center button horizontally
            this.backToRappiBtn.style.display = "block"; // Make it a block element
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
    }
}

export class Takephoto {
    constructor(p5, changeScreenCallback) {
        // Existing code...

        this.p5.setup = () => {
            this.setup();
        };

        this.createElements();
    }

    clean() {
        this.nameInput.remove();
        this.emailInput.remove();
        this.backButton.remove();
        this.nextScreen.remove();
        this.button1.remove();
        this.button2.remove();
        this.button3.remove();
    }

    // Existing code...
}
