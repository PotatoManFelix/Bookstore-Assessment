import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../_models'; // Adjust the import path
import { BookFetchingService } from '../../_services'; // Adjust the import path
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../../_services';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;
  bookFormat : string;
  bookFormats : string[] | null;
  multipleFormats : Boolean;
  books: Observable<Book[]>;
  dropdownOpen: boolean = false;
  quantity : number = 1;
  constructor(
    private route: ActivatedRoute,
    private bookFetchingService: BookFetchingService,
    private cart: ShoppingCartService
  ) {
    this.books = bookFetchingService.books;
    this.bookFormat = '';
    this.multipleFormats = false;
    this.bookFormats = null;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookID = params.get('id');
      if (bookID) {
        this.getBookDetails(bookID);
      }
    });
    const bookFormats = this.book?.format.split(' & ')
    if(bookFormats && this.book){
      if(this.book && bookFormats.length === 1){
        this.bookFormat=this.book.format;
      }else if(this.book && bookFormats.length > 1){
        this.bookFormats = bookFormats;
        this.bookFormat = this.bookFormats[0];
        this.multipleFormats = true;
      }else{
        console.log("Book didn't load")
      }
    }
  }
  getBookDetails(bookid: string) {
    this.bookFetchingService.getBookDetails(bookid).subscribe(
      (book: Book | null) => {
        if (book) {
          this.book = book;
        } else {
          console.log('Book not found.');
          this.book = undefined;
        }
      }
    );
  }
  toggleDropdown() {
    if (this.multipleFormats) {
      this.dropdownOpen = !this.dropdownOpen;
   }
  }
  toggleDropdownOutsideClick(event : any) {
    if (this.multipleFormats) {
      event.stopPropagation();
      this.dropdownOpen = !this.dropdownOpen;
      console.log("REEEE")
   }
  }
  selectFormat(format : string){
    this.bookFormat = format
  }
  getFormatIcon(format: string): string {
    if (format === 'E-Book') {
      return 'fas fa-desktop';
    } else if (format === 'Paper-Book') {
      return 'fas fa-book-open';
    } else {
      return 'fas fa-book';
    }
  }
  decreaseQuantity(){
    this.quantity--;
  }
  increaseQuantity(){
    this.quantity++;
  }
  addToCart(){
    if(this.book){
      this.cart.addItem(this.book,this.quantity,this.bookFormat);
    }
  }
}