import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';
import {NgFor}  from 'angular2/angular2';

import {OneMessage} from '../oneMessage/oneMessage';

//$http Var
import {$http} from '../xhr-factory';

@Component({
    selector: 'messages',
    properties: {
        'fid': 'fid'
    }
})

@View({
    templateUrl: System.baseURL + "components/messages/messages.html",
    directives: [NgFor, OneMessage]
})

export class Messages {

    constructor() {
        console.log('Messages.Constructor()');
        //Vars
        this.fid = "fid_default"

        //this.folderId = folderId;
        this.messageLoaded = false;
        this.messageList = [];
        this.messagesHidden = {};
        //Init
        //this.getMessages();
    }

    getMessages(){
        var debug_name = 'Messages.getMessages()';
        console.log(debug_name);

        $http.get('http://localhost:3000/folder/'+ this.fid +'/message')
            .then((data) => {
                console.log(debug_name + ' Sucessfull!');
                this.messageLoaded = true;
                this.messageList = data;

                this.initHiddenEntries();
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

    //http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ val +'/delete')
    deleteMessage(mid) {
        var debug_name = 'Messages.deleteMessage(\"' + mid + '\")';
        console.log(debug_name);
        if(!this.messageLoaded){
            console.log('foalderList not laoded yet...');
            return;
        }

        $http.delete('http://localhost:3000/folder/'+ this.fid +'/message/' + mid + '/delete').
            then((data) => {
                console.log(debug_name + ' Successfull!');
                this.removeFromList(mid);
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

    clickLoad(){
        var debug_name = 'Messages.clickLoad()';
        console.log(debug_name);

        this.getMessages();
    }

    clickDelete(name){
        var debug_name = 'Messages.clickDelete(\"' + name + '\")';
        console.log(debug_name);

        this.deleteMessage(name);
    }

    clickDetail(id){
        var debug_name = 'Messages.clickDetail(\"'+ id +'\")';
        console.log(debug_name);

        var hidden = this.messagesHidden[id];
        if(hidden == undefined || hidden == null){
            this.messagesHidden[id] = true;
            hidden = true;
        } else {
            hidden = !hidden;
            this.messagesHidden[id] = hidden;
        }
    }

    removeFromList(name){
        var debug_name = 'Message.removeFromList(\"' + name + '\")';
        console.log(debug_name);

        for(var i = 0; i < this.messageList.length; i++){
            if(this.messageList[i]._id == name){
                console.log("Removed from messageList -> " + name);
                this.messageList.splice(i, 1);
                return;
            }
        }
        console.log("Nothing removed from folderList.")
    }

    initHiddenEntries(){
        var debug_name = 'Messages.initHiddenEntries()';
        console.log(debug_name);

        for(var i = 0; i < this.messageList.length; i++){
            this.messagesHidden[this.messageList[i]._id] = true;
        }
    }
}
