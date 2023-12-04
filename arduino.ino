const int pinBotonArriba = 2;
const int pinBotonIzquierda = 3;
const int pinBotonAbajo = 4;
const int pinBotonDerecha = 5;

int w = 87;
int a = 65;
int s = 83;
int d = 68;

char personaje = '*';

// Function prototype
void moverPersonaje(char direccion);

void setup() {
  pinMode(pinBotonArriba, INPUT);
  pinMode(pinBotonIzquierda, INPUT);
  pinMode(pinBotonAbajo, INPUT);
  pinMode(pinBotonDerecha, INPUT);

  Serial.begin(9600);
}

void loop() {
  // Leer el estado de los botones
  int estadoBotonArriba = digitalRead(pinBotonArriba);
  int estadoBotonIzquierda = digitalRead(pinBotonIzquierda);
  int estadoBotonAbajo = digitalRead(pinBotonAbajo);
  int estadoBotonDerecha = digitalRead(pinBotonDerecha);

  // Enviar comandos al Arduino a través del puerto serie
  if (estadoBotonArriba == HIGH) {

    Serial.println(w);
  }
  if (estadoBotonIzquierda == HIGH) {

    Serial.println(a);
  }
  if (estadoBotonAbajo == HIGH) {

    Serial.println(s);
  }
  if (estadoBotonDerecha == HIGH) {

    Serial.println(d);
  }

  delay(800);
}
