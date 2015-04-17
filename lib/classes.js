"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

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