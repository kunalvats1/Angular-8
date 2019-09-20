import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Ad } from '../ad-model';

declare var google;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  countries = [];
  imagePath: any;
  selectedFile: FileList;
  imgUrl1: any;
  imgUrl2: any;
  imgUrl3: any;
  currentLocation: boolean = true;
  lat: any;
  lng: any;
  address: any;
  image1 = null;
  ad = new Ad();

  constructor(private service: StudentService, public dialog: MatDialog, private location: Location) { }

  ngOnInit() {
    this.service.getCountries().subscribe(result => {
      this.countries = result;
    });

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        console.log("Latitude : " + this.lat + ', Longitude : ' + this.lng);
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(this.lat, this.lng);
        let request = {
          latLng: latlng
        };

        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              // this.address = results[0].formatted_address;
              // console.log(this.address);
            } else {
              alert("No address available");
            }
          }
        });
      },
        error => {
          console.log("Error code: " + error.code + " Error message: " + error.message);
        }
      );
    }
  }

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.minLength(25)]),
    price: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  detectFile1(event, files: any) {
    this.image1 = event.value;
    this.selectedFile = event.target.files;

    if (files.length === 0) { return; }

    const reader = new FileReader();

    this.imagePath = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgUrl1 = reader.result;
    };
  }
  detectFile2(event, files: any) {
    this.selectedFile = event.target.files;
    console.log(event)

    if (files.length === 0) { return; }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (event) => {
      this.imgUrl2 = reader.result;
    };
  }
  detectFile3(event, files: any) {
    this.selectedFile = event.target.files;

    if (files.length === 0) { return; }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgUrl3 = reader.result;
    };
  }

  manlocation() {
    this.currentLocation = false;
  }
  curlocation() {
    this.currentLocation = true;
  }

  displayCssFor(field: string | Array<string>) {
    return (this.addForm.get(field).invalid && (this.addForm.get(field).touched || this.addForm.get(field).dirty)) ? 'error' : 'k';
  }

  displayCssIcon(field: string) {
    return (this.addForm.get(field).invalid && (this.addForm.get(field).touched || this.addForm.get(field).dirty)) ? 'error_i' : 'k';
  }

  isNumberKey(event) {
    console.log("Kunal");
    let ph = this.addForm.controls.Phone.value;
    console.log(ph);

    console.log("length" + ph.length);
  }

  validate(event) {

    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
      console.log("ron");
    }
  }

  // Price validation
  priceFun() {
    let price = this.addForm.controls.price.value.toString();
    let Price = '';
    let length = price.length;
    if (!price.includes('.')) {
      Price = price + ".00";
    }
    else {
      let dotindex = price.indexOf('.');
      if (length >= dotindex + 2) {
        for (let i = 0; i <= dotindex + 2; i++) {
          Price = Price + price[i];
        }
      }
      else if (length === dotindex + 1) {
        for (let i = 0; i <= dotindex + 1; i++) {
          Price = Price + price[i];
        }
        Price = Price + '0';
      }
      else if (length === dotindex) {
        for (let i = 0; i < dotindex + 1; i++) {
          Price = Price + price[i];
        }
        Price = Price + '00';
      }
    }

    this.addForm.controls['price'].setValue(Price);
  }

  warning() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location.back();
      }
    });
  }

  onSubmit() {
    this.ad.title = this.addForm.controls.title.value;
    this.ad.description = this.addForm.controls.description.value;
    this.ad.phone = this.addForm.controls.phone.value;
    this.ad.price = this.addForm.controls.price.value;
    this.ad.address = {
      country: this.addForm.controls.country.value,
      state: this.addForm.controls.state.value,
      city: this.addForm.controls.city.value,
    }
    this.ad.image = this.selectedFile.item(0);
    this.service.postAd(this.ad);
    this.imagePath = '';
    this.imgUrl1 = '';
    this.imgUrl2 = '';
    this.imgUrl3 = '';
    this.addForm.reset();
    this.ad = new Ad();
  }

  getMyStyles() {

    let myStyles = {
      'background-image': !this.image1 ?
        'url(\'C:/Users/kunal.sharma1/Desktop/picture.jpg\')' : 'url(\'https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg\')'
    };
    return myStyles;
  }
}
