// Classes + Default Parameters +  Modules
export function classRun(){
    let classes_out = "3. Classes + Default Parameters +  Modules";
    console.log(classes_out);
    class Person{
        constructor(name, alter){
            this._name = name;
            this._alter = alter;
        }
        toString() {
            return "Person(Name:" + this._name + ", Alter:" + this._alter+")";
        }

        get isAlive(){
            return this._alter <= 20;
        }
    }

    class Student extends Person{
        constructor(name, alter, fh_name = "FH-Bielefeld"){
            super(name, alter);
            this.fh_name = fh_name;
        }
        toString(){
            return "Student["+super.toString()+", FH-Name:"+this.fh_name+"]";
        }
    }

    let m = new Student("Marvin", 24, "Bielefeld");
    console.log(m.toString());
    console.log("Alter=(Geht nicht, da Private!)");
    console.log("Lebt er noch? (Alter < 20) = "+m.isAlive);
    console.log("2. Student mit Default Param");
    let n = new Student("Roland", 26);
    console.log(n.toString());

    console.log("##############################################\n");
}


