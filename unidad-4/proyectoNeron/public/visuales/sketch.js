// visuales/sketch.js

let socket;
let gameState = { phase: 1, participants: {} };
let currentPhase = 0;

// Objeto para manejar la lógica y variables de cada fase
const phases = {
    1: {
        vars: {}, // Variables específicas de la fase
        setup: setupPhase1,
        draw: drawPhase1,
        cleanup: cleanupPhase1,
        helpers: {} // Funciones auxiliares
    },
    2: {
        vars: {},
        setup: setupPhase2,
        draw: drawPhase2,
        cleanup: cleanupPhase2,
        classes: {} // Clases de la fase
    },
    3: {
        vars: {},
        setup: setupPhase3,
        draw: drawPhase3,
        cleanup: cleanupPhase3,
        classes: {}
    }
};

// ==================== SETUP Y DRAW PRINCIPALES ====================

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    socket = io.connect({ query: { type: 'visuales' } });

    socket.on('stateUpdate', (data) => {
        gameState = data;
    });

    socket.on('phaseChanged', (newPhase) => {
        if (newPhase !== currentPhase) {
            phases[currentPhase]?.cleanup(); // Limpiar la fase anterior
            currentPhase = newPhase;
            phases[currentPhase].setup(); // Configurar la nueva fase
        }
    });

    socket.on('renderClick', (clickData) => {
        if (currentPhase === 3) {
            let v = phases[3].vars;
            let lado = clickData.x > 0.5 ? "oro" : "alquitran";
            let palabra = random(["recuerdo", "latido", "sombra", "eco", "memoria"]);
            v.palabras.push(new phases[3].classes.Palabra(clickData.x * width, clickData.y * height, palabra, lado));
        }
    });

    // Iniciar la primera fase
    currentPhase = 1;
    phases[1].setup();
}

function draw() {
    if (phases[currentPhase]) {
        phases[currentPhase].draw();
    }
}

// ===================================================================
// ==================== FASE 1: ESPEJO DE ENERGÍA ====================
// ===================================================================

function setupPhase1() {
    console.log("Configurando Fase 1: Espejo de Energía");
    let v = phases[1].vars;
    v.video = createCapture(VIDEO);
    v.video.size(width, height);
    v.video.hide();
    v.prevFrame = createImage(width, height);
    v.bgFrame = createImage(width, height);
    v.maskImg = createImage(width, height);
    v.holoImg = createImage(width, height);
    v.trails = createGraphics(width, height);
    v.trails.pixelDensity(1);
    v.trails.background(0);
    v.trails.noStroke();

    // Esperar a que el video cargue para inicializar el fondo
    v.video.elt.onloadeddata = () => {
        v.bgFrame.copy(v.video, 0, 0, width, height, 0, 0, width, height);
    };
}

function drawPhase1() {
    let v = phases[1].vars;
    if (!v.video.loadedmetadata) return; // Esperar a que el video esté listo

    // --- ADAPTACIÓN: Controlar variables con datos de los participantes ---
    let avgP1 = 0, avgP2 = 0, avgP3 = 0;
    let count = Object.keys(gameState.participants).length;
    if (count > 0) {
        for (let id in gameState.participants) {
            let p_data = gameState.participants[id].data;
            if (p_data.gyro) { // Móvil
                avgP1 += map(abs(p_data.gyro.x), 0, 90, 0, 255);
                avgP2 += map(p_data.touches.length, 0, 2, 0, 255);
            }
            if (p_data.mouse) { // Desktop
                avgP1 += map(p_data.mouse.x, 0, 1, 0, 255);
                avgP2 += p_data.mouse.isPressed ? 255 : 0;
            }
        }
        avgP1 /= count; avgP2 /= count; avgP3 /= count;
    }

    v.threshold = map(avgP1, 0, 255, 20, 80);
    v.fadeStrength = map(avgP2, 0, 255, 0.80, 0.98);
    v.paletteIndex = floor(map(avgP3, 0, 255, 0, 4));
    v.mode = (avgP2 > 127) ? 2 : 1;

    background(20, 20, 50);
    fill(255);
    textAlign(LEFT, TOP);
    text("FASE 1: ESPEJO DE ENERGÍA", 20, 20);
    text(`Participantes: ${count}`, 20, 40);
    text(`Umbral: ${v.threshold.toFixed(2)}`, 20, 60);
    text(`Estela: ${v.fadeStrength.toFixed(2)}`, 20, 80);

    v.prevFrame.copy(v.video, 0, 0, width, height, 0, 0, width, height);
}

function cleanupPhase1() {
    console.log("Limpiando Fase 1");
    phases[1].vars.video.stop(); // Liberar la cámara
}

// ===================================================================
// ==================== FASE 2: ESCENA NOSTÁLGICA ====================
// ===================================================================

function setupPhase2() {
    console.log("Configurando Fase 2");
    let v = phases[2].vars;
    v.mic = new p5.AudioIn();
    v.mic.start();
    v.fft = new p5.FFT();
    v.fft.setInput(v.mic);
    v.particles = [];
    for (let i = 0; i < 150; i++) {
        v.particles.push(new Particle());
    }
}

function drawPhase2() {
    let v = phases[2].vars;
    background(10, 20, 30, 120);
    let energy = v.fft.getEnergy("mid");

    for (let p of v.particles) {
        p.update();
        p.display(energy);
    }
}

function cleanupPhase2() {
    console.log("Limpiando Fase 2");
    phases[2].vars.mic.stop(); // Liberar el micrófono
}

// ===================================================================
// ==================== FASE 3: ORO Y ALQUITRÁN ======================
// ===================================================================

function setupPhase3() {
    console.log("Configurando Fase 3");
    let v = phases[3].vars;
    v.palabras = [];
}

function drawPhase3() {
    let v = phases[3].vars;
    background(15, 15, 20);
    for (let p of v.palabras) {
        p.update();
        p.display();
    }
}

function cleanupPhase3() {
    console.log("Limpiando Fase 3");
}