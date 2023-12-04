export class Game {
  constructor(p5, changeScreenCallback){
    this.p5 = p5;
    this.changeScreen = changeScreenCallback;
    this.socket = io.connect('http://localhost:5500', { path: '/real-time' });
    this.timer = 200

    this.tcanvas = 1000;
    this.t = 20;
    this.ncel = this.tcanvas/this.t;

    this.posx = 0;
    this.posy = this.ncel - 2;

    this.xb =this.posx;
    this.yb= this.posy;

    this.enemyxb =this.posx;
    this.enemyyb= this.posy;

    this.golpe =3;
    this.logolpeo=false;

    this.laberinto = [];

    this.apuntando = 0;

    this.metax;
    this.metay;

    this.nobullet = true;

    this.shoot = false;
    this.enemyshoot = false;

    this.move = true;

    this.dondedis;
    this.dondedisenemy;

    this.position= {
      posx: this.posx,
      posy: this.posy,
      apuntando: this.apuntando,
    }

    this.enemypos= {
      posx: this.posx,
      posy: this.posy,
      apuntando: this.apuntando,
    }

    this.mybullet ={
      shoot: this.shoot,
      xb: this.xb,
      yb: this.yb,
      dondedis: this.dondedis,
    }

    this.enemybullet ={
      shoot: this.shoot,
      xb: this.xb,
      yb: this.yb,
      dondedis: this.dondedis,
    }


    this.fire = false;

    this.gano = false;

    this.setup();
    this.camino();
    this.shootingboton();
    this.draw();
  }


setup() {
  this.p5.createCanvas(this.tcanvas, this.tcanvas+100);
  this.p5.noStroke();
  
  //array
  for (let x = 0; x < this.ncel; x++) {
    this.laberinto[x] = [];
    for (let y = 0; y < this.ncel; y++) {
      this.laberinto[x][y] = 0;
    }
  }
  
  //definir lab
  for(let x=0; x<this.ncel; x+=2){
    for(let y=0; y<this.ncel; y+=2){
      this.laberinto[x][y] = 1;
      let vecinos = [];
      if(x<this.ncel){
        vecinos.push({x:x+1,y:y})
      }
      if(y<this.ncel){
        vecinos.push({x:x,y:y+1})
      }
      if(vecinos.length>0){
        let ve = vecinos[this.p5.int(this.p5.random(2))];
        this.laberinto[ve.x][ve.y] = 1;
      }
    }
  }
  
  for(let x=0; x<this.ncel; x+=1){
    for(let y=0; y<this.ncel; y+=1){
      if(x==0 || x==49){
        this.laberinto[x][y] = 0;
      }
      if(y==0 || y==49){
        this.laberinto[x][y] = 0;
      }
    }
  
  }

  // Inicializa la posición del jugador en la parte inferior y centrada
  this.posx = this.p5.int(this.ncel / 2);
  this.posy = this.ncel - 2;
  
  this.position= {
    posx: this.posx,
    posy: this.posy
  }
  
  this.laberinto[this.posx][this.posy] = 1;
  
  // socket.emit("lab", laberinto)
}


  draw() {
  this.p5.background(220);
  //laberinto

  for(let x=0; x<this.ncel; x++){
    for(let y=0; y<this.ncel; y++){
      
      if(this.laberinto[x][y]==0 ){
        this.p5.fill(42,71,71);
      }else if(this.laberinto[x][y]==1){
        this.p5.fill(255,243,221);
      }
      this.p5.rect(x*this.t, y*this.t, this.t, this.t);
    }
    this.p5.fill(0,0,0);
  }

  
  //ganaste meta
  
  this.p5.fill(255,75,61);
  this.p5.rect(this.metax*this.t,this.metay*this.t,this.t,this.t);
  
  if (this.posx==this.metax && this.posy==this.metay) {
    this.p5.textSize(70);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.text("¡You Win!",this.tcanvas/2,this.tcanvas/2);
    this.move=false;
    this.gano=true;
  }
  

//player
this.position= {
  posx: this.posx,
  posy: this.posy,
  apuntando: this.apuntando
}

this.p5.fill(255,75,61);
this.p5.ellipse(this.posx * this.t + (this.t/2), this.posy * this.t + (this.t/2), this.t, this.t);
this.socket.emit('position1', this.position);

  //contador
  this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
  this.p5.textSize(50);
  this.p5.text("TIMER: "+ this.timer, this.p5.width/2, this.p5.height/1.05);
  
  if (this.p5.frameCount % 60 == 0 && this.timer > 0 && this.move===true) {
    this.timer --;
    this.socket.emit ('time', this.timer);
  }
  if (this.timer == 0) {
    this.p5.text("GAME OVER", this.p5.width/2, this.p5.height*0.7);
    this.move=false;
  }

  if(this.apuntando==0){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.posx * this.t + (this.t/4), this.posy * this.t-5, this.t-10, this.t)
  }
  else if(this.apuntando==1){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.posx * this.t + (this.t/4), this.posy * this.t+5, this.t, this.t-10)
  }
  else if(this.apuntando==2){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.posx * this.t + (this.t/4), this.posy * this.t+5, this.t-10, this.t)
  }
  else if(this.apuntando==3){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.posx * this.t - (this.t/4), this.posy * this.t+5, this.t, this.t-10)
  }

  //shoot bullet
  
  if(this.mybullet.shoot){
    this.p5.fill(255,75,61);
    this.p5.ellipse(this.mybullet.xb * this.t + (this.t/2), this.mybullet.yb * this.t + (this.t/2), this.t, this.t)
  }

  if (this.mybullet.dondedis===0){
    this.mybullet.yb -= 0.5;
  } 
  if(this.mybullet.dondedis===2){
    this.mybullet.yb += 0.5;
  }
  if(this.mybullet.dondedis===3){
    this.mybullet.xb -= 0.5;
  }
  if(this.mybullet.dondedis===1){
    this.mybullet.xb += 0.5;
  }


  //enemy
  this.p5.fill(175, 122, 197 );
  this.p5.ellipse(this.enemypos.posx * this.t + (this.t/2), this.enemypos.posy * this.t + (this.t/2), this.t, this.t);

  //canon enemigo
  if(this.enemypos.apuntando==0){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.enemypos.posx * this.t + (this.t/4), this.enemypos.posy * this.t-5, this.t-10, this.t)
  }
  else if(this.enemypos.apuntando==1){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.enemypos.posx * this.t + (this.t/4), this.enemypos.posy * this.t+5, this.t, this.t-10)
  }
  else if(this.enemypos.apuntando==2){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.enemypos.posx * this.t + (this.t/4), this.enemypos.posy * this.t+5, this.t-10, this.t)
  }
  else if(this.enemypos.apuntando==3){
    this.p5.fill(36, 113, 163 );
    this.p5.rect(this.enemypos.posx * this.t - (this.t/4), this.enemypos.posy * this.t+5, this.t, this.t-10)
  }

  //enemy shoot


  if(this.enemybullet.shoot === true ){
    this.p5.fill(175, 122, 197 );
    this.p5.ellipse(this.enemybullet.xb * this.t + (this.t/2), this.enemybullet.yb * this.t + this.t/2, this.t, this.t)
  }

  if (this.enemybullet.dondedis===0){
    this.enemybullet.yb -= 0.5;
  } 
  if(this.enemybullet.dondedis===2){
    this.enemybullet.yb += 0.5;
  }
  if(this.enemybullet.dondedis===3){
    this.enemybullet.xb -= 0.5;
  }
  if(this.enemybullet.dondedis===1){
    this.enemybullet.xb += 0.5;
  }

  //golpeo

  if(this.logolpeo === true){
    this.p5.fill(175, 122, 197 );
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.textSize(50);
    this.p5.text("Incapacitado por "+this.golpe+" seg", this.p5.width/2, this.p5.height*0.7);
      this.move=false;
    if (this.p5.frameCount % 60 == 0 && this.golpe > 0) {
      this.golpe --;
    }
  }

  if(this.golpe===0 && this.gano===false){
    this.move=true;
    this.logolpeo = false;
  }

  if((this.enemybullet.xb === this.posx) && (this.enemybullet.yb === this.posy)){
    this.logolpeo = true;
    this.golpe = 3;
  }
  if (this.posx == this.metax && this.posy == this.metay) {
    // Has llegado al final
    this.p5.textSize(70);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.text("¡You Win!", this.tcanvas / 2, this.tcanvas / 2);

    // Espera 5 segundos y luego cambia la pantalla
    setTimeout(() => {
      cambiarPagina();
    }, 5000);
  }


