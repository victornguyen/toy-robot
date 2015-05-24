'use strict';

// module for simulation, moving robot, processing commands

var parser = require('./parser');


function Simulation(size) {
    var size        = size || { x:5, y:5 },
        position    = null,
        output      = [];

    var COMPASS = [
        'NORTH',
        'EAST',
        'SOUTH',
        'WEST'
    ];

    return {

        process: function(input) {
            // parses raw command input and performs commands
            var commands = parser.getCommands(input, size),
                method   = '';

            this.reset();

            for (var i = 0; i < commands.length; i++) {
                method = commands[i].split(' ')[0].toLowerCase();
                this[method](commands[i]); // command names map to method names
            };
        },

        reset: function() {
            position = null;
            output = [];
        },

        place: function(command) {
            position = parser.getPlaceData(command);
        },

        move: function() {
            switch (position.f) {
                case 'NORTH':
                    if (position.y < size.y) {
                        position.y++;
                    }
                    break;
                case 'SOUTH':
                    if (position.y > 0) {
                        position.y--;
                    }
                    break;
                case 'EAST':
                    if (position.x < size.x) {
                        position.x++;
                    }
                    break;
                case 'WEST':
                    if (position.x > 0) {
                        position.x--;
                    }
                    break;
            }
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
            var report;
            if (position === null) {
                report = ''
            }
            else {
                report = [
                    position.x.toString(),
                    position.y.toString(),
                    position.f
                ].join(',');
            }

            output.push(report);

            return report;
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
        },

        getOutput: function() {
            return output.join('\n');
        }

    };
};

module.exports = Simulation;
