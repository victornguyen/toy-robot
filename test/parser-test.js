'use strict';

var chai   = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var parser = require('../src/parser');

describe('parser', function(){

    describe('getCommandsFromInput()', function() {
        it('should return an array of the correct length', function(){
            var input = 'MOVE\nLEFT\nLEFT\nPLACE 0,6,NORTH\nPLACE 0,0,WEST\nMOVE\nRIGHT\nMOVE';
            expect( parser.getCommandsFromInput(input) ).to.be.an('array');
            expect( parser.getCommandsFromInput(input) ).to.have.length(8);
        });

        it('should return an empty array when given no input', function(){
            expect( parser.getCommandsFromInput('') ).to.be.an('array');
            expect( parser.getCommandsFromInput('') ).to.be.empty;
        });
    });

    describe('getValidCommands()', function() {
        var commands = [
            'MOVE',
            'PLACE 0,0,DOWN',
            'PLACE 1,1,WEST', // valid
            'MOVE', // valid
            'LEFT', // valid
            'MICHAELANGELO', // invalid
            'MOVE', // valid
            'MOVE' // valid, ignored
        ];
        var validCommands = parser.getValidCommands(commands);

        it('should return an array of the correct length', function(){
            expect( validCommands ).to.be.an('array');
            expect( validCommands ).to.have.length(5);
        });

        it('shouldn\'t include the invalid "PLACE 0,0,DOWN" command', function(){
            expect( validCommands ).to.be.an('array');
            expect( validCommands ).to.not.include('PLACE 0,0,DOWN');
        });

        it('shouldn\'t include the invalid "MICHAELANGELO" command', function(){
            expect( validCommands ).to.be.an('array');
            expect( validCommands ).to.not.include('MICHAELANGELO');
        });

        it('should includes the valid "PLACE 1,1,WEST" command', function(){
            expect( validCommands ).to.include('PLACE 1,1,WEST');
        });
    });

    describe('getFirstPlaceIndex()', function() {
        it('should return the correct index when commands are present', function(){
            var commands = [
                'MOVE',
                'PLACE 0,0,DOWN',
                'PLACE 1,1,WEST', // this guy [2]
                'MOVE'
            ];
            expect( parser.getFirstPlaceIndex(commands) ).to.be(2);
        });

        it('should return -1 when no valid PLACE command is found', function(){
            var commands = [
                'MOVE',
                'SHREDDER',
                'MOVE'
            ];
            expect( parser.getFirstPlaceIndex(commands) ).to.be(-1);
        });
    });

    describe('isValidCommand()', function() {
        it('should identify "MOVE" as a valid command', function(){
            expect( parser.isValidCommand('MOVE') ).to.be(true);
        });

        it('should identify "LEFT" as a valid command', function(){
            expect( parser.isValidCommand('LEFT') ).to.be(true);
        });

        it('should identify "RIGHT" as a valid command', function(){
            expect( parser.isValidCommand('RIGHT') ).to.be(true);
        });

        it('should identify "REPORT" as a valid command', function(){
            expect( parser.isValidCommand('REPORT') ).to.be(true);
        });

        it('should identify "DONATELLO" as an invalid command', function(){
            expect( parser.isValidCommand('DONATELLO') ).to.be(false);
        });

        it('should identify an empty string ("") as an invalid command', function(){
            expect( parser.isValidCommand('') ).to.be(false);
            });
    });

    describe('isValidPlaceCommand()', function() {
        it('should identify "PLACE 0,0,NORTH" as a valid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 0,0,NORTH') ).to.be(true);
        });

        it('should identify "PLACE 01,100,SOUTH" as a valid command', function(){
            // this is considered valid even though a 100 y coord is out of bounds
            expect( parser.isValidPlaceCommand('PLACE 01,100,SOUTH') ).to.be(true);
        });

        it('should identify "PLACE 1,1,LEFT" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 1,1,LEFT') ).to.be(false);
        });

        it('should identify "PLACE 0.1,1.5,EAST" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 0.1,1.5,EAST') ).to.be(false);
        });

        it('should identify "PLACE 1,1,1" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 1,1,1') ).to.be(false);
        });

        it('should identify "SPLINTER" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('SPLINTER') ).to.be(false);
        });

        it('should identify an empty string ("") as an invalid command', function(){
            expect( parser.isValidPlaceCommand('') ).to.be(false);
        });
    });

    describe('getPlaceData()', function() {
        it('should return an object', function() {
            expect( parse.getPlaceData('PLACE 0,0,NORTH') ).to.be.an('object');
        });

        it('should return the correct data given a valid PLACE command', function() {
            expect( parse.getPlaceData('PLACE 0,0,NORTH') ).to.deep.equal({
                x: 0,
                y: 0,
                f: 'NORTH'
            });
            expect( parse.getPlaceData('PLACE 01,020,WEST') ).to.deep.equal({
                x: 1,
                y: 20,
                f: 'WEST'
            });
        });

        it('should return null when given an invalid command', function() {
            expect( parse.getPlaceData('') ).to.be(null);
        });
    });

    describe('isInRange()', function() {
        var tableSize = { x:5, y:5 };

        it('should return true when given an in-range PLACE command', function(){
            expect( parser.isInRange('PLACE 0,0,NORTH', tableSize) ).to.be(true);
            expect( parser.isInRange('PLACE 5,5,NORTH', tableSize) ).to.be(true);
            expect( parser.isInRange('PLACE 2,4,NORTH', tableSize) ).to.be(true);
        });

        it('should return false when given an out-of-range PLACE command', function(){
            expect( parser.isInRange('PLACE 6,6,NORTH', tableSize) ).to.be(false);
            expect( parser.isInRange('PLACE 0,10,NORTH', tableSize) ).to.be(false);
            expect( parser.isInRange('PLACE 10,0,NORTH', tableSize) ).to.be(false);
        });

        it('should return false when given "KRANG"', function(){
            expect( parser.isInRange('KRANG', tableSize) ).to.be(false);
            });
    });

});
