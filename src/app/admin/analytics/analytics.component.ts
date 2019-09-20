import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { StudentService } from '../../student.service';
import { map } from 'rxjs/operators';
import { employee } from '../../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  showSpinner: boolean = true;
  employees: employee[];
  price: Array<number>;
  premiumCustomer = 0;
  regularCustomer = 0;
  newCustomer = 0;

  constructor(private service: StudentService, private router: Router) { }

  ngOnInit() {

    this.service.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.showSpinner = false;
      this.employees = customers;

      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].totalPrice > 0 && this.employees[i].totalPrice <= 500) {
          ++this.regularCustomer;
        } else if (this.employees[i].totalPrice > 600) {
          ++this.premiumCustomer;
        } else {
          ++this.newCustomer;
        }
      }

      // Simple chart
      let chart = new CanvasJS.Chart("pieChartContainer", {
        animationEnabled: true,
        exportEnabled: false,
        title: {
          text: "Sales Chart"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: 71, label: "Jan" },
            { y: 55, label: "Feb" },
            { y: 50, label: "Mar" },
            { y: 65, label: "Apr" },
            { y: 95, label: "May" },
            { y: 68, label: "Jun" },
            { y: 28, label: "Jul" },
            { y: 34, label: "Aug" },
            { y: 78, label: "Sept" },
            { y: 45, label: "Oct" },
            { y: 23, label: "Nov" },
            { y: 12, label: "Dec" }
          ]
        }]
      });
      chart.render();

      // Pie chart
      let pieChart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: false,
        title: {
          text: "Revenue Chart"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<strong>{name}</strong>:  (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: this.newCustomer, name: "New Customer" },
            { y: this.regularCustomer, name: "Regular Customer" },
            { y: this.premiumCustomer, name: "Premium Customer" }
          ]
        }]
      });

      pieChart.render();

    });
  }
}