//SOCKET
  this.socket.on('position2', (enemy)=>{
    console.log ("recibiendo-position2:", enemy)
    this.enemypos=enemy;
  });
  
  this.socket.on('bullet2', (b)=>{
    console.log ("recibiendo-bullet2:", b)
    this.enemybullet=b;
    
  });
  
  this.socket.on('tap1', (tap)=>{
    console.log ("recibiendo-tap1:", tap)
    this.fire=tap;
  });
}


keyPressed(){
  if((this.p5.key === 'a' || this.p5.key === 'A' || this.p5.keyCode == this.p5.LEFT_ARROW) && this.posx > 0 && this.move===true){
    if(this.laberinto[this.posx-1][this.posy] != 0){
      this.posx -= 1;
      this.socket.emit('keyPressed', 'A');
    }
  }
  if((this.p5.key === 'a' || this.p5.key === 'A' || this.p5.keyCode == this.p5.LEFT_ARROW) && this.move===true){
    this.apuntando=3;
  }
  if((this.p5.key === 'd' || this.p5.key === 'D' || this.p5.keyCode == this.p5.RIGHT_ARROW) && this.posx < this.tcanvas-this.t && this.move===true){
    if(this.laberinto[this.posx+1][this.posy] != 0){
      this.posx += 1;
      this.socket.emit('keyPressed', 'D');
    }
  }
  if((this.p5.key === 'd' || this.p5.key === 'D' || this.p5.keyCode == this.p5.RIGHT_ARROW) && this.move===true){
      this.apuntando=1;
  }
  if((this.p5.key === 'w' || this.p5.key === 'W' || this.p5.keyCode == this.p5.UP_ARROW) && this.posy > 0 && this.move===true){
    if(this.laberinto[this.posx][this.posy-1] != 0){
      this.posy -= 1;
      this.p5.fill(0,0,0);
      this.socket.emit('keyPressed', 'W');
    }
  }
  if((this.p5.key === 'w' || this.p5.key === 'W' || this.p5.keyCode == this.p5.UP_ARROW) && this.move===true){
    this.apuntando=0;
  }

  if((this.p5.key === 's' || this.p5.key === 'S' || this.p5.keyCode == this.p5.DOWN_ARROW) && this.posy < this.tcanvas-this.t && this.move===true){
    if(this.laberinto[this.posx][this.posy+1] != 0){
      this.posy += 1;
      this.socket.emit('keyPressed', 'S');
    }
  }
  if((this.p5.key === 's' || this.p5.key === 'S' || this.p5.keyCode == this.p5.DOWN_ARROW) && this.move===true){
    this.apuntando=2;
  }
    if((this.p5.keyCode === 32) && (this.nobullet===true)){
      this.mybullet.shoot=true;
      this.mybullet.xb= this.posx;
      this.mybullet.yb= this.posy;  
      this.mybullet.dondedis= this.apuntando;

      this.socket.emit('bullet1', this.mybullet)

      this.fire = false
  }

  this.position= {
    posx: this.posx,
    posy: this.posy
  }
  
}

