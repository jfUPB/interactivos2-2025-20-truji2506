# Evidencias de la unidad 4

## Solución Unidad 4

## Actividad 3 

### Fase I – “Somático / Cuarto desordenado” (0:02–0:36 aprox.) 

Input: amplitud/tono de voz (o RMS del track), micro‑movimientos de móvil (accel bajo), mouse lento del cliente web. 
Process: niebla/partículas lentas; fracturas/fotos rotas emergen cuando la voz sube o hay keywords (simuladas con umbrales); física amortiguada. 
Output: domo/pantalla fría (azules/grises), texto fantasma bajo umbral, atmósfera de vacío en cámara lenta. 

#### Sketch.js
```c
let video, prevFrame, bgFrame;
let threshold = 40;
let learnRate = 0.01;
let hud = true;

// visual / interacción
let mode = 1;              // 1 = Holograma, 2 = Pincel de luz
let fadeStrength = 0.88;   // 0.80–0.96 sugerido (persistencia de estela)
let trails;                // capa para estelas / composición
let paletteIndex = 0;

// buffers de trabajo
let maskImg;               // máscara de movimiento (0/255)
let holoImg;               // video teñido + recortado por máscara

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  prevFrame = createImage(width, height);
  bgFrame   = createImage(width, height);
  maskImg   = createImage(width, height);
  holoImg   = createImage(width, height);

  trails = createGraphics(width, height);
  trails.pixelDensity(1);
  trails.background(0);
  trails.noStroke();

  // Inicializar fondo
  video.loadPixels();
  bgFrame.loadPixels();
  for (let i = 0; i < video.pixels.length; i++) {
    bgFrame.pixels[i] = video.pixels[i];
  }
  bgFrame.updatePixels();
}

function draw() {
  background(0);

  // Cargar buffers
  video.loadPixels();
  prevFrame.loadPixels();
  bgFrame.loadPixels();
  maskImg.loadPixels();
  holoImg.loadPixels();

  let energy = 0; // porcentaje de píxeles activos (para HUD/ efectos sutiles)

  // 1) Construir máscara de movimiento + actualizar fondo
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = 4 * (y * width + x);

      let r  = video.pixels[i + 0];
      let g  = video.pixels[i + 1];
      let b  = video.pixels[i + 2];

      let rB = bgFrame.pixels[i + 0];
      let gB = bgFrame.pixels[i + 1];
      let bB = bgFrame.pixels[i + 2];

      let rP = prevFrame.pixels[i + 0];
      let gP = prevFrame.pixels[i + 1];
      let bP = prevFrame.pixels[i + 2];

      // Diferencias (combinadas)
      let dBG = (abs(r - rB) + abs(g - gB) + abs(b - bB)) / 3;
      let dFD = (abs(r - rP) + abs(g - gP) + abs(b - bP)) / 3;
      let motion = (dBG * 0.6 + dFD * 0.4);

      // Máscara binaria
      let a = (motion > threshold) ? 255 : 0;
      maskImg.pixels[i + 0] = a;
      maskImg.pixels[i + 1] = a;
      maskImg.pixels[i + 2] = a;
      maskImg.pixels[i + 3] = 255;

      if (a === 255) energy++;

      // Actualiza fondo (running average)
      bgFrame.pixels[i + 0] = (1 - learnRate) * rB + learnRate * r;
      bgFrame.pixels[i + 1] = (1 - learnRate) * gB + learnRate * g;
      bgFrame.pixels[i + 2] = (1 - learnRate) * bB + learnRate * b;
      bgFrame.pixels[i + 3] = 255;

      // Prepara imagen “holograma”: teñe el video y aplica alpha de máscara
      // Paleta llamativa controlada por tiempo
      let col = paletteColor(r, g, b, frameCount * 0.02);

      holoImg.pixels[i + 0] = col[0];
      holoImg.pixels[i + 1] = col[1];
      holoImg.pixels[i + 2] = col[2];
      holoImg.pixels[i + 3] = a; // recorte por movimiento
    }
  }
  maskImg.updatePixels();
  bgFrame.updatePixels();
  holoImg.updatePixels();

  // 2) Modo visual
  // Atenuar estelas (persistencia controlada por fadeStrength)
  trails.push();
  trails.noStroke();
  trails.fill(0, 0, 0, map(1 - fadeStrength, 0, 1, 0, 255));
  trails.rect(0, 0, width, height);
  trails.pop();

  if (mode === 1) {
    // Modo Holograma: mezcla del holograma con estelas sutiles
    trails.push();
    trails.blendMode(ADD);
    trails.image(holoImg, 0, 0);
    trails.pop();
  } else {
    // Modo Pincel de Luz: dibuja “pinceladas” sólo donde hay movimiento
    // Pintamos a baja resolución para ganar rendimiento y estética de “píxel-brush”
    let step = 4; // tamaño del pincel base (sube para más bloque grande)
    maskImg.loadPixels();

    trails.push();
    trails.noStroke();
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        let i = 4 * (y * width + x);
        if (maskImg.pixels[i] > 0) {
          let v = noise(x * 0.01, y * 0.01, frameCount * 0.01); // variación suave
          let sz = step + v * 6; // pincel respira
          let col = paletteColor(
            video.pixels[i+0],
            video.pixels[i+1],
            video.pixels[i+2],
            frameCount * 0.02 + v
          );
          trails.fill(col[0], col[1], col[2], 200);
          trails.ellipse(x, y, sz, sz);
        }
      }
    }
    trails.pop();
  }

  // 3) Composición final
  image(trails, 0, 0);

  // 4) Guardar frame actual como previo
  prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);

  // 5) HUD
  if (hud) drawHUD(energy / (width * height));
}

// Paletas de color llamativas (elige con 'C')
function paletteColor(r, g, b, t) {
  // base del video + desplazamientos por paleta
  switch (paletteIndex % 4) {
    case 0: // NEÓN (cian-magenta)
      return [
        (0.3 * r + 180 + 40 * sin(t)) % 255,
        (0.3 * g + 60 + 60 * sin(t + 1.6)) % 255,
        (0.8 * b + 200 + 50 * sin(t + 0.8)) % 255
      ];
    case 1: // FUEGO
      return [
        (0.9 * r + 120 * sin(t + 0.3)) % 255,
        (0.4 * g + 80  * sin(t + 1.1)) % 255,
        (0.2 * b + 30  * sin(t + 2.0)) % 255
      ];
    case 2: // HIELO
      return [
        (0.2 * r + 30  * sin(t + 2.2)) % 255,
        (0.6 * g + 140 * sin(t + 0.7)) % 255,
        (0.9 * b + 190 * sin(t + 1.4)) % 255
      ];
    case 3: // ARCOÍRIS SUAVE
      return [
        (128 + 127 * sin(t + 0.0)) % 255,
        (128 + 127 * sin(t + 2.1)) % 255,
        (128 + 127 * sin(t + 4.2)) % 255
      ];
  }
}

function drawHUD(energy) {
  push();
  noStroke();
  fill(255);
  rect(8, 8, 310, 120, 8);
  fill(0);
  textStyle(BOLD);
  text("MIDAS", 16, 28);
  textStyle(NORMAL);
  text(
    "Modo: " + (mode === 1 ? "Holograma" : "Pincel de luz") +
    "  |  Umbral: " + threshold +
    "\nEstela: " + fadeStrength.toFixed(2) +
    "  |  Paleta: " + ["Neón","Fuego","Hielo","Arcoíris"][paletteIndex%4] +
    "\nEnergía mov.: " + nf(energy*100,2,1) + "%" +
    "\n[B] Fondo  [ [ / ] Umbral  [ - / + ] Estela  [1/2] Modo  [C] Paleta  [H] HUD  [S] Save",
    16, 50
  );
  pop();
}

function keyPressed() {
  if (key === 'B') {
    bgFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
  }
  if (key === '[') threshold = max(0, threshold - 2);
  if (key === ']') threshold = min(255, threshold + 2);
  if (key === '-') fadeStrength = constrain(fadeStrength - 0.02, 0.80, 0.98);
  if (key === '+') fadeStrength = constrain(fadeStrength + 0.02, 0.80, 0.98);
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
  if (key === 'C') paletteIndex++;
  if (key === 'H') hud = !hud;
  if (key === 'S') saveCanvas('espejo-energia', 'png');
}
```

