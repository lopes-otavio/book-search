import { Subscription } from "rxjs";
import { BookService } from "./../../services/book.service";
import { Component, OnDestroy } from "@angular/core";
import { Book, Item } from "src/app/interfaces";
import { BookVolumeInfo } from "src/app/models/bookVolumeInfo";

@Component({
  selector: "app-lista-livros",
  templateUrl: "./lista-livros.component.html",
  styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent implements OnDestroy {
  //#region public attributes
  public listaLivros: Book[];
  public searchField: string;
  public isLoading: boolean;
  //#endregion

  //#region private attributes
  private bookSubscription: Subscription;
  //#endregion

  //#region contructor
  constructor(private bookService: BookService) {
    this.searchField = "";
    this.isLoading = false;
  }
  //#endregion

  //#region angular lifecycle
  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
  //#endregion

  //# region public methods
  public searchBooks() {
    this.isLoading = true;
    this.bookSubscription = this.bookService
      .searchBooks(this.searchField)
      .subscribe({
        next: (resp) => (this.listaLivros = this.resultForBookList(resp)),
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      });
  }
  //#endregion

  //# region private methods
  private resultForBookList(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }
  //#endregion
}
