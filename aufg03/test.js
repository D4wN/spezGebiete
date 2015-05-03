/**
 * Created by Merlen on 03.05.2015.
 *
 * Unit Tests with mocha.js
 */


var assert = require("assert");
var converter = require("aufg3.js");

describe('Color', function(){
    describe('#HEX to RGB', function(){
        it('Description of return value', function(){
            assert.equal("Farbe ?", converter.rgbToHex(244, 255, 244));
        })
    });

    describe('#RGB to HEX', function(){
        it('Description of return value', function(){
            assert.equal("Farbe ?", converter.hexToRgb("FFEEFF"));
        })
    });
});