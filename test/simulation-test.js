'use strict';

var chai   = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var Simulation = require('../src/simulation');


describe('Simulation', function () {

    var simulation;

    beforeEach(function () {
        simulation = new Simulation({ x:5, y:5 });
    });

    describe('process()', function () {

    });

    describe('place()', function () {
        it('should set the correct position value after a PLACE', function () {
            simulation.place('PLACE 1,1,NORTH');
            expect( simulation.getPosition() ).to.deep.equal({
                x: 1,
                y: 1,
                f: 'NORTH'
            });
        });
    });

    describe('move()', function () {
        it('should move to the correct position facing NORTH', function () {
            simulation.place('PLACE 0,0,NORTH');
            simulation.move();
            expect( simulation.report() ).to.equal('0,1,NORTH');
        });

        it('should move to the correct position facing EAST', function () {
            simulation.place('PLACE 0,0,EAST');
            simulation.move()
            expect( simulation.report() ).to.equal('1,0,EAST');
        });

        it('should move to the correct position facing SOUTH', function () {
            simulation.place('PLACE 0,1,SOUTH');
            simulation.move()
            expect( simulation.report() ).to.equal('0,0,SOUTH');
        });

        it('should move to the correct position facing WEST', function () {
            simulation.place('PLACE 1,0,WEST');
            simulation.move()
            expect( simulation.report() ).to.equal('0,0,WEST');
        });
    });

    describe('left()', function () {
        it('should rotate the robot from NORTH to WEST', function () {
            simulation.place('PLACE 0,0,NORTH');
            simulation.left();
            expect( simulation.report() ).to.equal('0,0,WEST');
        });

        it('should rotate the robot from WEST to SOUTH', function () {
            simulation.place('PLACE 0,0,WEST');
            simulation.left();
            expect( simulation.report() ).to.equal('0,0,SOUTH');
        });

        it('should rotate the robot from SOUTH to EAST', function () {
            simulation.place('PLACE 0,0,SOUTH');
            simulation.left();
            expect( simulation.report() ).to.equal('0,0,EAST');
        });

        it('should rotate the robot from EAST to NORTH', function () {
            simulation.place('PLACE 0,0,EAST');
            simulation.left();
            expect( simulation.report() ).to.equal('0,0,NORTH');
        });
    });

    describe('right()', function () {
        it('should rotate the robot from NORTH to EAST', function () {
            simulation.place('PLACE 0,0,NORTH');
            simulation.right();
            expect( simulation.report() ).to.equal('0,0,EAST');
        });

        it('should rotate the robot from EAST to SOUTH', function () {
            simulation.place('PLACE 0,0,EAST');
            simulation.right();
            expect( simulation.report() ).to.equal('0,0,SOUTH');
        });

        it('should rotate the robot from SOUTH to WEST', function () {
            simulation.place('PLACE 0,0,SOUTH');
            simulation.right();
            expect( simulation.report() ).to.equal('0,0,WEST');
        });

        it('should rotate the robot from WEST to NORTH', function () {
            simulation.place('PLACE 0,0,WEST');
            simulation.right();
            expect( simulation.report() ).to.equal('0,0,NORTH');
        });
    });

    describe('report()', function () {
        it('should return the correct report string after a PLACE', function () {
            simulation.place('PLACE 1,1,NORTH');
            expect( simulation.report() ).to.equal('1,1,NORTH');
        });

        it('should return an empty string when no commands have been executed', function () {
            simulation.place('');
            expect( simulation.report() ).to.equal('');
        });
    });

    describe('getCompassIndex()', function () {
        it('should return return the correct index for NORTH', function () {
            expect( simulation.getCompassIndex('NORTH') ).to.equal(0);
        });

        it('should return return the correct index for EAST', function () {
            expect( simulation.getCompassIndex('EAST') ).to.equal(1);
        });

        it('should return return the correct index for SOUTH', function () {
            expect( simulation.getCompassIndex('SOUTH') ).to.equal(2);
        });

        it('should return return the correct index for WEST', function () {
            expect( simulation.getCompassIndex('WEST') ).to.equal(3);
        });
    });

});

