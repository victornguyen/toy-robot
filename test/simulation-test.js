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
    });

    describe('left()', function () {
    });

    describe('right()', function () {
    });

    describe('report()', function () {
    });

});

