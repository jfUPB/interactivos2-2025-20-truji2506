const socket = io();

function setGlobalState(state) {
    socket.emit("changeGlobalState", state);
    console.log("Estado global cambiado a:", state);
}

function setSubState(substate) {
    socket.emit("changeSubState", substate);
    console.log("Subestado cambiado a:", substate);
}

function updateParam(param, value) {
    socket.emit("updateParam", { param, value });
    console.log(`Parámetro actualizado: ${param} = ${value}`);
}