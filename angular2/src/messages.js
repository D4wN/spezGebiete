import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'messages'
})

@View({
    templateUrl: 'messages.html'
})

export class Messages {

    constructor() {
        console.info('Messages Component Mounted Successfully');
    }

}
