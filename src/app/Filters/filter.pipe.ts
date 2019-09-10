import { Pipe, PipeTransform } from '@angular/core';
import { employee } from '../employee';

@Pipe({
  name: 'Empfilter'
})
export class FilterPipe implements PipeTransform {

  transform(emp: employee[], searchTerm: string): employee[] {
    if (!emp || !searchTerm) {
      return emp;
    }
    return emp.filter((emp) => 
      emp.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
