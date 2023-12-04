// Importar las pantallas
import { Takephoto } from './Screens/Takephoto/Takephoto.js';
import { Game } from './Screens/Game/game.js';

const app = (p5) => {
   

  let currentScreen = 'game';
  let currentScreenInstance;
  let socket;

  const changeScreen = (screen) => {
    currentScreen = screen;


    if (currentScreen === 'takephoto') {
      currentScreenInstance = new Takephoto(p5, changeScreen);
    } 
    else if (currentScreen === 'game') {
      currentScreenInstance = new Game(p5, changeScreen);
      currentScreenInstance.keyPressed();
    }
  };

  p5.setup = () => {
    socket = io.connect('http://localhost:5500/', {path: '/real-time'});
    changeScreen('game');

    // socket.on('logIn', () => {
    //   changeScreen('main');
    // });

    // socket.on('signUp', () => {
    //   changeScreen('main');
    // });

    // socket.on('letsGame', () => {
    //   changeScreen('game');
    // });

    // socket.on('playersScores', () => {
    //   changeScreen('scores');
    // });

    socket.on('takephoto', () => {
      changeScreen('takephoto');
    });
  };


  p5.draw = () => {
    currentScreenInstance.draw();

  };
  p5.keyPressed = () => {
    currentScreenInstance.keyPressed();
  }

};

new p5(app);