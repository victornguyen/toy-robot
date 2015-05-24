'use strict';

// module for simulation, moving robot, processing commands

var parser = require('./parser');


function Simulation(size) {
    var size        = size || { x:5, y:5 },
        position    = null;

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
            var output;
            if (position === null) {
                output = ''
            }
            else {
                output = [
                    position.x.toString(),
                    position.y.toString(),
                    position.f
                ].join(',');
            }

            return output;
        },

        getPosition: function() {
            return position;
        }

    };
};

module.exports = Simulation;
