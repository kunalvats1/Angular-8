import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  loginForm = new FormGroup({
    confirmPass: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required, Validators.pattern(this.strongRegex)]),
    email: new FormControl('', [Validators.email, Validators.required])
  });

  constructor(private empService: StudentService, public afAuth: AngularFireAuth) { }

  displayCssFor(field: string | Array<string>) {
    return (this.loginForm.get(field).invalid && (this.loginForm.get(field).touched || this.loginForm.get(field).dirty)) ? 'error' : '';
  }

  confirmPass(field: string) {
    if (this.loginForm.controls.pass.value !== this.loginForm.controls.confirmPass.value) {
      return (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) ? 'error' : '';
    }
  }

  signIn() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.pass.value;
    if (email === '' || password === '') {
      this.empService.error("Please fill all the fields");
    } else {
      this.loginForm.reset();
      this.empService.login(email, password);
    }
  }

  signUp() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.pass.value;
    if (email === '' || password === '') {
      this.empService.error("Please fill all the fields");
    } else {
      this.loginForm.reset();
      this.empService.register(email, password);
    }
  }
}
