import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: []
})
export class ChartsComponent implements OnInit {
  subs = new SubSink

  type;
  labels=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  data=[2000, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000];
  options;

  myAreaChart=[];
  myBarChart=[];
  myPieChart=[];

  pageSize: any;
  field: any;
  order: any;
  filterValue: any;
  attributes: any;
  totalRows: any;
  dataSource: any;


  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }


}