shootingboton(){
  if((this.fire === true) && (this.nobullet===true)){
    this.mybullet.shoot=true;
    this.mybullet.xb= this.posx;
    this.mybullet.yb= this.posy;  
    this.mybullet.dondedis= this.apuntando;

    this.socket.emit('bullet1',  this.mybullet)

    this.fire = false
}
}

camino(){

  let yrn=false;
  let vix =  this.posx;
  let viy =  this.posy;
  let numero_aleatorio;

  while(viy>0)
    {
      viy--;
      numero_aleatorio=this.p5.floor(this.p5.random(-1, 2));

      for(let n=0; n<this.ncel; n++){
        if(yrn=false)
        {
          if(this.laberinto[vix+n][viy]===0){
            yrn=true;
          } 
        }
      }
      if(yrn===false ){
        if((this.laberinto[vix-1][viy] || this.laberinto[vix+1][viy]) != 0){
          this.laberinto[vix+numero_aleatorio][viy]=1;
          this.laberinto[vix][viy]=1;
        }
        else{
          numero_aleatorio=0;
          this.laberinto[vix+numero_aleatorio][viy]=1;
        }
      }
      yrn=true;
      vix = vix+numero_aleatorio;
    }
  this.metax=vix;
  this.metay=viy;
}





cambiarPagina() {
  window.location.href = '../Screens/Congrats-screen/p5.html';
}

// socket.on('input', (input) => {
//   console.log(input);
//   switch (parseInt(input.key)) {

//     case 87: 

//     if(posy > 0 && move===true){

//       if(laberinto[posx][posy-1] != 0){
//         posy -= 1;

//       }
//     }
//     if(move===true){
//         apuntando=0;
//     }

//     break;

//     case 83: 

//     if(posy < tcanvas-t && move===true){

//       if(laberinto[posx][posy+1] != 0){
//         posy += 1;

//       }
//     }
//     if(move===true){
//         apuntando=2;
//     }

//     break;

//     case 65: 

//     if(posx > 0 && move===true){

//       if(laberinto[posx-1][posy] != 0){
//         posx -= 1;

//       }
//     }
//     if(move===true){
//         apuntando=3;
//     }

//     break;

//     case 68: 

//     if(posx < tcanvas-t && move===true){

//       if(laberinto[posx+1][posy] != 0){
//         posx += 1;
//       }
//     }
//     if(move===true){
//         apuntando=1;
//     }

//     break;

//     default:
//       console.log("nop");
//     break;
//   }
// })

}
