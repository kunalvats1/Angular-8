import { Component } from '@angular/core';
import { StudentService } from '../../student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { employee } from '../../employee';
import { Order } from './edit-view.model';
import { Orders } from '../../order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editview',
  templateUrl: './editview.component.html',
  styleUrls: ['./editview.component.scss']
})
export class EditviewComponent {

  categoryMap = {
    'Men': [
      { 'Tshirt': 500 },
      { 'Shirt': 600 },
      { 'Jeans': 400 },
    ],
    'Women': [
      { 'Top': 400 },
      { 'Skirt': 1660 },
      { 'Jeans': 3400 },
    ],
  }

  constructor(private empService: StudentService, private router: Router) {
    this.getData();
  }

  fieldArray: Order[] = [];

  countries = ['India', 'USA'];
  states = [];
  cities = [];

  employe: employee;
  key: any;

  //One way to create the Form Elements
  myForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl('')
  });

  addFieldValue() {
    let order = new Order();
    order.selectedCategory = "Select Category";
    order.category = ['Men', 'Women'];
    this.fieldArray.push(order);
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  onChangeCountry(country: string) {
    if (country == 'India') {
      this.states = ['MP', 'UP'];
      this.cities = [];
    }
    else {
      this.states = ['Nevada', 'Texas'];
      this.cities = [];
    }
  }

  onChangeState(state: string) {

    if (state == "MP") { this.cities = ['Bhopal', 'Indore']; }

    else if (state == 'UP') { this.cities = ['Noida', 'Ghaziabad'] }

    else if (state == 'Nevada') { this.cities = ['LA', 'CA'] }

    else if (state == 'Texas') { this.cities = ['Austin'] }

  }

  onChangeCategory(gender: string, field: Order) {
    let productList = this.categoryMap[gender];
    field.products = [];
    field.price = null;
    productList.forEach(product => {
      field.products.push(Object.keys(product)[0]);
    });

    field.selectedCategory = gender;
    field.selectedProduct = "Select Product"
  }

  onChangeProduct(gender: string, productType: string, field: Order) {
    field.selectedProduct = productType;
    let productList = this.categoryMap[gender];
    productList.forEach(product => {
      if (Object.keys(product)[0] === productType)
        field.selectedPrice = product[productType];
      field.selectedQuantity = 1;
    });
  }

  onChangeQuantity(quantity: number, field: Order) {
    field.selectedQuantity = quantity;
    field.selectedPrice = field.selectedPrice * quantity;
  }

  getData() {
    this.key = JSON.parse(localStorage.getItem('key'));
    this.employe = JSON.parse(localStorage.getItem('value'));
    let orders = this.employe.order;

    let Orders = [];
    orders.forEach(order => {
      let orders = new Order();
      orders.selectedCategory = order.category;
      orders.selectedPrice = order.price;
      orders.selectedProduct = order.product;
      orders.selectedQuantity = order.quantity;
      orders.category = ['Men', 'Women'];
      Orders.push(orders);
    });
    this.fieldArray = Orders;
  }

  onSubmit() {

    //set total price to zero to calculate the new price.
    this.employe.totalPrice = 0;

    //Remove all older orders
    while (this.employe.order.length) {
      this.employe.order.pop();
    }

    //Add all orders to the employee object which has to be updated
    this.fieldArray.forEach(order => {
      let tempOrder = new Orders();
      tempOrder.product = order.selectedProduct;
      tempOrder.category = order.selectedCategory;
      tempOrder.quantity = order.selectedQuantity;
      tempOrder.price = order.selectedPrice;
      this.employe.order.push(tempOrder);

      //calculate total price
      this.employe.totalPrice = this.employe.totalPrice + tempOrder.price;
    });

    //To check the address filed are changed or not if changed then assign new value.
    if (this.myForm.controls.country.pristine == false) {
      this.employe.address.country = this.myForm.controls.country.value
    }
    if (this.myForm.controls.state.pristine == false) {
      this.employe.address.state = this.myForm.controls.state.value
    }
    if (this.myForm.controls.city.pristine == false) {
      this.employe.address.city = this.myForm.controls.city.value
    }

    this.empService.updateCustomer(this.key, this.employe);
    this.empService.successDataSave();
    this.myForm.reset();
    this.fieldArray = [];
  }

  
}
