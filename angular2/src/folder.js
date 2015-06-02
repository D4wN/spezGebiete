import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'folder'
})

@View({
    templateUrl: 'folder.html'
})

export class Folder {

    constructor() {
        console.info('Folder Component Mounted Successfully');
    }

}
