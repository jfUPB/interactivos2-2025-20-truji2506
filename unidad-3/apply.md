# Unidad 3


## 🛠 Fase: Apply

### Actividad 3

### Ejercicio 1 

#### El código de la aplicación de control remoto.

#### index.html

```c
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Control Remoto</title>
  <script src="/socket.io/socket.io.js"></script>
  <style>
    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #111;
      color: white;
      font-family: Arial, sans-serif;
    }
    button {
      width: 80%;
      padding: 20px;
      margin: 10px;
      font-size: 24px;
      border: none;
      border-radius: 12px;
      color: white;
      cursor: pointer;
    }
    .rojo { background: #e74c3c; }
    .verde { background: #27ae60; }
    .azul { background: #2980b9; }
  </style>
</head>
<body>
  <h1>Control Remoto</h1>
  <button class="rojo" onclick="enviar('rojo')">Rojo</button>
  <button class="verde" onclick="enviar('verde')">Verde</button>
  <button class="azul" onclick="enviar('azul')">Azul</button>

  <script>
    const socket = io();

    function enviar(color) {
      socket.emit('message', color);
      console.log("Enviado:", color);
    }
  </script>
</body>
</html>
```

viewport: Hace que la página se adapte bien a pantallas pequeñas (celulares).

socket.io.js: Importa la librería cliente de Socket.IO, que permite la conexión en tiempo real con el servidor.

body: Centra todo el contenido en la pantalla y le da fondo negro.

button: Botones grandes, fáciles de tocar con el dedo en un celular.

.rojo, .verde, .azul: Cada clase da un color de fondo distinto al botón.

Título Control Remoto arriba.

3 botones grandes: uno rojo, uno verde y uno azul.

Cada botón, al hacer clic, llama a la función enviar(...) pasando el color correspondiente como argumento.
const socket = io(); → Se conecta al servidor usando Socket.IO.

enviar(color) → Cuando tocas un botón:

Envía un mensaje llamado "message" al servidor con el valor del color ("rojo", "verde", "azul").

También muestra en la consola del navegador lo que se envió (útil para debug).

#### sketch.js

```c
let socket;
let estado = 0;
let parametros = {};

function setup() {
  createCanvas(400, 200);
  background(220);

  // conectar al servidor
  socket = io();

  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(220);

  // Mostrar el estado actual
  text("Estado actual: " + estado, width / 2, 50);
  text("Presiona teclas 1,2,3... para cambiar estado", width / 2, 100);

  // Mostrar parámetros
  text("Parámetros: " + JSON.stringify(parametros), width / 2, 150);
}

function keyPressed() {
  // Cambiar de estado según la tecla
  if (key === '1') cambiarEstado(1);
  if (key === '2') cambiarEstado(2);
  if (key === '3') cambiarEstado(3);
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;

  // Simular parámetros dependiendo del estado
  if (estado === 1) {
    parametros = { velocidad: random(1, 5), color: [255, 0, 0] };
  } else if (estado === 2) {
    parametros = { velocidad: random(5, 10), color: [0, 0, 255] };
  } else if (estado === 3) {
    parametros = { velocidad: random(10, 20), color: [0, 255, 0], tam: random(50,150) };
  }

  // Enviar al servidor para que lo reciba la app de visuales
  socket.emit("cambiarEstado", { estado, parametros });
}
```

estado es como un "modo" de la visual.

parametros guarda configuraciones específicas según el estado.

Crea un canvas de 400x200 donde se muestra el estado actual.

Hace la conexión al servidor con socket = io();.

Configura texto centrado y tamaño de fuente.

Borra la pantalla y vuelve a dibujar (fondo gris).

Muestra en pantalla:

El estado actual.

Un mensaje de ayuda: “Presiona teclas 1,2,3...”

Los parámetros en formato JSON (ej: {velocidad: 5, color:[255,0,0]}).

Detecta si se presionó la tecla 1, 2 o 3.

Cambia el estado llamando a cambiarEstado().

Cambia el valor de estado.

Genera parámetros diferentes dependiendo del estado:

estado 1: velocidad entre 1 y 5, color rojo.

estado 2: velocidad entre 5 y 10, color azul.

estado 3: velocidad entre 10 y 20, color verde y tamaño aleatorio.

### Ejercicio 2

### El código de la aplicación de visuales.

#### index.html

```c
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js"></script>
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    <script src="sketch.js"></script>
    <title>Desktop p5.js Application</title>
    <script src="/socket.io/socket.io.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
<script src="sketchVisuales.js"></script> <!-- o sketchControlRemoto.js -->
</head>
<body></body>
</html>
```
#### scketch.js
```c
let socket;
let estado = "negro";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  socket = io();
  socket.on("message", (msg) => {
    console.log("Recibido:", msg);
    estado = msg;
  });
}

function draw() {
  background(0);

  fill(estado === "rojo" ? "red" :
       estado === "verde" ? "green" :
       estado === "azul" ? "blue" : "white");

  ellipse(width/2, height/2, 200, 200);
}
```

Se declara una variable socket (para conectarse al servidor con Socket.IO).

estado es el estado inicial, en este caso "negro".

setup() se ejecuta una sola vez al inicio.

Crea un lienzo que ocupa toda la pantalla.

Se conecta con el servidor (io()).

Cada vez que el servidor envía un evento "message", lo guarda en estado.
Ejemplo: si el servidor manda "rojo", ahora estado = "rojo".

draw() se ejecuta en bucle.

Pone el fondo negro.

Según lo que tenga la variable estado:

"rojo" → círculo rojo

"verde" → círculo verde

"azul" → círculo azul

cualquier otro valor → círculo blanco

El círculo se dibuja en el centro de la pantalla con 200 px de diámetro.

### Un enlace a un video de youtube donde demuestres el funcionamiento de las aplicaciones con todos los requisitos solicitados.

https://youtube.com/shorts/fJdSMvri29E?feature=share

### Imagenes de referencia

<img width="1915" height="907" alt="image" src="https://github.com/user-attachments/assets/7afe7d9f-39c3-4261-a00f-07df1420e553" />

![WhatsApp Image 2025-08-21 at 2 32 12 PM](https://github.com/user-attachments/assets/ea0c5a8f-c55d-43e0-a06b-0d086aa2e233)



