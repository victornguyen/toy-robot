'use strict';

var chai    = require('chai'),
    assert  = chai.assert,
    expect  = chai.expect;

var parser = require('../src/parser');

describe('parser', function(){
    
    describe('getCommandsFromInput()', function(){
        var input       = 'MOVE\nLEFT\nLEFT\nPLACE 0,6,NORTH\nPLACE 0,0,WEST\nMOVE\nRIGHT\nMOVE',
            returnValue = parser.getCommandsFromInput(input);
 
        it('should return an array of the correct length', function(){
            expect( returnValue ).to.be.an('array');
            expect( returnValue ).to.have.length(8);
        });
    });

    describe('getValidCommands()', function(){
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

    describe('getFirstPlaceIndex()', function(){
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

});
