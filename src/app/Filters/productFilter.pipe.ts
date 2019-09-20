import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../admin/add-Product/product.model';

@Pipe({
  name: 'Productfilter'
})
export class ProdFilter implements PipeTransform {

  transform(product: Products[], searchTerm: string): Products[] {
    if (!product || !searchTerm) {
      return product;
    }
    return product.filter((prod) =>
      prod.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
