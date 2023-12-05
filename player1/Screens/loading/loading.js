export class LoadingScreen {
  constructor(p5, changeScreenCallback) {
      this.p5 = p5;
      this.createMainMenu();
      this.changeScreen = changeScreenCallback;
      this.socket = io.connect('http://localhost:5500', { path: '/real-time' });
  }

  createMainMenu() {
      this.p5.noCanvas();
      this.setupElements();
  }

  draw() {
      // Puedes agregar lógica de dibujo adicional si es necesario
  }

  setupElements() {
      let body = this.p5.select('body');
      body.style('background', 'linear-gradient(#FE2627, #FE8E57)');
      body.style('margin', '0');
      body.style('padding', '0');
      body.style('height', '100vh');
      body.style('display', 'flex');
      body.style('flex-direction', 'column');
      body.style('justify-content', 'center');
      body.style('align-items', 'center');

      let logo = this.p5.createImg("./Screens/imgs/rappi-logo.png", "Rappi Logo");
      logo.style('max-width', '100%');
      logo.style('height', 'auto');
      logo.style('margin-bottom', '20px');
      logo.parent(body);

      // Agregar el texto "Waiting for other player"
      let waitingText = this.p5.createP("Waiting for other player...");
      waitingText.style('color', 'white');
      waitingText.style('font-size', '32px');
      waitingText.style('font-family', 'Poppins, sans-serif');
      waitingText.parent(body);
  }

  mousePressed() {
      // Puedes agregar lógica de clic del mouse si es necesario
  }
}
