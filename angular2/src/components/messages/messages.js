import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';
import {NgFor}  from 'angular2/angular2';

import {OneMessage} from '../oneMessage/oneMessage';

//$http Var
import {$http} from '../xhr-factory';

@Component({
    selector: 'messages',
    properties: {
        'test': 'test',
        'fid': 'fid'
    }
})

@View({
    templateUrl: System.baseURL + "components/messages/messages.html",
    directives: [NgFor]
})

export class Messages {

    constructor() {
        console.log('Messages.Constructor()');
        //Vars
        this.test = "test_default";
        this.fid = "fid_default"

        //this.folderId = folderId;
        this.messageLoaded = false;
        this.messageList = [];
        //Init
        //this.getMessages();
    }

    getMessages(){
        var debug_name = 'Messages.getMessages()';
        console.log(debug_name);

        //('http://localhost:3000/folder/'+ nameOfFolder +'/message')

        $http.get('http://localhost:3000/folder/'+ this.fid +'/message')
            .then((data) => {
                console.log(debug_name + ' Sucessfull!');
                this.messageLoaded = true;
                this.messageList = data;
                console.log(this.folderList);
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

}
