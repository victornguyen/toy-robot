'use strict';

// entry point, will handle UI for inputting commands and executing program

var Simulation   = require('./simulation'),
    exampleData  = require('./example');


var simulation   = new Simulation({ x:5, y:5 }),
    textarea     = document.getElementById('commands'),
    button       = document.getElementById('process'),
    output       = document.getElementById('output'),
    example_btns = document.querySelectorAll('.example');

function processInput() {
    simulation.process(textarea.value);
    output.textContent = simulation.getOutput();
}

function loadExample() {
    var key = this.getAttribute('data-example');
    textarea.value = exampleData[key].input;
}

// bind process button
button.addEventListener('click', processInput);

// bind each example button
for (var i = 0; i < example_btns.length; i++) {
    example_btns[i].addEventListener('click', loadExample);
}

// load first example on load
textarea.value = exampleData.a.input;
