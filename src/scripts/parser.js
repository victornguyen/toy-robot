'use strict';

// methods for parsing input into valid commands to be executed by simulation


var COMMAND_FORMATS = {
    REGULAR: /^(MOVE|LEFT|RIGHT|REPORT)$/,
    PLACE:   /^(?:PLACE)\s(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)+$/
};

module.exports = {

    getCommands: function(input, tableSize) {
        var commands      = this.inputToArray(input),
            startIndex    = this.getFirstPlaceIndex(commands, tableSize),
            validCommands = [],
            _this         = this;

        function _includeInValidCommands(command) {
            return (
                _this.isValidCommand(commands[i]) ||
                _this.isValidPlaceCommand(commands[i], tableSize)
            );
        };

        // return empty array if there are no commands to process
        if (startIndex < 0) {
            return [];
        }

        // take copy of array starting at first valid PLACE command
        commands = commands.slice(startIndex);

        // compose valid commands to return
        for (var i = 0; i < commands.length; i++) {
            if ( _includeInValidCommands(commands[i]) ) {
                validCommands.push(commands[i]);
            }
        };

        return validCommands;
    },

    inputToArray: function(input) {
        return input === '' ? [] : input.split(/\n/);
    },

    getFirstPlaceIndex: function(commands, tableSize) {
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
        return COMMAND_FORMATS.REGULAR.exec(command) !== null;
    },

    isValidPlaceCommand: function(command, tableSize) {
        var isPlaceFormat = COMMAND_FORMATS.PLACE.exec(command) !== null,
            isInRange     = this.isInRange(command, tableSize);

        return isPlaceFormat && isInRange;
    },

    getPlaceData: function(placeCommand) {
        var matches = COMMAND_FORMATS.PLACE.exec(placeCommand);

        return matches === null ? null : {
            x: parseInt( matches[1], 10 ),
            y: parseInt( matches[2], 10 ),
            f: matches[3]
        };
    },

    isInRange: function(placeCommand, tableSize) {
        var data = this.getPlaceData(placeCommand);

        if (data === null) {
            return false;
        }

        return (data.x <= tableSize.x) && (data.y <= tableSize.y);
    }

};
