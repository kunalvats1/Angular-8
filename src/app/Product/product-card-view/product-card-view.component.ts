import { Component, OnInit } from '@angular/core';
import { Products } from '../add-Product/product.model';
import { StudentService } from 'src/app/student.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-card-view',
  templateUrl: './product-card-view.component.html',
  styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {

  products: Products[];
  p = 1;
  public searchTerm: string;
  showSpinner: boolean = true;

  constructor(private empService: StudentService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.empService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(product => {
      this.showSpinner = false
      this.products = product;
    });
  }

  appitems = [
    {
      label: 'Customer',
      icon: 'sentiment_satisfied_alt',
      items: [
        {
          label: 'Views',
          link: '/cardView',
          icon: 'remove_red_eye'
        },
        {
          label: 'Add Customer',
          icon: 'person_add',
          link: '/newCustomer'
        }
      ]
    },
    {
      label: 'Product',
      icon: 'label_important',
      items: [
        {
          label: 'Add Product',
          link: '/add-product',
          icon: 'add_circle_outline'
        },
        {
          label: 'View Product',
          link: '/product-view',
          icon: 'portrait'
        }
      ]
    },
  ];
}