#### Index.html

```c
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <main>
    </main>
    <script src="sketch.js"></script>
  </body>
</html>
```

<img width="790" height="595" alt="imagen" src="https://github.com/user-attachments/assets/00a76beb-971f-4aa8-8eae-d0d19cc21e4c" />


### Fase II – “Río / Latido del caos” (0:36–1:35) 

Input: beat/ataques (onsets), sílabas (simuladas por picos RMS), gestos del artista (gyro/accel alto), mouse del web traza corriente. 
Process: ondas concéntricas + proyectiles que se fragmentan; choques reaccionan a gestos; corriente se deforma por mouse.
Output: campo de batalla líquido; chispas y ondas rojas/ambar; sensación de empuje/arrastre.


#### Sketch.js

```c
let mic, fft;
let particles = [];
let ghostTexts = [];
let keywords = ["fragmento", "memoria", "vacío", "fractura"];
let currentKeyword = "fragmento";
let speedFactor = 1;
let currentColor = "azul";

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // Crear partículas
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(10, 20, 30, 120);

  let spectrum = fft.analyze();
  let energy = fft.getEnergy("mid");

  // Dibujar partículas
  for (let p of particles) {
    p.update();
    p.display(energy);
  }

  // Textos fantasmas
  if (energy < 40 && frameCount % 150 === 0) {
    ghostTexts.push(new GhostText(random(width), random(height)));
  }

  for (let t of ghostTexts) {
    t.display();
  }
}

// ==================== CLASE PARTICULAS ====================
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.dx = random(-1.5, 1.5);
    this.dy = random(-1.5, 1.5);
    this.r = random(10, 40);
  }

  update() {
    this.x += this.dx * speedFactor;
    this.y += this.dy * speedFactor;

    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  display(energy) {
    noStroke();

    let col;
    if (currentColor === "morado") {
      col = color(126, 90, 155, map(energy, 0, 255, 50, 200));
    } else if (currentColor === "azul") {
      col = color(90, 119, 169, map(energy, 0, 255, 50, 200));
    } else {
      col = color(136, 136, 136, map(energy, 0, 255, 50, 200));
    }

    fill(col);
    ellipse(this.x, this.y, this.r);
  }
}

// ==================== CLASE TEXTO ====================
class GhostText {
  constructor(x, y) {
    this.text = currentKeyword;
    this.x = x;
    this.y = y;
    this.alpha = 0;
  }

  display() {
    fill(220, 220, 240, this.alpha);
    textAlign(CENTER);
    textSize(32);
    text(this.text, this.x, this.y);
    this.alpha = min(this.alpha + 2, 180);
  }
}

// ==================== CONTROLES ====================
function setKeyword(word) {
  currentKeyword = word;
}

function setColor(colorName) {
  currentColor = colorName;
}

function mousePressed() {
  // sincroniza slider
  let slider = document.getElementById("speedSlider");
  speedFactor = parseFloat(slider.value);
}

function keyPressed() {
  // también actualizar con teclado
  let slider = document.getElementById("speedSlider");
  speedFactor = parseFloat(slider.value);
}
```

