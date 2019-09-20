import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  images = [
    '../../../assets/Images/hang.jpg',
    '../../../assets/Images/charts.jpg',
    '../../../assets/Images/saleAdv.jpg',
  ]

  
}
