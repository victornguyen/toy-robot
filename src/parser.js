/**
 * PARSER
 * Methods for parsing input into valid robot commands to be executed by the table module
 */

'use strict';
 
module.exports = {
 
    getCommandsFromInput: function(input) {
        // parse textarea input and return array of commands
    },
 
    getValidCommands: function(commands) {
        // parses command array and returns new array of only valid commands for robot to execute
        // invalid commands are different to ignored commands (which are still executed, but no
        // action is taken as it would result in the robot falling off)
    },
 
    getFirstPlaceIndex: function(commands) {
        // returns the index of the first valid PLACE command given an array of commands
    },
 
    isValidCommand: function(command) {
        // returns true if command is a valid MOVE, LEFT, RIGHT or REPORT command
    },
 
    isValidPlaceCommand: function(command) {
        // returns bool indicating whether command is a valid PLACE command
    },
 
    getPlaceData: function(placeCommand) {
        // return deserialised place data from placeCommand string
        return {
            x: 0,
            y: 0,
            f: 'NORTH'
        };
    },
 
    isInRange: function(placeData, boardSize) {
        // placeData = getPlaceData()
        // boardSize = { x:5, y:5 }
        // returns true if placeData fits in boardSize
    }
 
};
