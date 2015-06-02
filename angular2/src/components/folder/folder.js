import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';
import {NgFor}  from 'angular2/angular2';

import {Messages} from '../messages/messages';

//$http Var
import {$http} from '../xhr-factory';

@Component({
    selector: 'folder'
})

@View({
    templateUrl:  System.baseURL + "components/folder/folder.html",
    directives: [NgFor, Messages]
})

export class Folder {
    //folderList: array;
    constructor() {
        console.log('Folder.Constructor()');
        //Vars
        this.folderList = [];
        this.folderLoaded = false;
        this.messagesHidden = {};
        //Init
        this.getFolder();
    }

    getFolder() {
        var debug_name = 'Folder.getFolder()';
        console.log(debug_name);

        $http.get('http://localhost:3000/folder')
            .then((data) => {
                console.log(debug_name + ' Sucessfull!');
                this.folderLoaded = true;
                this.folderList = data;
                console.log(this.folderList);

                //init hide
                this.initHiddenEntries();
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

    deleteFolder(folderName) {
        var debug_name = 'Folder.deleteFolder(\"' + folderName + '\")';
        console.log(debug_name);
        if(!this.folderLoaded){
            console.log('foalderList not laoded yet...');
            return;
        }

        $http.delete('http://localhost:3000/folder/delete/' + folderName).
            then((data) => {
                console.log(debug_name + ' Successfull!');
                this.removeFromList(folderName);
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

    clickOpen(name){
        var debug_name = 'Folder.clickOpen(\"' + name + '\")';
        console.log(debug_name);

        //var prefix = "MESSAGES-";

        var hidden = this.messagesHidden[name];
        if(hidden == undefined || hidden == null){
            this.messagesHidden[name] = true;
            hidden = true;
        } else {
            hidden = !hidden;
            this.messagesHidden[name] = hidden;
        }

        if(!hidden){
            console.log("get Messages");
        } else {
            console.log("no");
        }
    }

    clickRemove(name){
        var debug_name = 'Folder.clickRemove(\"' + name + '\")';
        console.log(debug_name);

        this.deleteFolder(name);
    }

    clickRename(name){
        var debug_name = 'Folder.clickRename(\"' + name + '\")';
        console.log(debug_name);

        var prefix = 'RENAME-'
        var newNameEle = document.getElementById((prefix + name));
        if(newNameEle == undefined || newNameEle == null) return;
        var newName = newNameEle.value;
        if(newName == name) return;

        $http.put('http://localhost:3000/folder/'+ name +'/'+ newName)
            .then((data) => {
                console.log(debug_name + ' Successfull!');
                this.renameInList(name, newName);
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

    removeFromList(name){
        var debug_name = 'Folder.removeFromList(\"' + name + '\")';
        console.log(debug_name);

        for(var i = 0; i < this.folderList.length; i++){
            if(this.folderList[i]._id == name){
                console.log("Removed from folderList -> " + name);
                this.folderList.splice(i, 1);
                return;
            }
        }
        console.log("Nothing removed from folderList.")
    }

    renameInList(name, newName){
        var debug_name = 'Folder.renameInList(\"' + name + '\", \"' + newName + '\")';
        console.log(debug_name);

        for(var i = 0; i < this.folderList.length; i++){
            if(this.folderList[i]._id == name){
                this.folderList[i]._id = newName;
                return;
            }
        }
        console.log("Nothing found in folderList.")
    }

    initHiddenEntries(){
        var debug_name = 'Folder.initHiddenEntries()';
        console.log(debug_name);

        for(var i = 0; i < this.folderList.length; i++){
            this.messagesHidden[this.folderList[i]._id] = true;
        }
    }

}

/**
 WICHTIG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 https://github.com/angular/angular/issues/1655

 I found the issue regarding the directives. The documentation refers to the For, If and Switch directives, but when I dived into the code, I found it these directives actually are NgFor, NgIf and NgSwitch. Not sure why, probably for backward compatibility with angular 1.4?

 When keeping that in mind, and using this code as the main.ts file

 import {Component, View, NgFor, bootstrap} from "angular2/angular2";

 @Component({
  selector: 'my-app',
  appInjector: [FooService]
})
 @View({
  template: `
    <h1>Sup {{ name }}</h1>
    <div *ng-for="#item of list">{{ item }}</div>
  `,
  directives: [NgFor]
})
 class AppComponent {

  name: string;
  list: string[];

  constructor(fooService: FooService) {
    this.name = 'Ben';
    this.list = fooService.list;
  }
}

 bootstrap(AppComponent);
 Everything should work like a charm.

 Note: Do not use the angular2.d.ts type definition because it will not compile. The type definition uses For, If and Switch as well.

 */