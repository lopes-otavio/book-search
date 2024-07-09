import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { BookResult, Item } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private readonly resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "https://www.googleapis.com/books/v1/volumes";
  }

  public searchBooks(input: string): Observable<Item[]> {
    if (!input) {
      return null;
    }

    const params: HttpParams = new HttpParams().append("q", input);
    return this.httpClient
      .get<BookResult>(this.resourceUrl, { params })
      .pipe(map((resp) => resp.items));
  }
}
