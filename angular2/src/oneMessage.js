import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'oneMessage'
})

@View({
    templateUrl: 'oneMessage.html'
})

export class OneMessage {

    constructor() {
        console.info('OneMessage Component Mounted Successfully');
    }

}
