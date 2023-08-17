import { Component, EventEmitter, Output } from '@angular/core';
import { BookFetchingService } from '../../_services/book-fetching.service';
import { Observable } from 'rxjs';

import { Book } from '../../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  filterBy: string = 'Title';
  selectedFormat: string = '';
  selectedLanguage: string = '';
  dropdownOpen: string | null = null;
  isSearchInputFocused: boolean = false;
  @Output() searchResultsEmitter: EventEmitter<Book[]> = new EventEmitter<Book[]>();

  constructor(private bookFetchingService: BookFetchingService){
  }

  onSearchInputFocus() {
    this.isSearchInputFocused = true;
  }

  onSearchInputBlur() {
    this.isSearchInputFocused = false;
  }

  toggleDropdown(dropdown: string) {
    this.dropdownOpen = this.dropdownOpen === dropdown ? null : dropdown;
  }

  performSearchBackend() {
    const searchQuery = (document.querySelector('.search-input') as HTMLInputElement).value;
    // Perform search logic using the searchQuery and filterBy
    this.bookFetchingService.searchBooksBackend(searchQuery, this.filterBy, this.selectedLanguage, this.selectedFormat);
  }
  performSearch() {
    const searchQuery = (document.querySelector('.search-input') as HTMLInputElement).value;
    this.bookFetchingService.searchBooks(searchQuery, this.filterBy, this.selectedLanguage, this.selectedFormat)
      .subscribe(searchResults => {
        this.searchResultsEmitter.emit(searchResults);
        console.log(searchResults);
      });
  }

  setFilter(filter: string) {
    this.filterBy = filter;
  }
  selectFormat(format: string) {
    this.selectedFormat = format;
    this.performSearch();
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    this.performSearch();
  }
}