#### Index.html

```c
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Escena Nostálgica</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js"></script>
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #0a0f1f;
        color: white;
        font-family: Arial, sans-serif;
      }
      .controls {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(20, 20, 30, 0.8);
        padding: 10px;
        border-radius: 10px;
      }
      button {
        margin: 3px;
        padding: 5px 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .slider-container {
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <div class="controls">
      <h4>⚡ Parámetros</h4>

      <!-- Botones de palabras -->
      <div>
        <button onclick="setKeyword('fragmento')">Fragmento</button>
        <button onclick="setKeyword('memoria')">Memoria</button>
        <button onclick="setKeyword('vacío')">Vacío</button>
        <button onclick="setKeyword('fractura')">Fractura</button>
      </div>

      <!-- Slider de velocidad -->
      <div class="slider-container">
        <label>Velocidad: </label>
        <input type="range" id="speedSlider" min="0.2" max="3" step="0.1" value="1">
      </div>

      <!-- Colores -->
      <div>
        <button style="background:#7e5a9b; color:white;" onclick="setColor('morado')">Morado</button>
        <button style="background:#5a77a9; color:white;" onclick="setColor('azul')">Azul</button>
        <button style="background:#888888; color:white;" onclick="setColor('gris')">Gris</button>
      </div>
    </div>

    <script src="sketch.js"></script>
  </body>
</html>
```
<img width="821" height="707" alt="imagen" src="https://github.com/user-attachments/assets/50502e4a-1f15-49f1-8d64-4e935335c32a" />

