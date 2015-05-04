/**
 * Created by Marv on 04.05.2015.
 */

class Person{
    constructor(name){
        this.name = name;
    }

    toString(){
        return "Name:"+this.name;
    }
}

let p = new Person("Marv");
console.log(p);
//Hallo