import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss']
})
export class LoginhomeComponent implements OnInit {

  constructor(private service: StudentService) { }

  ngOnInit() {
  }

  logOut() {
    this.service.logout();
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
