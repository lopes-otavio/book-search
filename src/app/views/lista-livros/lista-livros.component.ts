import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  map,
  Observable,
  switchMap,
  throwError,
} from "rxjs";
import { BookService } from "./../../services/book.service";
import { Component } from "@angular/core";
import { Book, Item } from "src/app/interfaces";
import { BookVolumeInfo } from "src/app/models/bookVolumeInfo";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-lista-livros",
  templateUrl: "./lista-livros.component.html",
  styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent {
  //#region public attributes
  public searchField: FormControl;
  public isLoading: boolean;
  public searchedBooks$: Observable<Book[]>;
  public errorMessage: string;
  //#endregion

  //#region private attributes
  //#endregion

  //#region contructor
  constructor(private bookService: BookService) {
    this.searchField = new FormControl();
    this.isLoading = false;
    this.searchedBooks$ = this.searchBooks();
    this.errorMessage = "";
  }
  //#endregion

  //#region angular lifecycle
  //#endregion

  //# region public methods
  //#endregion

  //# region private methods
  private searchBooks(): Observable<Book[]> {
    return this.searchField.valueChanges.pipe(
      debounceTime(500),
      filter((input) => input.length >= 3),
      switchMap((input) => this.bookService.searchBooks(input)),
      map((items) => this.resultForBookList(items)),
      catchError(() => {
        this.errorMessage =
          "Ops, estamos com problemas internos. Tente novamente mais tarde.";
        return EMPTY;
      })
    );
  }

  private resultForBookList(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }
  //#endregion
}
