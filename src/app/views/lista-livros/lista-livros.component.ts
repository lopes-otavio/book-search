import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { BookService } from "./../../services/book.service";
import { Component, OnInit } from "@angular/core";
import { Book, BookResult, Item } from "src/app/interfaces";
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
  public errorMessage: string;
  public bookResult: BookResult;
  //#endregion

  //#region observables
  public searchedBooks$: Observable<Book[]>;
  //#endregion

  //#region private attributes
  //#endregion

  //#region contructor
  constructor(private bookService: BookService) {
    this.searchField = new FormControl();
    this.isLoading = false;
    this.errorMessage = "";
    this.searchedBooks$ = this.searchBooks();
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
      map((result) => (this.bookResult = result)),
      map((result) => result.items ?? []),
      map((items) => this.resultForBookList(items)),
      catchError((err) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              (this.errorMessage =
                "Ops, ocorreu um erro. Recarregue a aplicação!")
            )
        );
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
