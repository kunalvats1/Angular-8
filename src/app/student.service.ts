import { Injectable } from '@angular/core';
import { employee } from './employee';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { Products } from './admin/add-Product/product.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country.model';
import { Ad } from './subAdmin/ad-model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  uploadTask: firebase.storage.UploadTask;

  user: User;
  product: Products;
  ad: Ad;

  dbPath = '/employes';
  dbProductPath = '/product';
  dbAdPath = '/postAd';

  customersRef: AngularFireList<employee> = null;
  productRef: AngularFireList<Products> = null;
  postAdRef: AngularFireList<Ad> = null;

  basePath: string = '/upload';
  customerPath: string = '/customerUploads';
  postAdPath: string = '/ad_images';

  constructor(private http: HttpClient, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router, private toastr: ToastrService) {
    this.customersRef = db.list(this.dbPath);
    this.productRef = db.list(this.dbProductPath);
    this.postAdRef = db.list(this.dbAdPath);

    // Login method
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  // Login 
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((data) => {
      this.success("Successfully Login")
      this.router.navigate(['/subadmin']);
    }).catch((err) => {
      this.error("Wrong Email/password");
    });
  }

  register(email: string, password: string) {
    //   this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((data) => {
    //     this.success("Successfully SignUp")
    //     this.router.navigate(['/login']);
    //   }).catch((err) => {
    //     this.error("You are already signup");
    //   });
    // this.sendEmailVerification();

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.success("Successfully SignUp");
      this.router.navigate(['/login']);
      user.user.sendEmailVerification();
      firebase.auth().currentUser.sendEmailVerification();
    }).catch((err) => {
      this.error("Already SignUp Please Login");
    })
  }

  // async sendEmailVerification() {
  //   await this.afAuth.auth.currentUser.sendEmailVerification()
  //   this.successToastr();
  // }

  // async sendPasswordResetEmail(passwordResetEmail: string) {
  //   return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  // }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  // For facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!')
        this.router.navigate(['/analytics']);
      }).catch((error) => {
        console.log(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }


  // CRUD Methods
  createCustomer(key: any, customer: any): void {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.customerPath}/${customer.image.name}`).put(customer.image);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          customer.url = downloadUrl;
          this.customersRef.set(key, customer);
          this.successDataSave();
        });
      }
    );
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }

  getCustomersList(): AngularFireList<employee> {
    return this.customersRef;
  }

  // Toaster function to sucess and fail notification
  public successToastr() {
    this.toastr.success('Api hit successfully');
  }

  public successDataSave() {
    this.toastr.success('Data saved succesfully');
  }

  public success(mess: string) {
    this.toastr.success(mess);
  }

  public error(mess: string) {
    this.toastr.error(mess);
  }

  public errorDataSave() {
    this.toastr.error('Please enter valid Email');
  }

  public errorToastr() {
    this.toastr.error('Api is not hit');
  }

  // Crud for Product.
  createProduct(upload: Products): void {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.image.name}`).put(upload.image);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          upload.url = downloadUrl;
          this.productRef.push(upload);
        });
      }
    );
  }

  getProductsList(): AngularFireList<Products> {
    return this.productRef;
  }

  postAd(upload: Ad): void {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.postAdPath}/${upload.image.name}`).put(upload.image);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          upload.url = downloadUrl;
          this.postAdRef.push(upload);
          this.success("Data saved Sucessfully");
        });
      }
    );

  }

  // get countries from json
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('../assets/countries.json');
  }
}