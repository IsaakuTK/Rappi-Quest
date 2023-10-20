let sizec=500; 

let sizecharacter=50;
let nucel = sizec/sizecharacter
let initialX=0;
let initialY=0;


let laberinto;


function setup() {
  createCanvas(sizec, sizec);
  noStroke();
  
    laberinto = [];
  for (let x=0;x<nucel;x++) {
    laberinto[x] = [];
    for (let y=0;y<nucel;y++) {
      laberinto[x][y] = Math.floor(Math.random() * 2);
    }
  }
}

function draw() {
  background(255);
  
  //laberinto
  for(let x=0; x<nucel; x++){
    for(let y=0; y<nucel; y++){
      if(laberinto[x][y]==0){
        fill(0)
      }else if(laberinto[x][y]==1){
        fill(255,243,221)
      }
      rect(x*sizecharacter, y*sizecharacter, sizecharacter, sizecharacter);
    }   
  }
  
  //personaje
  fill(255,128,0)
  rect (initialX,initialY, sizecharacter, sizecharacter);
  
}

function keyPressed(){
  if(key === 'w' || key === 'W' || keyCode == UP_ARROW && initialY > 0){
    if (laberinto[initialX][initialY-1] != 0) {
      console.table(laberinto[initialX][initialY-1]);
      initialY -= sizecharacter;
    }
  }
  else if(key === 's' || key === 'S' || keyCode == DOWN_ARROW && initialY < nucel-1){
    if (laberinto[initialX][initialY+1] != 0) {
      console.table(laberinto[initialX][initialY+1]);
      initialY += sizecharacter;
    }
  }
  else if(key === 'a' || key === 'A' || keyCode == LEFT_ARROW && initialX > 0){
    if (laberinto[initialX-1][initialY] != 0) {
      console.table(laberinto[initialX-1][initialY]);
      initialX -= sizecharacter;
    }
    
  }
  else if(key === 'd' || key === 'D' || keyCode == RIGHT_ARROW && initialY < nucel-1){
    if (laberinto[initialX+1][initialY] != 0) {
      console.table(laberinto[initialX+1][initialY]);
      initialX += sizecharacter;
    }
  }
}