/**
 * Created by Merlen on 03.05.2015.
 */

var Converter = (function () {
    function Converter() {
    }

    Converter.prototype.rgbToHex = function (red, green, blue) {
        var redHex = red.toString(16);
        var greenHex = green.toString(16);
        var blueHex = blue.toString(16);
        return pad(redHex) + pad(greenHex) + pad(blueHex);
    };
    function pad(hex) {
        return (hex.length === 1 ? "0" + hex : hex);
    }

    Converter.prototype.hexToRgb = function (hex) {
        var red = parseInt(hex.substring(0, 2), 16);
        var green = parseInt(hex.substring(2, 4), 16);
        var blue = parseInt(hex.substring(4, 6), 16);
        return [red, green, blue];
    };
    return Converter;
})();
//######################################################################################################################

var assert = require("assert");

describe('Color Converter', function () {
    describe('HEX to RGB', function () {
        it('Input #ffeeff should be RGB[255,238,255]', function () {
            var c = new Converter();
            //http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
            assert.deepEqual(c.hexToRgb("ffeeff"), [255, 238, 255]);
        }),
            it('Input #000000 should be RGB[0,0,0]', function () {
                var c = new Converter();
                //http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
                assert.deepEqual(c.hexToRgb("000000"), [0, 0, 0]);
            })
    });

    describe('RGB to HEX', function () {
        it('Input RGB[244,255,244] should return #f4fff4', function () {
            var c = new Converter();
            assert.equal(c.rgbToHex(244, 255, 244), "f4fff4");
        }),
            it('Input RGB[0 0,0] should return #000000', function () {
                var c = new Converter();
                assert.equal(c.rgbToHex(0, 0, 0), "000000");
            })
    });
});
