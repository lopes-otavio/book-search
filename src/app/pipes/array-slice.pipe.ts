import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arraySlice",
})
export class ArraySlicePipe implements PipeTransform {
  transform(value: any[]): any {
    if (value) {
      return value[0];
    }
    return "";
  }
}
