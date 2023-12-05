import { Takephoto } from './Screens/Takephoto/Takephoto.js';
import { Game } from './Screens/Game/game.js';
import { MainMenu } from "./Screens/main-menu/menu-sketch.js"
import {LoadingScreen} from "./Screens/loading/loading.js"
import {CupponScreen} from "./Screens/Congrats-screen/Congrats.js"

const app = (p5) => {

  let currentScreen = 'game';
  let currentScreenInstance;
  let socket;


  const changeScreen = (screen) => {

    if (currentScreenInstance) {
      currentScreenInstance.clear();
    }
    
    currentScreen = screen;

    if (currentScreen === 'takephoto') {
      currentScreenInstance = new Takephoto(p5, changeScreen);
    } else if (currentScreen === 'game') {
      currentScreenInstance = new Game(p5, changeScreen);
    } else if (currentScreen === 'menu') {
      currentScreenInstance = new MainMenu(p5, changeScreen);
    } else if (currentScreen === 'loading') {
      currentScreenInstance = new LoadingScreen(p5, changeScreen);
    } else if (currentScreen === 'CupponScreen') {
      currentScreenInstance = new CupponScreen(p5, changeScreen);
    } 
  };

  p5.setup = async () => {
    socket = io.connect('http://localhost:5500/', {path: '/real-time'});
    changeScreen('takephoto');

    socket.on('takephoto', () => {
      changeScreen('takephoto');
    });

    socket.on('menu', () => {
      changeScreen('menu');
    });

    socket.on('game', () => {
      changeScreen('game');
    });

    socket.on('loading', () => {
      changeScreen('loading');
    });

    socket.on('CupponScreen', () => {
      changeScreen('CupponScreen');
    });
  };

  p5.draw = () => {
    currentScreenInstance.draw();
  };

  if(currentScreen === 'game'){
    p5.keyPressed = () => {
      currentScreenInstance.keyPressed();
    }
  }

};


new p5(app);