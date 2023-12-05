export class PlayersScore {
    constructor(p5, changeScreenCallback) {
        this.p5 = p5;
        this.changeScreen = changeScreenCallback;
        this.socket = io.connect('http://localhost:5500', { path: '/real-time' });
        this.setupElements();
    }

    draw() {
    }
    setupElements() {
      this.p5.noCanvas();
      this.p5.background(255, 243, 221); // Color de fondo
      this.p5.noLoop(); // No necesitamos loop de dibujo constante
  
      // Crear botón de retroceso
      let backButton = this.p5.createButton('');
      backButton.class('back');
      backButton.mousePressed(this.cambiarPagina);
  
      let backImage = this.p5.createImg("./Screens/imgs/Frame.png", "back");
      backImage.size(30, 30);
      backButton.child(backImage);
  
      // Crear elementos del encabezado
      let header = this.p5.createDiv('');
      header.class('head');
      let corona = this.p5.createImg('./Screens/imgs/corona.png', '');
      corona.id('corona');
      corona.size(70, 50);
      let title = this.p5.createElement('h1', 'Score');
  
      // Crear elemento de imagen y número
      let imageNumber = this.p5.createDiv('');
      imageNumber.class('imagen-numero');
      let profileImage = this.p5.createImg('https://vivolabs.es/wp-content/uploads/2022/03/perfil-hombre-vivo.png', '');
      profileImage.size(100, 100);
      profileImage.style('border-radius', '100px');
      profileImage.style('border', '4px solid #002046bf');
      let number = this.p5.createElement('h3', 'N0.8');
  
      // Crear contenedor de la puntuación
      let scoreboard = this.p5.createDiv('');
      scoreboard.class('Scoreboard');
  
      // Agregar elementos al DOM if the parent exists
      if (document.body) {
          document.body.appendChild(backButton.elt);
          document.body.appendChild(header.elt);
          header.child(corona);
          header.child(title);
          document.body.appendChild(imageNumber.elt);
          imageNumber.child(profileImage);
          imageNumber.child(number);
          document.body.appendChild(scoreboard.elt);
      } else {
          console.error("Document body not found!");
      }

        // Crear jugador 1
        let player1 = this.p5.createDiv('');
        player1.id('player1');
        player1.size(700, 110);
        player1.child(this.p5.createElement('h1', '1').style('margin', '0 30px'));
        let player1Img = this.p5.createImg('https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg', '');
        player1Img.size(100, 100);
        player1Img.style('border-radius', '100px');
        player1.child(player1Img);
        player1.child(this.p5.createElement('h1', 'Juan David Peñagos').style('margin', '0 30px'));
        player1.child(this.p5.createElement('h1', '0:20').style('margin', '0 30px'));

        // Crear contenedor para jugadores 2, 3, 4 y 5
        let cuadro = this.p5.createDiv('');
        cuadro.class('cuadro');

        // Crear jugadores 2, 3, 4 y 5
        for (let i = 2; i <= 5; i++) {
            let player = this.p5.createDiv('');
            player.id('player2');
            player.style('margin-left', '3%');
            player.style('margin-top', '5%');
            player.size(600, 90);
            player.child(this.p5.createElement('h1', i).class('position').style('margin-left', '5%').style('display', 'flex').style('flex', '0.2'));
            let playerImg = this.p5.createImg('./Screens/imgs/userimg.png', '');
            playerImg.size(70, 70);
            playerImg.style('border-radius', '100px');
            playerImg.style('margin-right', '5%');
            player.child(playerImg);
            player.child(this.p5.createElement('h1', 'Nombre').class('nombre').style('display', 'flex').style('flex', '0.7'));
            player.child(this.p5.createElement('h1', '0:21').class('timer'));
            cuadro.child(player);
        }

        // Agregar elementos al DOM
        header.child(corona);
        header.child(title);
        imageNumber.child(profileImage);
        imageNumber.child(number);
        scoreboard.child(player1);
        scoreboard.child(cuadro);

        // Agregar estilos directamente al DOM usando createElement
        let style = this.p5.createElement('style');
        style.html(`
            body {
                background-color: #FFF3DD;
            }
            button {
                background-color: #294464;
                border-radius: 30px;
                width: 70px;
            }
            button:hover {
                background-color: #002046;
                color: #fff;
            }
            button:active {
                transform: scale(0.95);
            }
            .head {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #002046bf;
                font-family: 'Poppins', sans-serif;
                font-size: 15px;
                font-weight: bold;
            }
            #corona {
                width: 70px;
                height: 50px;
                margin: 0 auto;
            }
            .imagen-numero {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: 'Poppins', sans-serif;
                font-size: 15px;
                font-weight: lighter;
            }
            .imagen-numero img {
                width: 100px;
                height: 100px;
                border-radius: 100px;
                border: 4px solid #002046bf;
            }
            .Scoreboard {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            #player1 {
                width: 700px;
                height: 110px;
                display: flex;
                align-items: center;
                flex-direction: row;
                background-color: #294464;
                color: #fff;
            }
            #player1 h1 {
                margin: 0 30px;
                font-family: 'Poppins', sans-serif;
                font-weight: bolder;
            }
            #player1 img {
                width: 100px;
                height: 100px;
                border-radius: 100px;
            }
            .cuadro {
                background-color: #FFFFFF;
                width: 650px;
                height: 500px;
            }
            #player2 {
                margin-left: 3%;
                margin-top: 5%;
                width: 600px;
                height: 90px;
                display: flex;
                align-items: center;
                flex-direction: row;
                background-color: #ffffff;
                color: #002046bf;
                box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
            }
            .position {
                margin-left: 5%;
                display: flex;
                flex: 0.2;
            }
            #player2 h1 {
                font-family: 'Poppins', sans-serif;
                font-weight: bolder;
                font-size: 25px;
            }
            #player2 img {
                width: 70px;
                height: 70px;
                border-radius: 100px;
                margin-right: 5%;
            }
            .nombre {
                display: flex;
                flex: 0.7;
            }
        `);
        style.parent('body');
    }
}