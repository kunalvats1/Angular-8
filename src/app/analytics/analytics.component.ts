import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import { StudentService } from '../student.service';
import { map } from 'rxjs/operators';
import { employee } from '../employee';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  showSpinner: boolean = true;
  employees: employee[];
  price: Array<number>;

  constructor(private service: StudentService) {

    // this.service.getCustomersList().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(customers => {
    //   this.showSpinner = false;
    //   this.employees = customers;
    //   pieChart.render();
    //   chart.render();

    //   for (let i = 0; i < this.employees.length; i++) {

    //   }
    // });

    // Simple Chart

  }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Revenue Chart"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 50, name: "Jan" },
          { y: 65, name: "Feb" },
          { y: 95, name: "Mar" },
          { y: 68, name: "Shorts" },
          { y: 28, name: "Capri" },
          { y: 34, name: "Jacket" },
          { y: 14, name: "Pants" }
        ]
      }]
    });

    chart.render();

    // Pie chart
    let pieChart = new CanvasJS.Chart("pieChartContainer", {
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

    pieChart.render();

  }

  logOut() {
    this.service.logout();
  }

  appitems = [
    {
      label: 'Customer',
      icon: 'sentiment_satisfied_alt',
      items: [
        {
          label: 'Views',
          link: '/cardView',
          icon: 'remove_red_eye'
        },
        {
          label: 'Add Customer',
          icon: 'person_add',
          link: '/newCustomer'
        }
      ]
    },
    {
      label: 'Product',
      icon: 'label_important',
      items: [
        {
          label: 'Add Product',
          link: '/add-product',
          icon: 'add_circle_outline'
        },
        {
          label: 'View Product',
          link: '/product-view',
          icon: 'portrait'
        }
      ]
    },
  ];
}
