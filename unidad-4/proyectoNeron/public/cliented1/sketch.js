// cliented1/sketch.js
let socket;

// Variables para guardar los datos de interacción
let mouse = { x: 0, y: 0, isPressed: false };
let keysPressed = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect({ query: { type: 'cliented1' } });
}

function draw() {
    background(30, 10, 20);

    // --- CAPTURAR DATOS ---
    // 1. Mouse
    mouse.x = mouseX / width; // Normalizamos para que no dependa del tamaño de la ventana
    mouse.y = mouseY / height;
    mouse.isPressed = mouseIsPressed;

    // 2. Teclado (solo algunas teclas de ejemplo)
    keysPressed = [];
    if (keyIsDown(87)) keysPressed.push('W'); // W
    if (keyIsDown(65)) keysPressed.push('A'); // A
    if (keyIsDown(83)) keysPressed.push('S'); // S
    if (keyIsDown(68)) keysPressed.push('D'); // D

    // --- ENVIAR DATOS AL SERVIDOR ---
    const dataPacket = {
        mouse: mouse,
        keys: keysPressed
    };
    socket.emit('participantDataUpdate', dataPacket);


    // --- FEEDBACK VISUAL PARA EL USUARIO ---
    fill(255);
    textAlign(CENTER, CENTER);
    text("Mueve el mouse, haz clic y usa las teclas WASD", width / 2, 40);

    // Dibuja un círculo en la posición del mouse
    stroke(255);
    noFill();
    if (mouse.isPressed) {
        fill(255, 0, 150, 100);
    }
    ellipse(mouseX, mouseY, 80, 80);

    // Muestra las teclas presionadas
    fill(255);
    textSize(32);
    text(keysPressed.join(' '), width / 2, height - 50);
}