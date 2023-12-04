const socket = io.connect('http://localhost:5500/', {path: '/real-time'});


let boton = {
  x:100,
  y:100,
  size: 800
}

let yes = false;

function setup() {
  createCanvas(1000, 1000);
  noStroke();
 
  
}


function draw() {
  background(0,0,0);

  fill(175, 122, 197 );
  rect(boton.x,boton.y,boton.size,boton.size)
  
 if(yes===true){
  fill(250, 250, 250 );
  textAlign(CENTER, CENTER);
  textSize(200  );
  text("BANG",500,500);
  yes=false;
}

  seleccion();
}


function mouseClicked() {
  if (mouseX >= boton.x && mouseX <= boton.x + boton.size && mouseY >= boton.y && mouseY <= boton.y + boton.size) {
    yes=true;
    socket.emit("tap1", yes)
    }
}

function seleccion() {
  if (mouseX >= boton.x && mouseX <= boton.x + boton.size && mouseY >= boton.y && mouseY <= boton.y + boton.size) {
    cursor(HAND);
  }
  else {
    cursor(ARROW);
    }
}