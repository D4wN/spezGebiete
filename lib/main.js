
//Classes, Import/Module, etc
"use strict";

var _defineProperty = require("babel-runtime/helpers/define-property")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")["default"];

var _classRun = require("./classes");

require("babel").transform("code", { optional: ["runtime"] });

/*
 Numeric Literals
 Property Method Assignment
 Object Initializer Shorthand
 Rest Parameters
 Spread
 Template Literals
 Promises

 +Symbols (ES6, but performance?)
 Async Functions (ES7)
 Async Generators (ES7)??
 */

var output = "Aufgabenblatt 1: Ecmascript6, Typescript, Dart\n" + "##############################################";
console.log(output);

//Arrow Function
{
    var square2 = function square2(x) {
        return x * x;
    };
    var af = square2(5);
    output += "1. Arrow Function:\nsSSquare2(5) = " + af + "\n##############################################\n";
    console.log("1. Arrow Function:\nsSSquare2(5) = " + af + "\n##############################################\n");
}
// Block Scoped Binding
{
    var bsb = "2. Block Scoped Binding\nSchleife:";
    for (var i_bsb = 0; i_bsb < 5; i_bsb++) {
        bsb += i_bsb + " ";
    }
    for (var i_bsb_g = 0; i_bsb_g < 1; i_bsb_g++);
    bsb += "\nZugriff auf let i_bsb = ReferenceError: i_bsb is not defined\nZugriff auf var i_bsb_g = " + i_bsb_g + "\n##############################################";
    console.log(bsb);
    output += bsb;

    //Bsp2
    var a = "Sichtbar(a)";
    var b = "Sichtbar(b)";
    {
        var tmp = a;
        a = b;
        b = tmp;
    }
    //console.log(tmp); //ReferenceError: tmp is not defined
}
_classRun.classRun();
//Computed Property Names
{
    var _obj;

    console.log("4. Computed Property Names");
    var x = 0;
    var obj = (_obj = {}, _defineProperty(_obj, x, "hello"), _defineProperty(_obj, 2, "world"), _obj);
    console.log("obj[x=0]=" + obj[x]);
    console.log("obj[2]=" + obj[2]);
    console.log("##############################################");
}
//Destructuring Assignment
{
    console.log("5. Destructuring Assignment");
    var _a = "Hel";
    var _b = "lo";
    var c = ", ";
    var d = "World";

    console.log("a=" + _a);
    console.log("b=" + _b);
    console.log("c=" + c);
    console.log("d=" + d);
    console.log(_a + _b + c + d);

    //destructuring
    var pt = { x: 123, y: 456 };
    console.log("pt.x=" + pt.x);
    console.log("pt.y=" + pt.y);
    var x = pt.x;
    var y = pt.y;

    console.log("x=" + x);
    console.log("y=" + y);
    console.log("##############################################");
}
//Iterators and For Of + Generators
{
    var iterateElements = function (array) {
        var _ref;

        return (_ref = {}, _ref[_Symbol$iterator] = function () {
            var index = 0;
            var current;
            return {
                next: function next() {
                    if (index < array.length) {
                        current = array[index++];
                        return {
                            value: current,
                            done: false
                        };
                    }
                    return {
                        value: undefined,
                        done: true
                    };
                }
            };
        }, _ref);
    };

    console.log("6. Iterators and For Of + Generators");
    var arr = [1, 2, 3, 4, 5];
    console.log("For of");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _getIterator(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            console.log("i=" + i);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log("Iterator");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _getIterator(iterateElements(arr)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var it = _step2.value;

            console.log("it=" + it);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    console.log("Generator TODO");

    /*
    class Item{
        constructor(label, next = null){
            this.label = label;
            this.next = next;
        }
    }
    let gen = {
        [Symbol.iterator]: function* myGenerator(item){
            if(item){
                yield item.label;
                yield* item.next;
            }
        }
    }
        let i3 = new Item("Item3");
    let i2 = new Item("Item2", i3);
    let i1 = new Item("Item1", i2);
      for(itm of gen.myGenerator(i1)){
        console.log("Item Label:"+itm);
    }*/

    console.log("##############################################");
}

//Last output
//console.log(output);