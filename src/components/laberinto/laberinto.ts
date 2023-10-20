let tcanvas = 500;
let t = 10;
let ncel = tcanvas/t;

let posx = 0;
let posy = 0;

let laberinto = [];

function setup() {
  createCanvas(tcanvas, tcanvas);
  noStroke();
  
  //array
  for(let x=0; x<ncel; x++){
    laberinto[x]=[];
    for(let y=0; y<ncel; y++){
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
  
}


function draw() {
  background(220);
  //laberinto
  for(let x=0; x<ncel; x++){
    for(let y=0; y<ncel; y++){
      if(laberinto[x][y]==0){
        fill(0);
      }else if(laberinto[x][y]==1){
        fill(255,243,221);
      }
      rect(x*t, y*t, t, t);
    }
  }
  
  //player
  fill(255,75,61);
  rect(posx * t, posy * t, t, t);
}


function keyPressed(){
  if((key === 'a' || key === 'A' || keyCode == LEFT_ARROW) && posx > 0){
    if(laberinto[posx-1][posy] != 0){
      posx -= 1;
    }
  }
  if((key === 'd' || key === 'D' || keyCode == RIGHT_ARROW) && posx < tcanvas-t){
    if(laberinto[posx+1][posy] != 0){
      posx += 1;
    }
  }
  if((key === 'w' || key === 'W' || keyCode == UP_ARROW) && posy > 0){
    if(laberinto[posx][posy-1] != 0){
      posy -= 1;
    }
  }
  if((key === 's' || key === 'S' || keyCode == DOWN_ARROW) && posy < tcanvas-t){
    if(laberinto[posx][posy+1] != 0){
      posy += 1;
    }
  }
}