import {ComponentAnnotation as Component, ViewAnnotation as View, Template} from 'angular2/angular2';
//$http Var
import {$http} from '../xhr-factory';

@Component({
  selector: 'createMessage'
})

@View({
  templateUrl: System.baseURL + "components/createMessage/createmessage.html"
})

export class CreateMessage {
  constructor() {
    console.log('CreateMessage.Constructor()');
    this.texts = "default";
  }

  login(event, folder, msg) {
    event.preventDefault();

    if ((folder != "undefined" ) && folder.length > 0) {
      var FormData = {
        'chose': folder,
        'newText': msg
      };

      $http.post('http://localhost:3000/newMessage', FormData)
        .then((data) => {
          console.log(' Sucessfull!');
          document.getElementById("status").innerHTML = "Message: '" + msg + "' was added to Folder: '" + folder + "'";
            this.texts = "its working";
        })
        .catch((error) => {
          alert(' Error!');
        });
    } else {
      document.getElementById("status").innerHTML = "Please Enter a folder";
    }
  }


}
