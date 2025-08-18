# Unidad 3

## 🔎 Fase: Set + Seek

### Actividad 1

#### Vas a realizar un diagrama de bloques que muestre las diferentes partes que componen la aplicación analizada.


#### Vas a describir detalladamente paso por paso cómo llegan los datos del cliente móvil al cliente de escritorio.

Primero arrancamos el servidor, en la terminal ingreso a la carpeta del proyecto y lo ejecuto, esto significa que el express queda sirviendo, despues pasamos la visibilidad del puerto de private a public 

Segundo abrimos el tunel, en la pestaña port reenvio el 3000 y visual me da un forwarded address, que pasa ahi, ese link publico es un tunel donde todo el trafico Websocket entra por ahi y llega al localhost:3000

Tercero en el chrome del pc vas al link del tunel y agrego /desktop/ donde hay una "descarga" de archivos index.html y sketch.js y queda esperando mensajes en tiempo real 

Cuarto en el celular vas al link del tunel y agrego /mobile/ donde la version movil ya tiene controles donde el servidor asigna este cliente un socket.io unico distinto del desktop, allí captura las interacciones del usuario en este caso es mover el dedo en pantalla, cada vez que el movil emite un mensaje, el servidor lo recibe y lo reenvia al desktop 
