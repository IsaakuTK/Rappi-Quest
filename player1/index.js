// Importar las pantallas
import { Takephoto } from './Screens/Takephoto/Takephoto.js';
import { Game } from './Screens/Game/game.js';
import { Congratulations } from './Screens/Congrats-screen/Congrats.js';

import { CupponScreen } from './Screens/Cuppon-screen/Cuppon.js';

import { SorryScreen } from './Screens/Sorry-screen/Sorry.js';

const app = (p5) => {

  let currentScreen = 'takephoto';
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
    }else if (currentScreen === 'Congrats') {
      currentScreenInstance = new Congratulations(p5, changeScreen);
    }else if (currentScreen === 'congrats') {
      currentScreenInstance = new CupponScreen(p5, changeScreen);
    }else if (currentScreen === 'sorry') {
      currentScreenInstance = new SorryScreen(p5, changeScreen);
    }
  };

  p5.setup = () => {
    socket = io.connect('http://localhost:5500/', {path: '/real-time'});
    changeScreen('Congrats');

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

    if(currentScreen === 'game'){
      p5.keyPressed = () => {
        currentScreenInstance.keyPressed();
      }
    }
  };


};

new p5(app);
