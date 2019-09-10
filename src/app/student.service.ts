import { Injectable } from '@angular/core';
import { employee } from './employee';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { Products } from './Product/add-Product/product.model';
import { Login } from './login/model.login';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  user: User;
  product: Products;
  dbPath = '/employes';
  dbProductPath = '/product';
  uploadTask: firebase.storage.UploadTask;

  customersRef: AngularFireList<employee> = null;
  productRef: AngularFireList<Products> = null;
  loginRef: AngularFireList<Login> = null;
  basePath: string = '/upload';
  customerPath: string = '/customerUploads';

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router, private toastr: ToastrService) {
    this.customersRef = db.list(this.dbPath);
    this.productRef = db.list(this.dbProductPath);

    // Login method
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
      console.log(this.user);
    })
  }

  // Login 
  async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.successToastr();
    this.router.navigate(['/analytics']);

  }

  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.successToastr();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
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
}