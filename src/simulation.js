'use strict';

// module for simulation, moving robot, processing commands

var parser = require('./parser');


function Simulation(size) {
    var size        = size || { x:5, y:5 },
        position    = {
            x: null,
            y: null,
            f: null
        };

    return {

        process: function(input) {
            // parses raw command input and performs commands
        },

        place: function(command) {
            position = parser.getPlaceData(command);
        },

        move: function() {

        },

        left: function() {

        },

        right: function() {

        },

        report: function() {

        },

        getPosition: function() {
            return position;
        }

    };
};

module.exports = Simulation;
