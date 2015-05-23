/**
 * PARSER
 * Methods for parsing input into valid robot commands to be executed by the table module
 */

'use strict';

/**
 * RegExps for parsing command strings
 */
var COMMAND_FORMATS = {
    REGULAR: /^(MOVE|LEFT|RIGHT|REPORT)$/,
    PLACE:   /^(?:PLACE)\s(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)+$/
};

module.exports = {

    getCommandsFromInput: function(input) {
        // parse textarea input and return array of commands
        return input === '' ? [] : input.split(/\n/);
    },

    getValidCommands: function(commands) {
        // parses command array and returns new array of only valid commands for robot to execute
        // invalid commands are different to ignored commands (which are still executed, but no
        // action is taken as it would result in the robot falling off)
    },

    getFirstPlaceIndex: function(commands, tableSize) {
        // returns the index of the first valid PLACE command given an array of commands
        var index = -1;
        for (var i = 0; i < commands.length; i++) {
            if ( this.isValidPlaceCommand( commands[i], tableSize ) ) {
                index = i;
                break;
            }
        };
        return index;
    },

    isValidCommand: function(command) {
        // returns true if command is a valid MOVE, LEFT, RIGHT or REPORT command
        return COMMAND_FORMATS.REGULAR.exec(command) !== null;
    },

    isValidPlaceCommand: function(command, tableSize) {
        // returns bool indicating whether command is a valid PLACE command
        // validity depends on both format and whether it is in range
        var isPlaceFormat = COMMAND_FORMATS.PLACE.exec(command) !== null,
            isInRange     = this.isInRange(command, tableSize);

        return isPlaceFormat && isInRange;
    },

    getPlaceData: function(placeCommand) {
        // return deserialised place data from placeCommand string
        var matches = COMMAND_FORMATS.PLACE.exec(placeCommand);

        return matches === null ? null : {
            x: parseInt( matches[1], 10 ),
            y: parseInt( matches[2], 10 ),
            f: matches[3]
        };
    },

    isInRange: function(placeCommand, tableSize) {
        // tableSize = { x:5, y:5 }
        // returns true if placeData fits in tableSize
        var data = this.getPlaceData(placeCommand);

        if (data === null) {
            return false;
        }

        return (data.x <= tableSize.x) && (data.y <= tableSize.y);
    }

};
