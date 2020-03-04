import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: []
})
export class ChartsComponent implements OnInit {
  labels=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  data=[0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000];


  constructor() { }

  ngOnInit(): void {


  }

}
