"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == "undefined" || key.constructor !== Symbol, configurable: true, writable: true }); };

//Classes, Import/Module, etc

var _classRun = require("./classes");

require("babel/polyfill"); //..\WebstormProjects\node_modules\babel\polyfill.js   needed for generators

/*
 Async Functions (ES7) not in ES6
 Async Generators (ES7)not in ES6
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
    var _iteratorNormalCompletion;

    var _didIteratorError;

    var _iteratorError;

    var _iterator, _step;

    var _iteratorNormalCompletion2;

    var _didIteratorError2;

    var _iteratorError2;

    var _iterator2, _step2;

    var _iteratorNormalCompletion3;

    var _didIteratorError3;

    var _iteratorError3;

    var _iterator3, _step3;

    (function () {
        var iterateElements = function (array) {
            var _ref;

            return (_ref = {}, _ref[Symbol.iterator] = function () {
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

        var Item = function (left, label, right) {
            this.left = left;
            this.label = label;
            this.right = right;
        };

        var myGenerator = regeneratorRuntime.mark(function callee$1$0(t) {
            return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        if (!t) {
                            context$2$0.next = 5;
                            break;
                        }

                        return context$2$0.delegateYield(myGenerator(t.left), "t0", 2);

                    case 2:
                        context$2$0.next = 4;
                        return t.label;

                    case 4:
                        return context$2$0.delegateYield(myGenerator(t.right), "t1", 5);

                    case 5:
                    case "end":
                        return context$2$0.stop();
                }
            }, callee$1$0, this);
        });

        var make = function (array) {
            if (array.length == 1) return new Item(null, array[0], null);
            return new Item(make(array[0]), array[1], make(array[2]));
        };

        console.log("6. Iterators and For Of + Generators");
        var arr = [1, 2, 3, 4, 5];
        console.log("For of");
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;

        try {
            for (_iterator = arr[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;

        try {
            for (_iterator2 = iterateElements(arr)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

        console.log("Generator ");

        var ar = make([["item1"], "item2", ["item3"]]);

        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;

        try {
            for (_iterator3 = myGenerator(ar)[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var itm = _step3.value;

                console.log("Item Label:" + itm);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                    _iterator3["return"]();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        console.log("##############################################");
    })();
}

//Numercial Literals
{
    console.log("7. Numerical Literals");
    var bin = 0;
    var oct = 0;
    console.log("Binary: " + bin + " equals Oct: " + oct + " = " + bin == oct);
    console.log("##############################################");
}

//Property Method Assignment
{
    console.log("8. Property Method Assignment");
    var num = 540;
    var obj = {
        param: num,
        toString: function toString() {
            return this.param;
        }
    };
    console.log(obj.toString() == num);
    console.log("##############################################");
}

//Object Initializer Shorthand
{
    var point = function () {
        var x = 540;
        var y = 590;

        return { x: x, y: y };
    };

    console.log("9. Object Initializer Shorthand");

    console.log(point());
    console.log("##############################################");
}

//REST Parameters
{
    var push = function (array) {
        for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            items[_key - 1] = arguments[_key];
        }

        items.forEach(function (item) {
            array.push(item);
        });
    };

    console.log("10. REST Parameters");

    var res = [];
    push(res, 1, 2, 3);

    console.log(res);
    console.log("##############################################");
}

//Spread
{
    var push = function (array) {
        for (var _len2 = arguments.length, items = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            items[_key2 - 1] = arguments[_key2];
        }

        array.push.apply(array, items);
    };

    var add = function (x, y) {
        return x + y;
    };

    console.log("11. Spread");

    var numbers = [4, 38];
    console.log(add.apply(undefined, numbers) == 42);

    var _a2 = [1];
    var _b2 = [2, 3, 4];
    var c = [6, 7];
    var d = [0].concat(_a2, _b2, [5], c);

    console.log(d);
    console.log("##############################################");
}

//Template Literals
{
    console.log("12. Template Literals");
    var _name = "mario";
    var greeting = "itse me " + _name;
    console.log(greeting == "itse me mario");
    console.log("##############################################");
}

//Promises
{
    var timeout = function (ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    };

    console.log("13. Promises");

    timeout(100).then(function () {
        console.log("13.Promise done");
    });

    console.log("##############################################");
}

//Symbols
{
    console.log("14. Symbols");
    var s = Symbol();
    var object = {};
    object[s] = 420;

    console.log(object[s] == 420);
    console.log("##############################################");
}

//Async Function
{
    console.log("15. Async Functions not includes in ES6");
    /*
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
      async function asyncValue(value) {
        await timeout(50);
        return value;
    }
      (async function() {
        let value = await asyncValue(42).catch(console.error.bind(console));
        assert.equal(42, value);
        done();
    })();
    */
    console.log("##############################################");
}

//Async Generators
{
    console.log("16. Async Generators  not includes in ES6");
    /*
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
      async function* asyncStream() {
        let i = 0;
        while (true) {
            await timeout(50);
            yield i;
            ++i;
        }
    }
      (async function() {
        let count = 0;
        for (value on asyncStream()) {
            count += value;
            if (value === 10) {
                break;
            }
        }
        assert.equal(count, 55); // 55 = 1 + 2 + ... + 10
        done();
    })();
    */
    console.log("##############################################");
}

//Last output
//console.log(output);

//# sourceMappingURL=main.js.map