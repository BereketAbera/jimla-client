import { Component, OnInit, ViewChild } from '@angular/core';
import { AggregatorService } from '@app/_services/aggregator.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ProducerService } from '@app/_services/identity/producer.service';
import { ProductService } from '@app/_services/product/product.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) private chartRef;
  products: any = [];
  count: any;
  report;
  lables: string[];
  chart;
  orderStat: any;
  orderValue: number[];
  constructor(
    private productService: ProductService,
    private aggregateService: AggregatorService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getDashboard();
    this.drawRevenuChart();
  }

  getDashboard() {
    this.aggregateService
      .getProducerDashboard(this.authenticationService.userValue.producerId)
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.report = data;
          this.orderStat = data.activeOrder.orderDate;
          this.drawRevenuChart();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getProducts() {
    this.productService
      .getMerchantTopProduct(this.authenticationService.userValue.producerId)
      .subscribe((res) => {
        console.log(res);

        this.products = res.rows;
        this.count = res.count;
      });
  }

  drawRevenuChart() {
    this.lables = this.orderStat.map((value) => {
      return value.year + '|' + value.month + '|' + value.day;
    });

    this.orderValue = this.orderStat.map((value) => {
      return +value.count;
    });

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.lables,
        datasets: [
          {
            label: 'Order',
            data: this.orderValue,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 255, 255)'],
            borderWidth: 0.5
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }
}
