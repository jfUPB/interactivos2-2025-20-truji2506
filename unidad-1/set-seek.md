# Unidad 1

## 🔎 Fase: Set + Seek

### Actividad 01

#### ¿Qué es el diseño generativo?
Es una metodoligia de diseño basado en datos y reglas programadas, que permite crear múltiples resultados visuales o comunicativos a partir de un sistema predefinido, dejando un poco a la aleatoriedad.

#### ¿Qué es el arte generativo?
El arte generativo es una forma de creación artistica en la que el artista diseña un sistema autonomo, generalmente mediante reglas, algoritmos o programación, con un poco mas de libertad artistica 

#### ¿Cuál es la diferencia entre el diseño/arte generativo vs el diseño/arte tradicional?
Hay varias diferencias entre ambos tales como, 
1. Que el diseño generativo es basado en sistemas, reglas, algoritmos o programación a diferencia del arte tradicional, que se encuentra basado en la acción directa del artista o diseñador
2. Control del autor, en el arte generativo se controla el sistema pero no el resultado del mismo, al contrario del arte tradicional donde el autor controla todos los detalles

#### ¿Qué posibilidades crees que esto puede ofrecer a tu perfil profesional? (al finalizar el curso te haré de nuevo esta pregunta)
Las posibilidades que creo que esto me puede ofrecer a mi perfil profesional, es que esto me puede ayudar a enfocar mi futuro laboral a las experiencias interactivas en tiempo real en conciertos, crear diseños generativos interactivos para centros comerciales y trabajar con marcas que necesiten de interactividad en su marketing 

### Actividad 02

#### Antes de lo que hemos discutido, ¿Qué pensabas que hacía un Ingeniero en diseño de entretenimiento digital con énfasis en experiencias interactivas?
Es exactamente lo que pense desde un principio, aunque no niego que tambien lo imagine un poco mas de ambos mundos, tanto como lo analogo como lo digital, pienso que es muy enfocado a tipo parque de universal diseñando experiencias para alguna pelicula famosa 

#### ¿Qué potencial le ves al diseño e implementación de experiencias inmersivas colectivas?
Personalmente siendo que hay un gran potencial al diseño e implementación de experiencias inmersivas colectivas, ya que siento que tendria una mayor acogida del publico, ya sea conciertos, parques, etc. Lugares que se necesite de tiempo para llamar la atención del publico.

#### Nosotros estamos definiendo en TIEMPO REAL una nueva forma de expresión, una nueva forma de interactuar de manera colectiva. Estamos diseñando nuevas maneras de contar historias e interactuar con ellas. ¿Cómo te ves profesionalmente en este escenario?
Me veo de una forma muy segura, como todos tenemos fortalezas y debilidades creeria que estar en una empresa enfocada en crear experiencias en diferentes ambitos, ayudaria mucho a mi conocimiento hasta llegar al momento de independización.

### Actividad 03

#### Reporta los resultados del experimento en la bitácora. Y no olvides incluir el enlace al ejemplo analizado y también el enlace a tu versión modificada. Explica qué hiciste y por qué.

Link de la versión original del diseño generativo:
http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_5_01

Elegi este diseño imaginando un poco a la estatica que genera un televisor y lo psicodelico que puede llegar a ser un conjunto de circulos

Modifique la velocidad de el mouse en X y en Y para que sea mucho mas rapido el movimiento, la rotacion del modo 1 se dejo sin modificaciones y la rotacion del modo 2 la inverti, tambien realice un cambio de tamaños de ambos para que sean mucho mas grandes y sobre salgan de la backgroung

Enlace de mi version modificada:
https://editor.p5js.org/truji2506/sketches/l1dGuZMlL

### Actividad 04
#### Utilizando p5.js, crea un programa que genere formas geométricas (círculos, cuadrados, triángulos) con posición, tamaño y color aleatorios. Experimenta con diferentes funciones de p5.js para controlar la aleatoriedad y la apariencia de las formas. Mira, lo que te estoy pidiendo es que JUEGUES, explores y te dejes llevar. Trata de ver la documentación de referencia que tiene p5.js, experimenta

En esta actividad quise ver como lo aleatorio puede dar composiciones abstractas, me dio curiosidad de como se mezclaban los colores y como la distribucion de las figuras pueden mostrar una estetica sin necesidad de un control total, por ende en este ejercicio quise demostrar un poco como la generatividad en codigo puede dar resultados visualmente atractivos.

```c
function setup() {
  createCanvas(600, 600);
  background(30); 
  noLoop(); 
}

function draw() {
  for (let i = 0; i < 1000; i++) {
    let tipo = int(random(3));
    let x = random(width);
    let y = random(height);
    let tam = random(20, 100);
    let r = random(255);
    let g = random(255);
    let b = random(255);
    fill(r, g, b, 180);
    noStroke();

    if (tipo === 0) {
      ellipse(x, y, tam, tam); 
    } else if (tipo === 1) {
      rect(x, y, tam, tam); 
    } else {
      triangle(
        x, y - tam / 2,
        x - tam / 2, y + tam / 2,
        x + tam / 2, y + tam / 2
      ); 
    }
  }
}
```

Este es un bucle for, que hace?
 for (let i = 0; i < 1000; i++) 
 Let i = 0 se inicia un contador llamado i en 0
 i < 1000 mientras que i sea menor de 1000 sigue ejecutandose 
 i++ lo que hace es sumar 1 a i hasta llegar a los 1000

 Siendo asi el bloque de codigo que esta adentro de las llaves se ejecuta 1000 veces


 let tipo = int(random(3));
 Esta firma hace que se genera un numero aletorio entre 0 y 2.999... y lo que hace el int es convertirlo en un numero entero 
donde 0 es un circulo 
1 un cuadrado 
2 un triangulo 

let x = random(width);
let y = random(height);
Esta firma hace que se generen posiciones aleatorias para verse reflejada la figura dentro del tamaño del lienzo de 600x600

let tam = random(20, 100);
Esta firma hace que se genere un tamaño aleatorio de la figura en este caso son de 20 a 100 pixeles para que las figuras no tengan siempre el mismo tamaño y sea un poco aburrido 

let r = random(255);
let g = random(255);
let b = random(255);
Esta firma genera tres valores aleatorios entre 0 y 255 que los use para que sean rojo verde y azul y sus respectivos tonos

fill(r, g, b, 180);
En esta firma es una de las funciones que no sabia como generarlas y busque en IA para realizar transparencia a las figuras usando los colores que ya habia elegido y donde 0 es totalmente transparente y 255 en muy opaco

noStroke();
En esta firma quise que las figuras no tuvieran contorno 

Link del ejercicio 
https://editor.p5js.org/truji2506/sketches/WfF47qKCn



