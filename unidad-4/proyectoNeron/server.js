const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Escuchar eventos del cliente remoto
    socket.on('changeGlobalState', (estado) => {
        console.log('Cambio de estado global:', estado);
        io.emit('cambiarEstadoGlobal', estado);
    });

    socket.on('changeSubState', (subestado) => {
        console.log('Cambio de subestado:', subestado);
        io.emit('cambiarSubEstado', subestado);
    });

    socket.on('updateParam', (param) => {
        console.log('Actualización de parámetro:', param);
        io.emit('actualizarParametro', param);
    });

    // Escuchar eventos de clientem1
    socket.on('datoMovil1', (datos) => {
        console.log('Datos recibidos de clientem1:', datos);
        io.emit('datoMovil1', datos);
    });

    // Escuchar eventos de clientem2
    socket.on('datoMovil2', (datos) => {
        console.log('Datos recibidos de clientem2:', datos);
        io.emit('datoMovil2', datos);
    });

    // Escuchar eventos de desktop
    socket.on('datoDesktop', (datos) => {
        console.log('Datos recibidos de desktop:', datos);
        io.emit('datoDesktop', datos);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});