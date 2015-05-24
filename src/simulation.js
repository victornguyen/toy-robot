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
            var i           = this.getCompassIndex(position.f),
                newIndex    = (i - 1 < 0) ? COMPASS.length - 1 : i - 1;

            position.f = COMPASS[newIndex];
        },

        right: function() {
            var i           = this.getCompassIndex(position.f),
                newIndex    = (i + 1 >= COMPASS.length) ? 0 : i + 1;

            position.f = COMPASS[newIndex];
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
