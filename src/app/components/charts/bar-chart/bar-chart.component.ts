import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: []
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() labels=[];
  @Input() data=[];
  myBarChart=[];
  bgColors=[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    
    this.myBarChart = new Chart('myBarChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: "Revenue",
          backgroundColor: "#4e73df",
          hoverBackgroundColor: "#aa59d9",
          borderColor: "#4e73df",
          data: this.data,
          maxBarThickness:25
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 6
            },
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 50000,
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value:number, index, values) {
                return '$' + value;
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': $' + tooltipItem.yLabel;
            }
          }
        },
      }
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
