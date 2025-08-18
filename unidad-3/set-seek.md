# Unidad 3

## 🔎 Fase: Set + Seek

### Actividad 1

#### Vas a realizar un diagrama de bloques que muestre las diferentes partes que componen la aplicación analizada.


<img width="920" height="511" alt="image" src="https://github.com/user-attachments/assets/78e718fb-3bf7-4359-b93f-737ba3131e5f" />


#### Vas a describir detalladamente paso por paso cómo llegan los datos del cliente móvil al cliente de escritorio.

Primero arrancamos el servidor, en la terminal ingreso a la carpeta del proyecto y lo ejecuto, esto significa que el express queda sirviendo, despues pasamos la visibilidad del puerto de private a public 

Segundo abrimos el tunel, en la pestaña port reenvio el 3000 y visual me da un forwarded address, que pasa ahi, ese link publico es un tunel donde todo el trafico Websocket entra por ahi y llega al localhost:3000

Tercero en el chrome del pc vas al link del tunel y agrego /desktop/ donde hay una "descarga" de archivos index.html y sketch.js y queda esperando mensajes en tiempo real 

Cuarto en el celular vas al link del tunel y agrego /mobile/ donde la version movil ya tiene controles donde el servidor asigna este cliente un socket.io unico distinto del desktop, allí captura las interacciones del usuario en este caso es mover el dedo en pantalla, cada vez que el movil emite un mensaje, el servidor lo recibe y lo reenvia al desktop 

### Actividad 2

#### El código de cada una de las aplicaciones.

Se creó varios archivos y carpetas nuevas en este proyecto tales como desktop 2, mobile 2 y visuales donde incluimos el index.html sin ninguna modificación a todas estas carpetas nuevas y se le añadio el sketch.js con las siguientes modificaciones al codigo

#### En el desktop 2 

```c
const socket = io();

socket.on('connect', () => {
    console.log('Mobile client connected');
    
    // Enviar un dato simple
    const data = {
        value: "test from pc"
    };
    socket.emit('message', data);
    console.log('Sent:', data);
});
```
const socket = io() conecta este cliente con el servidor Socket.IO

socket.on('connect', () => { cuando se conecta correctamente, ejecuta el bloque

Se crea un objeto { value: "test from pc" }

socket.emit('message', data); envia ese objeto al servidor con el evento "message"

Se imprime en consola que se envio

#### En el mobile 2

```c
// Conexión con el servidor usando Socket.IO
const socket = io();

// Cuando el cliente se conecta, envía datos simulados al servidor
socket.on('connect', () => {
    console.log('Connected to server');
    const controlData = {
        type: 'control',
        x: Math.random() * 100,
        y: Math.random() * 100,
        timestamp: Date.now()
    };
    socket.emit('message', controlData);
    console.log('Mobile sent:', controlData);
});
```

const socket = io(); conecta al servidor

socket.on('connect', () => { al conectarse, se ejecuta

Crea un objeto controlData con:

type: 'control'

coordenadas x y y aleatorias

timestamp con la hora actual

socket.emit('message', controlData); envia esos datos al servidor

Lo muestra en consola

#### En las visuales 

```c
const socket = io();

socket.on('connect', () => {
    console.log('Visuales conectadas');
});

socket.on('message', (data) => {
    console.log('Datos recibidos en visuales:', data);
});

socket.on('disconnect', () => {
    console.log('Visuales desconectadas');
});
```
Se conecta al servidor con Socket.IO

Al conectarse muestra Visuales conectadas

Cuando recibe un mensaje del servidor ('message') muestra en consola los datos recibidos

Si se desconecta: muestra "Visuales desconectadas"

#### Un enlace a un video en youtube que muestre el funcionamiento de la aplicación.

https://youtube.com/shorts/5QnvySDuX5Q


