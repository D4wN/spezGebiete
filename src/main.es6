require("babel/polyfill"); //..\WebstormProjects\node_modules\babel\polyfill.js   needed for generators

/*
 Async Functions (ES7) not in ES6
 Async Generators (ES7)not in ES6
 */

let output = "Aufgabenblatt 1: Ecmascript6, Typescript, Dart\n" +
             "##############################################";
console.log(output);
//Arrow Function
{
    let square2 = x => x * x;
    let af = square2(5);
    output+="1. Arrow Function:\nsSSquare2(5) = "+af+"\n##############################################\n";
    console.log("1. Arrow Function:\nsSSquare2(5) = "+af+"\n##############################################\n");
}
// Block Scoped Binding
{
    let bsb = "2. Block Scoped Binding\nSchleife:";
    for(let i_bsb = 0; i_bsb< 5; i_bsb++){
        bsb+=i_bsb+" ";
    }
    for(var i_bsb_g = 0; i_bsb_g<1; i_bsb_g++);
    bsb+="\nZugriff auf let i_bsb = ReferenceError: i_bsb is not defined\nZugriff auf var i_bsb_g = "+i_bsb_g+"\n##############################################";
    console.log(bsb);
    output+=bsb;

    //Bsp2
    var a = "Sichtbar(a)";
    var b = "Sichtbar(b)";
    {
        const tmp = a;
        a = b;
        b = tmp;
    }
    //console.log(tmp); //ReferenceError: tmp is not defined
}
//Classes, Import/Module, etc
import {classRun} from "./classes";
classRun();
//Computed Property Names
{
    console.log("4. Computed Property Names");
    let x = 0;
    let obj = {
        [x]: 'hello',
        [2]: 'world'
    };
    console.log("obj[x=0]="+obj[x]);
    console.log("obj[2]="+obj[2]);
    console.log("##############################################");
}
//Destructuring Assignment
{
    console.log("5. Destructuring Assignment");
    let [a, [b, c], d] = ["Hel", ["lo", ", "], "World"];
    console.log("a="+a)
    console.log("b="+b)
    console.log("c="+c)
    console.log("d="+d)
    console.log(a+b+c+d);

    //destructuring
    let pt = {x: 123, y: 456};
    console.log("pt.x="+pt.x);
    console.log("pt.y="+pt.y);
    let {x, y} = pt;
    console.log("x="+x);
    console.log("y="+y);
    console.log("##############################################");
}
//Iterators and For Of + Generators
{
    console.log("6. Iterators and For Of + Generators");
    let arr = [1,2,3,4,5]
    console.log("For of");
    for(let i of arr){
        console.log("i="+i);
    }

    console.log("Iterator");
    function iterateElements(array) {
        return {
            [Symbol.iterator]: function() {
                var index = 0;
                var current;
                return {
                    next: function() {
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
                        }
                    }
                };
            }
        };
    }
    for(let it of iterateElements(arr)){
        console.log("it="+it);
    }

    console.log("Generator ");

    function Item(left, label, right) {
        this.left = left;
        this.label = label;
        this.right = right;
    }


     function* myGenerator(t){
         if (t) {
             yield* myGenerator(t.left);
             yield t.label;
             yield* myGenerator(t.right);
         }
     }

    function make(array) {
        if (array.length == 1) return new Item(null, array[0], null);
        return new Item(make(array[0]), array[1], make(array[2]));
    }

    let ar = make([['item1'],'item2',['item3']]);

    for(let itm of myGenerator(ar)){
        console.log("Item Label:"+itm);
    }

    console.log("##############################################");
}

//Numercial Literals
{
    console.log("7. Numerical Literals");
    let bin = 0b0;
    let oct = 0o0;
    console.log("Binary: " + bin +" equals Oct: " + oct + " = " + bin == oct);
    console.log("##############################################");
}

//Property Method Assignment
{
    console.log("8. Property Method Assignment");
    let num = 540;
    let obj = {
        param: num,
        toString(){
            return this.param;
        }
    }
    console.log(obj.toString() == num);
    console.log("##############################################");
}

//Object Initializer Shorthand
{
    console.log("9. Object Initializer Shorthand");
    function point(){
        let x= 540;
        let y = 590;

        return{x,y};
    }
    console.log(point());
    console.log("##############################################");
}

//REST Parameters
{
    console.log("10. REST Parameters");

    function push(array, ...items) {
        items.forEach(function(item) {
            array.push(item);
        });
    }
    let res = [];
    push(res, 1, 2, 3);

    console.log(res);
    console.log("##############################################");
}

//Spread
{
    console.log("11. Spread");
    function push(array, ...items) {
        array.push(...items);
    }

    function add(x, y) {
        return x + y;
    }

    let numbers = [4, 38];
    console.log(add(...numbers) == 42);

    let a = [1];
    let b = [2, 3, 4];
    let c = [6, 7];
    let d = [0, ...a, ...b, 5, ...c];

    console.log(d);
    console.log("##############################################");
}

//Template Literals
{
    console.log("12. Template Literals");
    let name = 'mario';
    let greeting = `itse me ${name}`;
    console.log(greeting == "itse me mario");
    console.log("##############################################");
}

//Promises
{
    console.log("13. Promises");
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    timeout(100).then(() => {
        console.log('13.Promise done');
    });

    console.log("##############################################");
}

//Symbols
{
    console.log("14. Symbols");
    let s = Symbol();
    let object = {};
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