'use strict';

// entry point, will handle UI for inputting commands and executing program

var Simulation = require('./simulation');


var simulation = new Simulation({ x:5, y:5 });

var textarea   = document.getElementById('commands'),
    button     = document.getElementById('process'),
    output     = document.getElementById('output');

function doThemCommands() {
    simulation.process(textarea.value);
    output.textContent = simulation.getOutput();
}

button.addEventListener('click', doThemCommands);
