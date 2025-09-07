const socket = io();

window.addEventListener('devicemotion', (event) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const datos = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z,
        timestamp: Date.now()
    };

    socket.emit('datoMovil1', datos);
    console.log('Datos enviados desde clientem1:', datos);
});