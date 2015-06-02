import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'createMessage'
})

@View({
    templateUrl: 'createmessage.html'
})

export class CreateMessage {

    constructor() {
        console.info('CreateMessage Component Mounted Successfully');
    }

}
