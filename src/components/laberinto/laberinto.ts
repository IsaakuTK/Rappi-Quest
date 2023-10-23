// let timer = 15

// let tcanvas = 500;
// let t = 10;
// let ncel = tcanvas/t;

// let posx = 0;
// let posy = ncel - 2;

// let laberinto = [];


// let metax;
// let metay;

// let move = true;

// function setup() {
//   createCanvas(tcanvas, tcanvas+100);
//   noStroke();
  
//   //array
//   for (let x = 0; x < ncel; x++) {
//     laberinto[x] = [];
//     for (let y = 0; y < ncel; y++) {
//       laberinto[x][y] = 0;
//     }
//   }
  
//   //definir lab
//   for(let x=0; x<ncel; x+=2){
//     for(let y=0; y<ncel; y+=2){
//       laberinto[x][y] = 1;
//       let vecinos = [];
//       if(x<ncel){
//         vecinos.push({x:x+1,y:y})
//       }
//       if(y<ncel){
//         vecinos.push({x:x,y:y+1})
//       }
//       if(vecinos.length>0){
//         let ve = vecinos[int(random(2))];
//         laberinto[ve.x][ve.y] = 1;
//       }
//     }
//   }
  
//   for(let x=0; x<ncel; x+=1){
//     for(let y=0; y<ncel; y+=1){
//       if(x==0 || x==49){
//         laberinto[x][y] = 0;
//       }
//       if(y==0 || y==49){
//         laberinto[x][y] = 0;
//       }
//     }
  
//   }



//   // Inicializa la posición del jugador en la parte inferior y centrada
//   posx = int(ncel / 2);
//   posy = ncel - 2;
  
//   laberinto[posx][posy] = 1;
  
  
//   camino()
  
// }


// function draw() {
//   background(220);
//   //laberinto
//   for(let x=0; x<ncel; x++){
//     for(let y=0; y<ncel; y++){
//       if(laberinto[x][y]==0){
//         fill(42,71,71);
//       }else if(laberinto[x][y]==1){
//         fill(255,243,221);
//       }
//       rect(x*t, y*t, t, t);
//     }
//   }

  
//   //ganaste meta
  
//   fill(255,75,61);
//   rect(metax*t,metay*t,t,t);
  
//   if (posx==metax && posy==metay) {
//     textSize(70);
//     textAlign(CENTER, CENTER);
//     text("¡You Win!",tcanvas/2,tcanvas/2);
//     move=false;
//   }
  
//   //player
//   fill(255,75,61);
//   ellipse(posx * t + (t/2), posy * t + (t/2), t, t);
  
//   //contador
//   textAlign(CENTER, CENTER);
//   textSize(50);
//   text(timer, width/2, height/1.1);
  
//   if (frameCount % 60 == 0 && timer > 0 && move===true) {
//     timer --;
//   }
//   if (timer == 0) {
//     text("GAME OVER", width/2, height*0.7);
//     move=false;
//   }
// }


// function keyPressed(){
//   if((key === 'a' || key === 'A' || keyCode == LEFT_ARROW) && posx > 0 && move===true){
//     if(laberinto[posx-1][posy] != 0){
//       posx -= 1;
//     }
//   }
//   if((key === 'd' || key === 'D' || keyCode == RIGHT_ARROW) && posx < tcanvas-t && move===true){
//     if(laberinto[posx+1][posy] != 0){
//       posx += 1;
//     }
//   }
//   if((key === 'w' || key === 'W' || keyCode == UP_ARROW) && posy > 0 && move===true){
//     if(laberinto[posx][posy-1] != 0){
//       posy -= 1;
//     }
//   }
//   if((key === 's' || key === 'S' || keyCode == DOWN_ARROW) && posy < tcanvas-t && move===true){
//     if(laberinto[posx][posy+1] != 0){
//       posy += 1;
//     }
//   }
// }


// function camino(){

//   let yrn=false;
//   let vix = posx;
//   let viy = posy;
//   let n = 0;
//   let numero_aleatorio;
  
//   while(viy>0)
//     {
//       viy--;
//       numero_aleatorio=floor(random(-1, 2));
      
//       for(let n=0; n<ncel; n++){
//         if(yrn=false)
//         {
//           if(laberinto[vix+n][viy]===0){
//             yrn=true;
//           } 
//         }
//       }
//       if(yrn===false ){
//         if((laberinto[vix-1][viy] || laberinto[vix+1][viy]) !=0){
//         laberinto[vix+numero_aleatorio][viy]=1;
//         }
//         else{
//           numero_aleatorio=0;
//           laberinto[vix+numero_aleatorio][viy]=1;
//         }
//       }
//       yrn=true;
//       vix = vix+numero_aleatorio;
//     }
//   metax=vix;
//   metay=viy;
// }

