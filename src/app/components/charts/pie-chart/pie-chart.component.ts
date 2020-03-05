import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styles: []
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() labels=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  @Input() data=[0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000];
  myPieChart=[];
  bgColors=[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.fillColors()
    this.myPieChart = new Chart('myPieChart', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.bgColors,
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });
  }

  fillColors(){
    let color;
    this.data.forEach(
      ()=>{
        color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
        this.bgColors.push(color);
      }
    )
  }

}
