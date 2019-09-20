import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../student.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { employee } from '../../employee';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})

export class ListviewComponent implements OnInit {

  public search: string;
  address: string;
  name: string;
  showSpinner: boolean = true;
  dataSource: MatTableDataSource<any>;

  constructor(public empService: StudentService, private router: Router) {
    this.getEmployee();
  }

  displayedColumns: string[] = ['image', 'firstName', 'email', 'address', 'totalPrice', 'action'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployee() {
    this.empService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.showSpinner = false;
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCustomer(emp: employee) {
    this.empService
      .deleteCustomer(emp.key)
      .catch(err => console.log(err));
  }

  updateCustomer(key: any, emp: employee) {
    localStorage.setItem('key', JSON.stringify(key));
    localStorage.setItem('value', JSON.stringify(emp));
  }

}