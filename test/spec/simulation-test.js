'use strict';

var chai   = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var Simulation  = require('../../src/scripts/simulation'),
    exampleData = require('../../src/scripts/example');


describe('Simulation', function () {

    var simulation;

    beforeEach(function () {
        simulation = new Simulation({ x:5, y:5 });
    });

    describe('process()', function () {
        it('should return the expected output given input from "Example a"', function () {
            simulation.process(exampleData.a.input)
            expect( simulation.getOutput() )
                .to.equal( exampleData.a.expected_output );
        });

        it('should return the expected output given input from "Example b"', function () {
            simulation.process(exampleData.b.input)
            expect( simulation.getOutput() )
                .to.equal( exampleData.b.expected_output );
        });

        it('should return the expected output given input from "Example c"', function () {
            simulation.process(exampleData.c.input)
            expect( simulation.getOutput() )
                .to.equal( exampleData.c.expected_output );
        });
    });

    describe('reset()', function () {
        beforeEach(function () {
            simulation.process('PLACE 3,3,NORTH');
            simulation.reset();
        });

        it('should reset the position', function () {
            expect( simulation.getPosition() ).to.equal(null);
        });

        it('should reset the output', function () {
            expect( simulation.getOutput() ).to.equal('');
        });
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

            simulation.place('PLACE 0,4,NORTH');
            simulation.move();
            expect( simulation.report() ).to.equal('0,5,NORTH');
        });

        it('should move to the correct position facing EAST', function () {
            simulation.place('PLACE 0,0,EAST');
            simulation.move()
            expect( simulation.report() ).to.equal('1,0,EAST');

            simulation.place('PLACE 4,0,EAST');
            simulation.move()
            expect( simulation.report() ).to.equal('5,0,EAST');
        });

        it('should move to the correct position facing SOUTH', function () {
            simulation.place('PLACE 0,1,SOUTH');
            simulation.move()
            expect( simulation.report() ).to.equal('0,0,SOUTH');

            simulation.place('PLACE 0,1,SOUTH');
            simulation.move();
            expect( simulation.report() ).to.equal('0,0,SOUTH');
        });

        it('should move to the correct position facing WEST', function () {
            simulation.place('PLACE 1,0,WEST');
            simulation.move()
            expect( simulation.report() ).to.equal('0,0,WEST');

            simulation.place('PLACE 1,0,WEST');
            simulation.move()
            expect( simulation.report() ).to.equal('0,0,WEST');
        });

        it('should not move when facing NORTH with no room', function () {
            simulation.place('PLACE 0,5,NORTH');
            simulation.move()
            expect( simulation.report() ).to.equal('0,5,NORTH');
        });

        it('should not move when facing EAST with no room', function () {
            simulation.place('PLACE 5,0,EAST');
            simulation.move()
            expect( simulation.report() ).to.equal('5,0,EAST');
        });

        it('should not move when facing SOUTH with no room', function () {
            simulation.place('PLACE 0,0,SOUTH');
            simulation.move()
            expect( simulation.report() ).to.equal('0,0,SOUTH');
        });

        it('should not move when facing WEST with no room', function () {
            simulation.place('PLACE 0,0,WEST');
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

    describe('getOutput()', function () {
        it('should return the correct output with one REPORT command', function () {
            var input = [
                'PLACE 1,1,NORTH',
                'REPORT'
            ].join('\n');
            simulation.process(input);
            expect( simulation.getOutput() ).to.equal('1,1,NORTH');
        });

        it('should return the correct output with multiple REPORT commands', function () {
            var input = [
                'PLACE 1,1,NORTH',
                'REPORT',
                'PLACE 2,2,NORTH',
                'REPORT'
            ].join('\n');
            simulation.process(input);
            expect( simulation.getOutput() ).to.equal('1,1,NORTH\n2,2,NORTH');
        });
    });

});

