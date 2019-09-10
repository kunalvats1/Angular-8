import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Login } from '../login/model.login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  notEqual: boolean;

  loginForm = new FormGroup({
    confirmPass: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")]),
    email: new FormControl('', [Validators.email, Validators.required])
  });

  constructor(private empService: StudentService) { }

  checkPassword() {
    if (this.loginForm.controls.pass.value !== this.loginForm.controls.confirmPass.value) {
      this.notEqual = true;
    }
  }

  signIn() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.pass.value;
    this.loginForm.reset();
    this.empService.login(email, password);
  }

  signUp() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.pass.value;
    this.loginForm.reset();
    this.empService.register(email, password);
  }

  onSubmit() {

  }
}
