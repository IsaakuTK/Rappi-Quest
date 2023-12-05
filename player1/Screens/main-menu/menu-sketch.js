export class MainMenu {
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

    draw(){

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
   
       let menuDiv = this.p5.createDiv('');
       menuDiv.class('menu-buttons');
       menuDiv.parent(body);
   
       let startButton = this.p5.createButton('Start');
       startButton.mousePressed(this.moveMaze)
       this.applyButtonStyles(startButton);
       startButton.parent(menuDiv);
   
       let playersScoreButton = this.p5.createButton('Players Score');
       this.applyButtonStyles(playersScoreButton);
       playersScoreButton.parent(menuDiv);
   
       let quitButton = this.p5.createButton('Quit');
       this.applyButtonStyles(quitButton);
       quitButton.parent(menuDiv);
    }
   
    applyButtonStyles(button) {
       button.style('background-color', '#fff');
       button.style('color', '#002046bf');
       button.style('font-family', 'Poppins, sans-serif');
       button.style('font-size', '32px');
       button.style('font-weight', 'bolder');
       button.style('margin-top', '10px');
       button.style('width', '258px');
       button.style('height', '49px');
       button.style('border-radius', '40px');
       button.style('border', 'none');
       button.style('display', 'flex');
       button.style('flex-direction', 'column');
       button.style('justify-content', 'center');
       button.style('align-items', 'center');
       button.style('outline', 'none');
       button.style('cursor', 'pointer');
       button.style('transition', 'background-color 0.3s');
   
       button.mouseOver(() => {
         button.style('background-color', '#002046');
         button.style('color', '#fff');
       });
   
       button.mouseOut(() => {
         button.style('background-color', '#fff');
         button.style('color', '#002046bf');
       });
   
       button.mousePressed(() => {
         button.style('transform', 'scale(0.95)');
       });
    }
   
    moveMaze = async () => {
        this.socket.emit('takephoto')
        console.log("hola")
      };
   }