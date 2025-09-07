// clientem1/sketch.js
let socket;

// Variables para guardar los datos de interacción
let gyro = { x: 0, y: 0, z: 0 };
let currentTouches = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Para pedir permiso para el giroscopio en iOS
    DeviceOrientationEvent.requestPermission?.();

    socket = io.connect({ query: { type: 'clientem1' } });
}

function draw() {
    background(10, 20, 30); // Fondo oscuro

    // --- CAPTURAR DATOS ---
    // 1. Giroscopio (rotación del dispositivo)
    gyro.x = rotationX;
    gyro.y = rotationY;
    gyro.z = rotationZ;
    
    // 2. Toques (p5 guarda los toques en la variable `touches`)
    currentTouches = touches.map(t => ({ x: t.x / width, y: t.y / height }));

    // --- ENVIAR DATOS AL SERVIDOR ---
    const dataPacket = {
        gyro: gyro,
        touches: currentTouches
    };
    socket.emit('participantDataUpdate', dataPacket);

    // --- FEEDBACK VISUAL PARA EL USUARIO ---
    fill(255);
    textAlign(CENTER, CENTER);
    text("Mueve tu dispositivo y toca la pantalla", width / 2, 40);

    // Dibuja un orbe que reacciona al giroscopio
    let orbX = map(gyro.y, -90, 90, 0, width);
    let orbY = map(gyro.x, -90, 90, 0, height);
    fill(255, 204, 0, 150);
    noStroke();
    ellipse(orbX, orbY, 80, 80);

    // Dibuja círculos donde el usuario está tocando
    for (let touch of touches) {
        fill(0, 150, 255, 200);
        ellipse(touch.x, touch.y, 60, 60);
    }
}