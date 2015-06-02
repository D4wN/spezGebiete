import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'messages'
})

@View({
    templateUrl: System.baseURL + "components/messages/messages.html"
})

export class Messages {

    constructor() {
        console.info('Messages Component Mounted Successfully');
    }

}
