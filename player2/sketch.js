const socket = io.connect('http://localhost:5500/', {path: '/real-time'});

let timer = 200

let tcanvas = 1000;
let t = 20;
let ncel = tcanvas/t;

let posx = 0;
let posy = ncel - 2;

let xb =posx;
let yb= posy;

let enemyxb =posx;
let enemyyb= posy;

let golpe =3;
let logolpeo=false;

let laberinto = [];

let apuntando = 0;

let metax;
let metay;

let nobullet = true;

let shoot = false;
let enemyshoot = false;

let move = true;

let dondedis;
let dondedisenemy;

let position= {
  posx,
  posy,
  apuntando,
}

let enemypos= {
  posx,
  posy,
  apuntando,
}

let mybullet ={
  shoot,
  xb,
  yb,
  dondedis,
}

let enemybullet ={
  shoot,
  xb,
  yb,
  dondedis,
}

let fire = false;


function setup() {
  createCanvas(tcanvas, tcanvas+100);
  noStroke();
  
  //array
  for (let x = 0; x < ncel; x++) {
    laberinto[x] = [];
    for (let y = 0; y < ncel; y++) {
      laberinto[x][y] = 0;
    }
  }
  
  //definir lab
  for(let x=0; x<ncel; x+=2){
    for(let y=0; y<ncel; y+=2){
      laberinto[x][y] = 1;
      let vecinos = [];
      if(x<ncel){
        vecinos.push({x:x+1,y:y})
      }
      if(y<ncel){
        vecinos.push({x:x,y:y+1})
      }
      if(vecinos.length>0){
        let ve = vecinos[int(random(2))];
        laberinto[ve.x][ve.y] = 1;
      }
    }
  }
  
  for(let x=0; x<ncel; x+=1){
    for(let y=0; y<ncel; y+=1){
      if(x==0 || x==49){
        laberinto[x][y] = 0;
      }
      if(y==0 || y==49){
        laberinto[x][y] = 0;
      }
    }
  
  }

  // Inicializa la posición del jugador en la parte inferior y centrada
  posx = int(ncel / 2);
  posy = ncel - 2;

  position= {
    posx,
    posy,
    apuntando
  }
  
  laberinto[posx][posy] = 1;
  
  
  camino();
  
  socket.on('lab', (lab)=>{
    console.log ("recibiendo-lab:", lab)
    laberinto=lab;
  });
}


function draw() {
  // socket.on('lab', (lab)=>{
  //   console.log ("recibiendo-lab:", lab)
  //   laberinto=lab;
  // });
  background(220);

  //laberinto
  for(let x=0; x<ncel; x++){
    for(let y=0; y<ncel; y++){
      if(laberinto[x][y]==0){
        fill(42,71,71);
      }else if(laberinto[x][y]==1){
        fill(255,243,221);
      }
      rect(x*t, y*t, t, t);
    }
    fill(0,0,0);
  }


  
  //ganaste meta
  
  fill(255,75,61);
  rect(metax*t,metay*t,t,t);
  
  if (posx==metax && posy==metay) {
    textSize(70);
    textAlign(CENTER, CENTER);
    text("¡You Win!",tcanvas/2,tcanvas/2);
    move=false;
  }
  

  //player
  position= {
    posx,
    posy,
    apuntando
  }
fill(255,75,61);
 ellipse(posx * t + (t/2), posy * t + (t/2), t, t);
 socket.emit('position2', position);

  //contador
  textAlign(CENTER, CENTER);
  textSize(50);
  text("TIMER: "+ timer, width/2, height/1.05);
  

  if (timer == 0) {
    text("GAME OVER", width/2, height*0.7);
    move=false;
  }

  if(apuntando==0){
    fill(36, 113, 163 );
    rect(posx * t + (t/4), posy * t-5, t-10, t)
  }
  else if(apuntando==1){
    fill(36, 113, 163 );
    rect(posx * t + (t/4), posy * t+5, t, t-10)
  }
  else if(apuntando==2){
    fill(36, 113, 163 );
    rect(posx * t + (t/4), posy * t+5, t-10, t)
  }
  else if(apuntando==3){
    fill(36, 113, 163 );
    rect(posx * t - (t/4), posy * t+5, t, t-10)
  }

  //shoot bullet
  
  if(mybullet.shoot === true){
    fill(255,75,61);
    ellipse(mybullet.xb * t + (t/2), mybullet.yb * t + (t/2), t, t)
  }

  if (mybullet.dondedis===0){
    mybullet.yb -= 0.5;
  } 
  if(mybullet.dondedis===2){
    mybullet.yb += 0.5;
  }
  if(mybullet.dondedis===3){
    mybullet.xb -= 0.5;
  }
  if(mybullet.dondedis===1){
    mybullet.xb += 0.5;
  }

  shootingboton();

//enemy
fill(175, 122, 197 );
ellipse(enemypos.posx * t + (t/2), enemypos.posy * t + (t/2), t, t);

//canon enemigo
if(enemypos.apuntando==0){
  fill(36, 113, 163 );
  rect(enemypos.posx * t + (t/4), enemypos.posy * t-5, t-10, t)
}
else if(enemypos.apuntando==1){
  fill(36, 113, 163 );
  rect(enemypos.posx * t + (t/4), enemypos.posy * t+5, t, t-10)
}
else if(enemypos.apuntando==2){
  fill(36, 113, 163 );
  rect(enemypos.posx * t + (t/4), enemypos.posy * t+5, t-10, t)
}
else if(enemypos.apuntando==3){
  fill(36, 113, 163 );
  rect(enemypos.posx * t - (t/4), enemypos.posy * t+5, t, t-10)
}

  //enemy shoot


  if(enemybullet.shoot === true ){
    fill(175, 122, 197 );
    ellipse(enemybullet.xb * t + (t/2), enemybullet.yb * t + (t/2), t, t)
  }

  if (enemybullet.dondedis===0){
    enemybullet.yb -= 0.5;
  } 
  if(enemybullet.dondedis===2){
    enemybullet.yb += 0.5;
  }
  if(enemybullet.dondedis===3){
    enemybullet.xb -= 0.5;
  }
  if(enemybullet.dondedis===1){
    enemybullet.xb += 0.5;
  }

 //golpeo

 if(logolpeo === true){
  fill(175, 122, 197 );
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Incapacitado por "+golpe+" seg", width/2, height*0.7);
  move=false;
  if (frameCount % 60 == 0 && golpe > 0) {
    golpe --;
  }
}

if(golpe===0){
  move=true;
  logolpeo = false;
}



if((enemybullet.xb === posx) && (enemybullet.yb === posy)){
  logolpeo = true;
  golpe = 3;
}
if (posx == metax && posy == metay) {
  // Has llegado al final
  textSize(70);
  textAlign(CENTER, CENTER);
  text("¡You Win!", tcanvas / 2, tcanvas / 2);

  // Espera 5 segundos y luego cambia la pantalla
  setTimeout(() => {
    cambiarPagina();
  }, 5000);
}
}


