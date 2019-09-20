import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router, private service: StudentService) { }

  ngOnInit() {
  }

  selectedItem(event) {
    this.router.navigate([event.link]);
  }

  logout() {
    this.service.logout();
  }

  public appitems = [
    {
      label: 'Analytics',
      link: '/admin',
      faIcon: 'fa fa-bar-chart',
    },
    {
      label: 'Customer',
      icon: 'sentiment_satisfied_alt',
      items: [
        {
          label: 'Customer View',
          link: 'admin/card-view',
          icon: 'remove_red_eye'
        },
        {
          label: 'Add Customer',
          icon: 'person_add',
          link: 'admin/new-customer'

        }
      ]
    },
    {
      label: 'Product',
      icon: 'label_important',
      items: [
        {
          label: 'Add Product',
          link: 'admin/add-product',
          icon: 'add_circle_outline'
        },
        {
          label: 'View Product',
          link: 'admin/product-view',
          icon: 'portrait'
        }
      ]
    }
  ];

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    selectedLinkFontColor: 'red',
  };
}
