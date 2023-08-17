import { Component, OnInit} from '@angular/core';
import { Book } from '../../_models';
import { BookFetchingService } from '@app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  receivedSearchResults: Book[] = [];
  constructor(private bookfetchingService: BookFetchingService){};

  receiveSearchResults(results: Book[]) {
    this.receivedSearchResults = results;
  }
  //on return to the home page load all books
  ngOnInit(): void {
    this.bookfetchingService.books.subscribe(
      books => {
        this.receiveSearchResults(books);
      }
    )
  }
}
