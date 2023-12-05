export class LoadingScreen {
    constructor(p5, changeScreenCallback) {
      this.p5 = p5;
      this.createMainMenu();
      this.logo = this.p5.createImg("./Screens/imgs/waiting.gif", "Rappi Logo");
      this.waitingText = this.p5.createP("Waiting for other player...");
      this.changeScreen = changeScreenCallback;
      this.socket = io.connect('http://localhost:5500/', { path: '/real-time' });
      this.user1 = false;

      this.p5.setup = () => {
        this.setup();
      };
  
      this.p5.draw = () => {
        this.draw();
      };
    }
  
    createMainMenu() {
      this.p5.noCanvas();
      this.setupElements();
    }
  
    setup() {
      this.socket.emit("user2", true);
    }
  
    draw() {
      if (this.user1 === true) {
        console.log("swuim");
      }
      this.socket.on('user1', (res) => {
        this.user1 = res;
      });
    }
  
   // ...
  
  setupElements() {
    // Configurar estilos CSS para centrar elementos con flexbox y columnas
    this.p5.select('body').style('display', 'flex');
    this.p5.select('body').style('flex-direction', 'column');
    this.p5.select('body').style('align-items', 'center');
    this.p5.select('body').style('justify-content', 'center');
  }
  
  
    clear() {
      this.waitingText.hide();
      this.logo.hide();
    }
  
    mousePressed() {
      // Tu lógica para cuando se presiona el mouse
    }
  }