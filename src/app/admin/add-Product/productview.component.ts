import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Products } from './product.model';
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.scss']
})
export class ProductviewComponent {

  product: Products;
  imagePath: any;
  imgUrl: any;
  selectedFile: FileList;

  productForm = new FormGroup({
    category: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private empService: StudentService, private router: Router) { }

  detectFile(event, files: any) {
    this.selectedFile = event.target.files;

    if (files.length === 0) { return; }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgUrl = reader.result;
    };
  }

  onSubmit() {
    this.product = new Products();
    this.product.category = this.productForm.controls.category.value;
    this.product.product = this.productForm.controls.product.value;
    this.product.price = this.productForm.controls.price.value;
    this.product.description = this.productForm.controls.description.value;

    // For uploading image files
    let file = this.selectedFile.item(0);
    this.product.image = file;
    this.empService.createProduct(this.product);
    this.empService.successDataSave();
    this.productForm.reset();
    this.imgUrl = '';
  }

}
