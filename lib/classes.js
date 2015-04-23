"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Classes + Default Parameters +  Modules
exports.classRun = classRun;

function classRun() {
    var classes_out = "3. Classes + Default Parameters +  Modules";
    console.log(classes_out);

    var Person = (function () {
        function Person(name, alter) {
            _classCallCheck(this, Person);

            this._name = name;
            this._alter = alter;
        }

        _createClass(Person, [{
            key: "toString",
            value: function toString() {
                return "Person(Name:" + this._name + ", Alter:" + this._alter + ")";
            }
        }, {
            key: "isAlive",
            get: function () {
                return this._alter <= 20;
            }
        }]);

        return Person;
    })();

    var Student = (function (_Person) {
        function Student(name, alter) {
            var fh_name = arguments[2] === undefined ? "FH-Bielefeld" : arguments[2];

            _classCallCheck(this, Student);

            _get(Object.getPrototypeOf(Student.prototype), "constructor", this).call(this, name, alter);
            this.fh_name = fh_name;
        }

        _inherits(Student, _Person);

        _createClass(Student, [{
            key: "toString",
            value: function toString() {
                return "Student[" + _get(Object.getPrototypeOf(Student.prototype), "toString", this).call(this) + ", FH-Name:" + this.fh_name + "]";
            }
        }]);

        return Student;
    })(Person);

    var m = new Student("Marvin", 24, "Bielefeld");
    console.log(m.toString());
    console.log("Alter=(Geht nicht, da Private!)");
    console.log("Lebt er noch? (Alter < 20) = " + m.isAlive);
    console.log("2. Student mit Default Param");
    var n = new Student("Roland", 26);
    console.log(n.toString());

    console.log("##############################################\n");
}

//# sourceMappingURL=classes.js.map