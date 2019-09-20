import { Component, OnInit } from '@angular/core';
import { Products } from '../add-Product/product.model';
import { StudentService } from 'src/app/student.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private empService: StudentService, private router: Router) {
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

 }
