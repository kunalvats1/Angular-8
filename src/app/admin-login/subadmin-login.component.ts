import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-subadmin-login',
  templateUrl: './subadmin-login.component.html',
  styleUrls: ['./subadmin-login.component.scss']
})
export class SubadminLoginComponent implements OnInit {

  mail = 'kunalvats1@gmail.com';
  pass = 'Kunal@123';

  constructor(private route: Router, private service: StudentService) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  submit() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    console.log(email, password);

    if (email.toLowerCase() === this.mail && password === this.pass) {
      this.service.success("Login Sucessfully");
      this.route.navigate(['/admin']);
    }
    else if (email == '' || password == '') {
      this.service.error("Please fill all the details");
    }
    else {
      this.service.error("Email/Password Wrong");
    }
  }
}