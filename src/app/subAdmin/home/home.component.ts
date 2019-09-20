import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DialogContentComponent} from './../dialog-content/dialog-content.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

ngOnInit() {
}

}
