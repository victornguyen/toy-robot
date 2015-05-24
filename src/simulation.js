'use strict';

// module for simulation, moving robot, processing commands

var parser = require('./parser');


function Simulation(size) {
    var size        = size || { x:5, y:5 },
        position    = null;

    var COMPASS = [
        'NORTH',
        'EAST',
        'SOUTH',
        'WEST'
    ];

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
            var index = this.getCompassIndex(position.f) - 1;

            if (index < 0) {
                index = COMPASS.length - 1;
            }
            position.f = COMPASS[index];
        },

        right: function() {
            var index = this.getCompassIndex(position.f) + 1;

            if (index >= COMPASS.length) {
                index = 0;
            }
            position.f = COMPASS[index];
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
        },

        getCompassIndex: function(f) {
            var index,
                i = COMPASS.length;

            while (i--) {
                if (COMPASS[i] === f) {
                    index = i;
                }
            }
            return index;
        }

    };
};

module.exports = Simulation;