function keyPressed(){
  if((key === 'a' || key === 'A' || keyCode == LEFT_ARROW) && posx > 0 && move===true){
    if(laberinto[posx-1][posy] != 0){
      posx -= 1;
      socket.emit('keyPressed', 'A');
    }
  }
  if((key === 'a' || key === 'A' || keyCode == LEFT_ARROW) && move===true){
      apuntando=3;
  }
  if((key === 'd' || key === 'D' || keyCode == RIGHT_ARROW) && posx < tcanvas-t && move===true){
    if(laberinto[posx+1][posy] != 0){
      posx += 1;
      socket.emit('keyPressed', 'D');

    }
  }
  if((key === 'd' || key === 'D' || keyCode == RIGHT_ARROW) && move===true){
    apuntando=1;
  }
  if((key === 'w' || key === 'W' || keyCode == UP_ARROW) && posy > 0 && move===true){
    if(laberinto[posx][posy-1] != 0){
      posy -= 1;
      fill(0,0,0);
      socket.emit('keyPressed', 'W');

    }
  }
  if((key === 'w' || key === 'W' || keyCode == UP_ARROW) && move===true){
      apuntando=0;
  }

  if((key === 's' || key === 'S' || keyCode == DOWN_ARROW) && posy < tcanvas-t && move===true){
    if(laberinto[posx][posy+1] != 0){
      posy += 1;
      socket.emit('keyPressed', 'S');
    }
  }
  if((key === 's' || key === 'S' || keyCode == DOWN_ARROW) && move===true){
      apuntando=2;
  }
    if((keyCode === 32) && (nobullet===true)){
      mybullet.shoot=true;
      mybullet.xb=posx;
      mybullet.yb=posy;  
      mybullet.dondedis=apuntando;

      socket.emit('bullet2', mybullet)
  }

  position= {
    posx,
    posy
  }
}

function shootingboton(){
  if((fire === true) && (nobullet===true)){
    mybullet.shoot=true;
    mybullet.xb=posx;
    mybullet.yb=posy;  
    mybullet.dondedis=apuntando;

    socket.emit('bullet2', mybullet)

    fire = false
}
}

function camino(){

  let yrn=false;
  let vix = posx;
  let viy = posy;
  let n = 0;
  let numero_aleatorio;

  while(viy>0)
    {
      viy--;
      numero_aleatorio=floor(random(-1, 2));

      for(let n=0; n<ncel; n++){
        if(yrn=false)
        {
          if(laberinto[vix+n][viy]===0){
            yrn=true;
          } 
        }
      }
      if(yrn===false ){
        if((laberinto[vix-1][viy] || laberinto[vix+1][viy]) != 0){
        laberinto[vix+numero_aleatorio][viy]=1;
        laberinto[vix][viy]=1;
        }
        else{
          numero_aleatorio=0;
          laberinto[vix+numero_aleatorio][viy]=1;
        }
      }
      yrn=true;
      vix = vix+numero_aleatorio;
    }
  metax=vix;
  metay=viy;
}



socket.on('position1', (enemy)=>{
  console.log ("recibiendo-position1:", enemy)
  enemypos=enemy;
});

socket.on('time', (t)=>{
  console.log ("recibiendo-time:", t)
  timer=t;
});

socket.on('bullet1', (b)=>{
  console.log ("recibiendo-bullet1:", b)
  enemybullet=b;
  
});

socket.on('tap2', (tap)=>{
  console.log ("recibiendo-tap2:", tap)
  fire=tap;
});

function cambiarPagina() {
  window.location.href = '../Screens/Sorry-screen/p5.html';
}

