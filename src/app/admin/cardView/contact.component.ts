import { Component } from '@angular/core';
import { StudentService } from '../../student.service';
import { map } from 'rxjs/operators';
import { employee } from '../../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  employees: employee[];
  name: string;
  address: string;
  defaultImage = 'https://www.placecage.com/1000/1000';
  showSpinner: boolean = true;

  ngOnInit() {
    this.getEmployees();
  }
  constructor(private empService: StudentService, private router: Router) { }

  getEmployees() {
    this.empService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.showSpinner = false;
      this.employees = customers;
    });
  }

  saveEmp(key: string, emp: employee) {
    localStorage.setItem('key', JSON.stringify(key));
    localStorage.setItem('value', JSON.stringify(emp));
  }

}