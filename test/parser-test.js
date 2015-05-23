'use strict';

var chai   = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var parser = require('../src/parser');

describe('parser', function(){

    describe('getCommandsFromInput()', function() {
        it('should return an array of the correct length', function(){
            var input = 'MOVE\nLEFT\nLEFT\nPLACE 0,6,NORTH\nPLACE 0,0,WEST\nMOVE\nRIGHT\nMOVE';
            expect( parser.getCommandsFromInput(input) )
                .to.be.an('array')
                .with.length(8);
        });

        it('should return an empty array when given no input', function(){
            expect( parser.getCommandsFromInput('') )
                .to.be.an('array')
                .and.to.be.empty;
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
            expect( validCommands )
                .to.be.an('array')
                .with.length(5);
        });

        it('shouldn\'t include the invalid "PLACE 0,0,DOWN" command', function(){
            expect( validCommands )
                .to.be.an('array')
                .and.to.not.include('PLACE 0,0,DOWN');
        });

        it('shouldn\'t include the invalid "MICHAELANGELO" command', function(){
            expect( validCommands )
                .to.be.an('array')
                .and.to.not.include('MICHAELANGELO');
        });

        it('should includes the valid "PLACE 1,1,WEST" command', function(){
            expect( validCommands ).to.include('PLACE 1,1,WEST');
        });
    });

    describe('getFirstPlaceIndex()', function() {
        var tableSize = { x:5, y:5 };

        it('should return the index of the first valid PLACE command', function(){
            var commands = [
                'MOVE',
                'PLACE 0,0,DOWN',
                'PLACE 1,1,WEST', // this guy [2]
                'MOVE'
            ];
            expect( parser.getFirstPlaceIndex(commands, tableSize) ).to.equal(2);
        });

        it('should return -1 when no in-range PLACE command is found', function(){
            var tableSize = { x:5, y:5 };

            expect( parser.getFirstPlaceIndex(['PLACE 99,1,EAST'], tableSize) )
                .to.equal(-1);

            expect( parser.getFirstPlaceIndex(['PLACE 1,99,EAST'], tableSize) )
                .to.equal(-1);

            expect( parser.getFirstPlaceIndex(['PLACE 99,99,EAST'], tableSize) )
                .to.equal(-1);
        });

        it('should return -1 when no valid PLACE command is found', function(){
            var commands = [
                'MOVE',
                'SHREDDER',
                'MOVE'
            ];
            expect( parser.getFirstPlaceIndex(commands, tableSize) ).to.equal(-1);
        });
    });

    describe('isValidCommand()', function() {
        it('should identify "MOVE" as a valid command', function(){
            expect( parser.isValidCommand('MOVE') ).to.equal(true);
        });

        it('should identify "LEFT" as a valid command', function(){
            expect( parser.isValidCommand('LEFT') ).to.equal(true);
        });

        it('should identify "RIGHT" as a valid command', function(){
            expect( parser.isValidCommand('RIGHT') ).to.equal(true);
        });

        it('should identify "REPORT" as a valid command', function(){
            expect( parser.isValidCommand('REPORT') ).to.equal(true);
        });

        it('should identify "DONATELLO" as an invalid command', function(){
            expect( parser.isValidCommand('DONATELLO') ).to.equal(false);
        });

        it('should identify an empty string ("") as an invalid command', function(){
            expect( parser.isValidCommand('') ).to.equal(false);
            });
    });

    describe('isValidPlaceCommand()', function() {
        var tableSize = { x:5, y:5 };

        it('should identify "PLACE 0,0,NORTH" as a valid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 0,0,NORTH', tableSize) )
                .to.equal(true);
        });

        it('should identify "PLACE 01,05,SOUTH" as a valid command', function(){
            // this is considered valid even though a 100 y coord is out of bounds
            expect( parser.isValidPlaceCommand('PLACE 01,05,SOUTH', tableSize) )
                .to.equal(true);
        });

        it('should identify "PLACE 1,1,LEFT" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 1,1,LEFT', tableSize) )
                .to.equal(false);
        });

        it('should identify "PLACE 0.1,1.5,EAST" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 0.1,1.5,EAST', tableSize) )
                .to.equal(false);
        });

        it('should identify "PLACE 1,1,1" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('PLACE 1,1,1', tableSize) )
                .to.equal(false);
        });

        it('should identify "SPLINTER" as an invalid command', function(){
            expect( parser.isValidPlaceCommand('SPLINTER', tableSize) )
                .to.equal(false);
        });

        it('should identify an empty string ("") as an invalid command', function(){
            expect( parser.isValidPlaceCommand('', tableSize) )
                .to.equal(false);
        });
    });

    describe('getPlaceData()', function() {
        it('should return an object', function() {
            expect( parser.getPlaceData('PLACE 0,0,NORTH') ).to.be.an('object');
        });

        it('should return the correct data given a valid PLACE command', function() {
            expect( parser.getPlaceData('PLACE 0,0,NORTH') ).to.deep.equal({
                x: 0,
                y: 0,
                f: 'NORTH'
            });
            expect( parser.getPlaceData('PLACE 01,020,WEST') ).to.deep.equal({
                x: 1,
                y: 20,
                f: 'WEST'
            });
        });

        it('should return null when given an invalid command', function() {
            expect( parser.getPlaceData('') ).to.equal(null);
        });
    });

    describe('isInRange()', function() {
        var tableSize = { x:5, y:5 };

        it('should return true when given an in-range PLACE command', function(){
            expect( parser.isInRange('PLACE 0,0,NORTH', tableSize) ).to.equal(true);
            expect( parser.isInRange('PLACE 5,5,NORTH', tableSize) ).to.equal(true);
            expect( parser.isInRange('PLACE 2,4,NORTH', tableSize) ).to.equal(true);
        });

        it('should return false when given an out-of-range PLACE command', function(){
            expect( parser.isInRange('PLACE 6,6,NORTH', tableSize) ).to.equal(false);
            expect( parser.isInRange('PLACE 0,10,NORTH', tableSize) ).to.equal(false);
            expect( parser.isInRange('PLACE 10,0,NORTH', tableSize) ).to.equal(false);
        });

        it('should return false when given "KRANG"', function(){
            expect( parser.isInRange('KRANG', tableSize) ).to.equal(false);
        });
    });

});
