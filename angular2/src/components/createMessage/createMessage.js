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

  }

  login(event, folder, msg) {
    event.preventDefault();
    console.log(folder + " :: " + msg)

    var FormData = {
      'chose' : folder,
      'newText' : msg
    };

    $http.post('http://localhost:3000/newMessage', FormData)
      .then((data) => {
        console.log(' Sucessfull!');
      })
      .catch((error) => {
        alert(' Error!');
      });

    /*
    fetch('http://localhost:3001/sessions/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })
      .then(status)
      .then(json)
      .then((response) => {
        localStorage.setItem('jwt', response.id_token);
        this.router.parent.navigate('/home');
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message);
      });*/
  }


}
