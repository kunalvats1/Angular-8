import { Component, OnInit } from '@angular/core';
import { employee } from '../employee';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent {

  lat: number;
  lng: number;
  emp: employee;
  loc: Array<string>;
  imageUrl: string;
  orders: Array<Object>;
  totalPrice: number;
  name: string;
  address: string;

  constructor(public empService: StudentService) {
    this.getData();
  }

  getData() {
    this.emp = JSON.parse(localStorage.getItem('value'));
    this.loc = Object.values(this.emp.location);
    this.lat = parseFloat(this.loc[0]);
    this.lng = parseFloat(this.loc[1]);
    this.imageUrl = this.emp.url;
    this.orders = this.emp.order;
    this.name = this.emp.firstName + " " + this.emp.lastName;
    this.address = this.emp.address.city + ", " + this.emp.address.state + ", " + this.emp.address.country;
    this.totalPrice = this.emp.totalPrice;
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
