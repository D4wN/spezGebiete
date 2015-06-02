import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap} from 'angular2/angular2';
import {CreateMessage} from 'createMessage';
import {Folder} from 'folder';
import {Messages} from 'messages'
import {OneMessage} from 'oneMessage'

@Component({
  selector: 'main'
})

@View({

  directives: [CreateMessage],
  template: `
    <createMessage></createMessage>
  `
})

class Main {

}

bootstrap(Main);
