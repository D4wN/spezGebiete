import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap} from 'angular2/angular2';
import {CreateMessage} from './components/createMessage/createMessage';
import {Folder} from './components/folder/folder';
import {Messages} from './components/messages/messages'
import {OneMessage} from './components/oneMessage/oneMessage'

@Component({
  selector: 'main'
})

@View({

  directives: [Folder],
  template: `
    <folder></folder>
  `
})

class Main {

}

bootstrap(Main);
