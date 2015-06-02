import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

//$http Var
import {$http} from '../xhr-factory';

@Component({
    selector: 'oneMessage',
    properties: {
        'mid': 'mid',
        'fid': 'fid'
    }
})

@View({
    templateUrl: System.baseURL + "components/oneMessage/oneMessage.html"
})

export class OneMessage {

    constructor() {
        console.log('OneMessage.Constructor()');

        this.mid = "mid_default";
        this.fid = "fid_default";

        this.m = [];
    }

    getMessage(){
        var debug_name = 'OneMessage.getMessage()';
        console.log(debug_name);

        $http.get('http://localhost:3000/folder/'+ this.fid +'/message/' + this.mid)
            .then((data) => {
                console.log(debug_name + ' Sucessfull!');
                this.m[0] = data;
                console.log(this.m);
            })
            .catch((error) => {
                alert(debug_name + ' Error!');
            });
    }

    clickLoad(){
        var debug_name = 'OneMessage.clickLoad()';
        console.log(debug_name);

        this.getMessage();
    }
}
