import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
  transform(list: any[], column: string): any[] {
    column = column.toLocaleLowerCase();
    return list.sort((a, b) => {
      if(a[column] > b[column]) {
        return 1;
      } else if(a[column] < b[column]) {
        return -1;
      }
      return 0;
    })
  }
}
