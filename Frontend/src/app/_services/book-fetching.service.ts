import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Book } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class BookFetchingService {
  private featuredbookSubject: BehaviorSubject<Book[]>;
  private bookSubject: BehaviorSubject<Book[]>;
  public books: Observable<Book[]>;
  public featuredbooks: Observable<Book[]>;

  constructor(
    private router:Router,
    private http: HttpClient
  ) {
    this.featuredbookSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('featured-books')!))
    this.featuredbooks = this.featuredbookSubject.asObservable();
    //UNCOMMENT WHEN LAUNCHING FEATURED BOOKS
    // this.getFeaturedBooks();
    this.bookSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('books')!));
    this.books = this.bookSubject.asObservable();
    // COMMENT TO STOP ALL BOOKS
    this.getAllBooks();
  }
  getFeaturedBooks(): void {
    this.http.get<any>(`${environment.apiUrl}/books/featured-books`).pipe(
      map(response => {
        const featuredBooks = response.data;
        console.log(featuredBooks);
        localStorage.setItem('featured-books', JSON.stringify(featuredBooks));
        this.featuredbookSubject.next(featuredBooks); // Update the subject with all featured books
      })
    ).subscribe();
  }

  async getAllBooks(): Promise<void> {
    try {
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiUrl}/books/all-books`));
      
      const books = response.data.map((responseData: any) => this.mapResponseToBook(responseData));
  
      localStorage.setItem('books', JSON.stringify(books));
      this.bookSubject.next(books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  getBookDetails(bookId: string): Observable<Book | null> {
    return this.books.pipe(
      map(bookList => bookList.find(book => book.id === bookId) || null),
      catchError(error => {
        console.error('Error fetching book details:', error);
        return of(null);
      })
    );
  }

  private mapResponseToBook(responseData: any): Book {
    return {
      id: responseData._id,
      name: responseData.name,
      description: responseData.description,
      image: responseData.image,
      author: responseData.author,
      year: responseData.year,
      price: responseData.price,
      lang: responseData.lang,
      format: responseData.format
    };
  }
  searchBooksBackend(searchQuery: string, filterBy: string, selectedLanguage: string, selectedFormat: string): void {
    const queryParams = `?query=${searchQuery}&filter=${filterBy}&language=${selectedLanguage}&format=${selectedFormat}`;
    this.http.get<any>(`${environment.apiUrl}/books/search${queryParams}`).pipe(
      map(response => {
        const booksData = response.data;
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(booksData));
        this.bookSubject.next(booksData);
      })
    ).subscribe();
  }
  searchBookByName(name: string): Book | undefined {
    const storedBooks = this.bookSubject.value;
    
    return storedBooks.find(book => book.name === name);
  }
  searchBookByNameObservable(name: string, language: string, format: string): Observable<Book[]> {
    return new Observable<Book[]>(observer => {
      const storedBooks = this.bookSubject.value;
  
      const filteredBooks = storedBooks.filter(book => {
        const nameContainsSearch = book.name.toLowerCase().includes(name.toLowerCase());
        const languageMatch = language === '' || book.lang === language;
  
        if (format === '') {
          return nameContainsSearch && languageMatch;
        }
  
        const formats = book.format.split(' & ');
        const formatMatch = formats.includes(format) || formats.length === 1 && formats[0] === format;
  
        return nameContainsSearch && languageMatch && formatMatch;
      });
  
      observer.next(filteredBooks);
      observer.complete();
    });
  }
  
  
  searchBookByAuthorObservable(author: string, language:string, format: string): Observable<Book[]> {
    return new Observable<Book[]>(observer => {
      const storedBooks = this.bookSubject.value;
  
      const filteredBooks = storedBooks.filter(book => {
        const authorContainsSearch = book.author.toLowerCase().includes(author.toLowerCase());
        const languageMatch = language === '' || book.lang === language;
  
        if(format === ''){
          return authorContainsSearch && languageMatch;
        }
  
        const formats = book.format.split(' & ');
        const formatMatch = formats.includes(format) || formats.length === 1 && formats[0] === format;
        return authorContainsSearch && languageMatch && formatMatch;
      });
      observer.next(filteredBooks);
      observer.complete();
    });
  }
  searchBooks(searchQuery: string, filter: string, language: string, format: string): Observable<Book[]> {
    if (filter === 'Title') {
      return this.searchBookByNameObservable(searchQuery, language, format);
    } else if (filter === 'Author') {
      return this.searchBookByAuthorObservable(searchQuery, language, format);
    } else {
      // Handle invalid filter
      return of([]);
    }
  }
}
