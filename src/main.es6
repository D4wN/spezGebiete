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

let output = "Aufgabenblatt 1: Ecmascript6, Typescript, Dart\n" +
             "##############################################";
console.log(output)

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