let timer: number = 30;

let tcanvas: number = 500;
let t: number = 10;
let ncel: number = tcanvas / t;

let posx: number = 0;
let posy: number = ncel - 2;

let laberinto: number[][] = [];

let metax: number;
let metay: number;

let move: boolean = true;

function setup() {
  createCanvas(tcanvas, tcanvas + 100);
  noStroke();

  // Array
  for (let x: number = 0; x < ncel; x++) {
    laberinto[x] = [];
    for (let y: number = 0; y < ncel; y++) {
      laberinto[x][y] = 0;
    }
  }

  // Define the maze
  for (let x: number = 0; x < ncel; x += 2) {
    for (let y: number = 0; y < ncel; y += 2) {
      laberinto[x][y] = 1;
      let vecinos: { x: number; y: number }[] = [];
      if (x < ncel) {
        vecinos.push({ x: x + 1, y: y });
      }
      if (y < ncel) {
        vecinos.push({ x: x, y: y + 1 });
      }
      if (vecinos.length > 0) {
        let ve: { x: number; y: number } = vecinos[Math.floor(Math.random() * 2)];
        laberinto[ve.x][ve.y] = 1;
      }
    }
  }

  for (let x: number = 0; x < ncel; x += 1) {
    for (let y: number = 0; y < ncel; y += 1) {
      if (x == 0 || x == 49) {
        laberinto[x][y] = 0;
      }
      if (y == 0 || y == 49) {
        laberinto[x][y] = 0;
      }
    }
  }

  // Initialize the player's position at the bottom and centered
  posx = Math.floor(ncel / 2);
  posy = ncel - 2;

  laberinto[posx][posy] = 1;

  camino();
}

function draw() {
  background(220);
  // Maze
  for (let x: number = 0; x < ncel; x++) {
    for (let y: number = 0; y < ncel; y++) {
      if (laberinto[x][y] == 0) {
        fill(42, 71, 71);
      } else if (laberinto[x][y] == 1) {
        fill(255, 243, 221);
      }
      rect(x * t, y * t, t, t);
    }
  }

  // Win condition
  fill(255, 75, 61);
  rect(metax * t, metay * t, t, t);

  if (posx == metax && posy == metay) {
    textSize(70);
    textAlign(CENTER, CENTER);
    text("You Win!", tcanvas / 2, tcanvas / 2);
    move = false;
  }

  // Player
  fill(255, 75, 61);
  ellipse(posx * t + (t / 2), posy * t + (t / 2), t, t);

  // Counter
  textAlign(CENTER, CENTER);
  textSize(50);
  text(timer, width / 2, height / 1.1);

  if (frameCount % 60 == 0 && timer > 0 && move === true) {
    timer--;
  }
  if (timer == 0) {
    text("GAME OVER", width / 2, height * 0.7);
    move = false;
  }
}

function keyPressed() {
  if (
    (key === 'a' || key === 'A' || keyCode == LEFT_ARROW) &&
    posx > 0 &&
    move === true
  ) {
    if (laberinto[posx - 1][posy] != 0) {
      posx -= 1;
    }
  }
  if (
    (key === 'd' || key === 'D' || keyCode == RIGHT_ARROW) &&
    posx < tcanvas - t &&
    move === true
  ) {
    if (laberinto[posx + 1][posy] != 0) {
      posx += 1;
    }
  }
  if (
    (key === 'w' || key === 'W' || keyCode == UP_ARROW) &&
    posy > 0 &&
    move === true
  ) {
    if (laberinto[posx][posy - 1] != 0) {
      posy -= 1;
    }
  }
  if (
    (key === 's' || key === 'S' || keyCode == DOWN_ARROW) &&
    posy < tcanvas - t &&
    move === true
  ) {
    if (laberinto[posx][posy + 1] != 0) {
      posy += 1;
    }
  }
}

function camino() {
  let yrn: boolean = false;
  let vix: number = posx;
  let viy: number = posy;
  let n: number = 0;
  let numero_aleatorio: number;

  while (viy > 0) {
    viy--;
    numero_aleatorio = Math.floor(Math.random() * 3) - 1;

    for (let n: number = 0; n < ncel; n++) {
      if (yrn === false) {
        if (laberinto[vix + n][viy] === 0) {
          yrn = true;
        }
      }
    }
    if (yrn === false) {
      if (
        laberinto[vix - 1][viy] === 0 ||
        laberinto[vix + 1][viy] === 0
      ) {
        laberinto[vix + numero_aleatorio][viy] = 1;
      } else {
        numero_aleatorio = 0;
        laberinto[vix + numero_aleatorio][viy] = 1;
      }
    }
    yrn = true;
    vix = vix + numero_aleatorio;
  }
  metax = vix;
  metay = viy;
}
