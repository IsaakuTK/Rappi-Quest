// import { SerialPort } from 'serialport'
// import { ReadlineParser } from 'serialport'
import { createUserDB, db } from "./firebase.js"
import express from 'express';
import cors from 'cors'
import { Server } from 'socket.io';

const PORT = 5500;

const expressApp = express()
expressApp.use(cors())

const httpServer = expressApp.listen(PORT, () => {
    console.table(
        {
            'Player1:': 'http://localhost:5500/player1',
            'Player2:': 'http://localhost:5500/player2',
            'control1:': 'http://localhost:5500/control1',
            'control2:': 'http://localhost:5500/control2',
        })
})

expressApp.use('/player1', express.static('player1'))
expressApp.use('/player2', express.static('player2'))
expressApp.use('/control1', express.static('control1'))
expressApp.use('/control2', express.static('control2'))

expressApp.use(express.json())


const io = new Server(httpServer, {
    path: '/real-time',
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
});

// const protocolConfiguration = {
//   path: 'COM3',
//   baudRate: 9600
// }

// const port = new SerialPort(protocolConfiguration);
// const parser = port.pipe(new ReadlineParser());


io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('createUserDB', async (nuevoUsuario) => {
      await createUserDB(nuevoUsuario)
      .then((usuarioCreado) => {
        let existeuser = true;
        if (usuarioCreado) {
          existeuser = false;
          socket.emit('existUser', existeuser)
          console.log('Usuario creado con éxito:', usuarioCreado);
        } else {
          existeuser = true;
          socket.emit('existUser', existeuser)
          console.log('Error al crear el usuario.');
        }
      })
      .catch((error) => {
        console.error('Error al intentar crear el usuario:', error);
        
      });
      
      io.emit('createUserDB', nuevoUsuario);
    }); 


    socket.on('existUser', (data) => {
      io.emit('existUser', data);
    }); 

    socket.on('bullet1', (data) => {
        io.emit('bullet1', data);
      }); 
    
      socket.on('position1', (winner) => {
        io.emit('position1', winner);    
      });

      socket.on('bullet2', (data) => {
        io.emit('bullet2', data);
      });
    
      socket.on('position2', (winner) => {
        io.emit('position2', winner);    
      });

      socket.on('time', (winner) => {
        io.emit('time', winner);
      });

      socket.on('lab', (lab) => {
        io.emit('lab', lab);
      });

      socket.on('tap1', (tap) => {
        io.emit('tap1', tap);
      });

      socket.on('tap2', (tap) => {
        io.emit('tap2', tap);
      });

      socket.on('user1', (e) => {
        io.emit('user1', e);
      });

      socket.on('user2', (e) => {
        io.emit('user2', e);
      });

      socket.on('menu', () => {
      io.emit('menu')
      });

      socket.on('takephoto', () => {
      io.emit('takephoto')
      });

      socket.on('game', () => {
      io.emit('game')
      });
      
      socket.on('loading', () => {
      io.emit('loading')
      });

      socket.on('congratulations', () => {
      io.emit('congratulations')
      });

      socket.on('disconnected' , () => {
        console.log('un cliente se ha desconectado');
      });
    //Arduino ////////////////////////////////////////////////////////////

    // parser.on('data', (data) => {
    //   console.log("data", data);
    //   io.emit('input', {"key": data});
    // });

    // // list serial ports:
    // SerialPort.list().then(
    //   ports => ports.forEach(port => console.log(port.path)), //COM3
    //   err => console.log(err)
    // )
    
    

  

});


