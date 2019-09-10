import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { employee } from '../employee';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  public emp: employee[];
  keys = [];
  imagePath: any;
  imgUrl: any;
  selectedFile: FileList;

  myForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)

  });

  ngOnInit() { }
  constructor(private empService: StudentService) { }

  countries = ['India', 'USA'];
  states = [];
  cities = [];

  employe: employee = new employee();

  onChangeCountry(country: string) {
    if (country === 'India') {
      this.states = ['MP', 'UP'];
      this.cities = [];
    } else {
      this.states = ['Nevada', 'Texas'];
      this.cities = [];
    }
  }

  onChangeState(state: string) {

    if (state === 'MP') {
      this.cities = ['Bhopal', 'Indore'];
    } else if (state === 'UP') {
      this.cities = ['Noida', 'Ghaziabad'];
    } else if (state === 'Nevada') {
      this.cities = ['LA', 'CA'];
    } else { this.cities = ['Austin']; }

  }

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

  save() {
    this.employe.location = {
      latitude: '123.1233',
      longitude: '131.13'
    };

    this.employe.order = [{
      product: 'NA',
      price: 0,
      quantity: 0,
      category: 'NA'
    }];

    this.employe.firstName = this.myForm.controls.firstName.value;
    this.employe.lastName = this.myForm.controls.lastName.value;
    this.employe.totalPrice = 0;
    this.employe.address = {
      country: this.myForm.controls.country.value,
      city: this.myForm.controls.city.value,
      state: this.myForm.controls.state.value
    };
    this.employe.email = this.myForm.controls.email.value;

    // for uploading the image in firebase
    let file = this.selectedFile.item(0);
    this.employe.image = file;

    // checking the same key exists or not
    this.empService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.emp = customers;
    });

    for (let i = 0; i < this.emp.length; i++) {
      this.keys.push(this.emp[i].key);
    }
    let key = this.employe.email.replace(/\./g, '');
    if (!this.keys.includes(key)) {
      this.empService.createCustomer(key, this.employe);
      console.log(this.keys);
    } else {
      this.empService.errorDataSave();
    }
  }

  onSubmit() {
    this.save();
    this.myForm.reset();
    this.imgUrl = '';
    this.employe = new employee();
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
