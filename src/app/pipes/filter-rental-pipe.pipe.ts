import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRentalPipe'
})
export class FilterRentalPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
