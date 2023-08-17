import { Component, Input} from '@angular/core';
import { Book } from '../../_models';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent{
  @Input() searchResults: Book[] = [];
}