## Fase III – “Midas / Oro y alquitrán” (hook) 
Input: control remoto (params oro/tar), taps de móviles (decisión), latido (opcional futuro). 
Process: palabras/objetos se bañan en oro (filamentos, brillo) o alquitrán (goteo viscoso) según parámetros y energía colectiva. 
Output: transformaciones grupales; redes doradas; ondas de calma final. 

#### Sketch.js
```c
let palabras = [];
let fondoOscuro;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fondoOscuro = color(15, 15, 20);
}

function draw() {
  background(fondoOscuro);

  for (let p of palabras) {
    p.update();
    p.display();
  }

  fill(180);
  textSize(16);
  text("Haz clic: derecha = oro / izquierda = alquitrán", width / 2, height - 30);
}

function mousePressed() {
  let lado = mouseX > width / 2 ? "oro" : "alquitran";
  let palabra = random(["recuerdo", "latido", "sombra", "eco", "memoria", "silencio", "deseo", "pasado", "luz", "oscuridad"]);
  palabras.push(new Palabra(mouseX, mouseY, palabra, lado));
}

class Palabra {
  constructor(x, y, texto, tipo) {
    this.x = x;
    this.y = y;
    this.texto = texto;
    this.tipo = tipo;
    this.alpha = 255;
    this.tamaño = 32;
    this.velocidad = tipo === "oro" ? -0.3 : 0.3;
    this.color = this.asignarColor();
  }

  asignarColor() {
    if (this.tipo === "oro") {
      return color(random(220, 255), random(180, 210), 0); // tonos dorados/ámbar
    } else {
      return color(random(50, 30), random(40, 60), random(30, 50)); // tonos marrón/gris oscuro
    }
  }

  update() {
    this.y += this.velocidad;
    this.alpha -= 0.5;
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    textSize(this.tamaño);
    text(this.texto, this.x, this.y);
  }
}
```

#### Index.html

```c
let mic, fft;
let particles = [];
let ghostTexts = [];
let keywords = ["fragmento", "memoria", "vacío", "fractura"];
let currentKeyword = "fragmento";
let speedFactor = 1;
let currentColor = "azul";

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // Crear partículas
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(10, 20, 30, 120);

  let spectrum = fft.analyze();
  let energy = fft.getEnergy("mid");

  // Dibujar partículas
  for (let p of particles) {
    p.update();
    p.display(energy);
  }

  // Textos fantasmas
  if (energy < 40 && frameCount % 150 === 0) {
    ghostTexts.push(new GhostText(random(width), random(height)));
  }

  for (let t of ghostTexts) {
    t.display();
  }
}

// ==================== CLASE PARTICULAS ====================
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.dx = random(-1.5, 1.5);
    this.dy = random(-1.5, 1.5);
    this.r = random(10, 40);
  }

  update() {
    this.x += this.dx * speedFactor;
    this.y += this.dy * speedFactor;

    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  display(energy) {
    noStroke();

    let col;
    if (currentColor === "morado") {
      col = color(126, 90, 155, map(energy, 0, 255, 50, 200));
    } else if (currentColor === "azul") {
      col = color(90, 119, 169, map(energy, 0, 255, 50, 200));
    } else {
      col = color(136, 136, 136, map(energy, 0, 255, 50, 200));
    }

    fill(col);
    ellipse(this.x, this.y, this.r);
  }
}

// ==================== CLASE TEXTO ====================
class GhostText {
  constructor(x, y) {
    this.text = currentKeyword;
    this.x = x;
    this.y = y;
    this.alpha = 0;
  }

  display() {
    fill(220, 220, 240, this.alpha);
    textAlign(CENTER);
    textSize(32);
    text(this.text, this.x, this.y);
    this.alpha = min(this.alpha + 2, 180);
  }
}

// ==================== CONTROLES ====================
function setKeyword(word) {
  currentKeyword = word;
}

function setColor(colorName) {
  currentColor = colorName;
}

function mousePressed() {
  // sincroniza slider
  let slider = document.getElementById("speedSlider");
  speedFactor = parseFloat(slider.value);
}

function keyPressed() {
  // también actualizar con teclado
  let slider = document.getElementById("speedSlider");
  speedFactor = parseFloat(slider.value);
}
```

<img width="782" height="687" alt="imagen" src="https://github.com/user-attachments/assets/52879b43-44c7-4417-9abe-de4036f7926e" />
