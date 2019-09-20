import { Component, OnInit } from '@angular/core';
import { employee } from '../../employee';
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit {

  lat: number;
  lng: number;
  emp: employee;
  loc: Array<string>;
  imageUrl: string;
  orders: Array<Object>;
  totalPrice: number;
  name: string;
  address: string;

  constructor(public empService: StudentService, private router: Router) { }

  ngOnInit() {
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
}