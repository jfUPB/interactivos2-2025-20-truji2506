# Unidad 1

## 🛠 Fase: Apply

#### Fase 1 y 2 del metodo de deconstrucción y reconstrucción 
Para esta actividad de aplicación elegí el siguiente ejercicio

https://editor.p5js.org/truji2506/sketches/7DwNW5EUn

##### Muestra 1 

<img width="725" height="652" alt="image" src="https://github.com/user-attachments/assets/5076a98d-9067-4ab2-bc6a-a5ed3214315a" />

Diseño sin modificar a lo que permite el codigo sin verlo solo interactuando de una forma instintiva.

##### Muestra 2

<img width="733" height="658" alt="image" src="https://github.com/user-attachments/assets/ac8c61ae-12c1-4c1c-a1c9-6492cfb05783" />

En esta muestra lo que hago es presionar 10 veces la tecla 2 para modificar el diseño de las curvas de la derecha que estan en forma vertical.

##### Muestra 3

<img width="730" height="666" alt="image" src="https://github.com/user-attachments/assets/04d3e3b4-cd28-44fe-990c-64e2107ae37f" />

En esta muestra lo que hace es presionar 10 veces la tecla 4 para modificar el diseño de las curvas de la parte inferior del arte, hay algo en comun de ambas y es que se modifica la figura de la parte inferior derecha.

##### Muestra 4

<img width="721" height="653" alt="image" src="https://github.com/user-attachments/assets/52316974-5c61-41e6-83e8-6e4a2d399363" />

En esta muestra lo que hago es devolver con la tecla 1 el diseño del cuadro superior derecho, lo que no entiendo muy bien es con que logica se sigue modificando la cuadricula inferior derecha.

##### Posibles interacciones

En esta primera muestra alcanzo a ver que mientras presiono las teclas 2 y 4 se modifican las curvas que se evidencian en el arte elegido, me doy cuenta que presinando las teclas 1 y 3 lo hace es devolver a su estado iniciar dichas curvas, 
tambien evidencio que hay 3 puntos en sus respectivas figuras se me hacen un poco como parecido al uso de varios ploters funcionando al mismo tiempo usando 3 lienzos diferentes.

##### Formas: 
Veo 3 figuras una redonda, y dos curvas, cada una de estas figuras hay un circulo pequeño donde se puede evidenciar que hace la forma del simbolo (Curvas y circulo), encima de estos circulos a unas lineas que siguen el movimiento de lo circulos, donde se evidencia que estan pegadasa las coordenadas que se mueven los circulos, del punto a al b 

##### Tipografia: 
En este diseño no se evidencia tipografica alguna.

##### Colores:
En este diseño carece de colores vividos, solo se evidencia el uso del negro, para las lineas antes mencionadas el gris claro y el borde de los circulos en blanco para que cuando recorra las figuras no se pierda el minicirculo 

##### Ritmo:
En este diseño si modifica el ritmo de los circulos pequeños ya mencionados.

#### Fase 3 del metodo de deconstrucción y reconstrucción 

##### Matematicas aplicadas

Este codigo dibuja una figura oscilante, usando funciones seno, tambien se deben de generar unas coordenadas 

##### Frecuencias

Debe de tener variables que controlen cuantas oscilaciones se hacen en el eje X y Y 

##### Logica de animación 

Debe de haber una viariable que permita cambiar entre modo animación y como estatico 

##### Interconexiones y estructura 

Debe de haber un setup() que defina el lienzo, el draw(), el drawAnimation() y el keypressed() para que responda a las teclas del usuario y modifique las variables 

#### Fase 4 del metodo de deconstrucción y reconstrucción 

Para este metodo tuve en cuenta el punto 2 y 3 de las fases del metodo, 

Lo que hice fue crear una funcion con Setup() como o mencione antes, introduci un canvas de 600x600 pixeles, cree otra función draw() y cree un background (255) y un stroken(0) para que tenga un contorno negro, cree un beginshape() que esto inicializa una forma de dibujar punto por punto, cree un ciclo para recorrer todos los pixeles a lo largo del eje X, en el let Y se encuenta la matematica de la onda x * 0.005 convierte a X en un angulo en radiadianes * freq si aumentas la frecuencia, se acelera la oscilacion, sin(....) devuelve un valor entre -1 y 1 que hace la forma de la onda *50 es la escala de la altura de la onda + height/2 lo que hace en centrar la onda verticalmente en el lienzo 

https://editor.p5js.org/truji2506/sketches/iPwcwzUsc

#### Fase 5 del metodo de deconstrucción y reconstrucción

Le realice unos cambios para que iniciara desde otros angulos y se le añadio una tecla para que de viera un poco mas cerca 

https://editor.p5js.org/truji2506/sketches/iPwcwzUsc

#### Fase 6 del metodo de deconstrucción y reconstrucción

En este punto era totalmente libre lo que hice fue añadirles margenes, separar un poco las curvas, hacer que las curvas estuvieran mas gruesas

https://editor.p5js.org/truji2506/sketches/iPwcwzUsc











