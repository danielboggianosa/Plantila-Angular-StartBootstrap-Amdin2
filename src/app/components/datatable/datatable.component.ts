import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './datatable.component.html',
  styles: []
})
export class DataTableComponent implements OnInit, OnDestroy {
  subs = new SubSink
  dataSource;

  // ARMADO DINÁMICO DE LA TABLA
  // title: corresponde al título que tendrá cada columna
  // key: es el identificador de la tabla que contiene el valor (propiedad)
  tableColumns=[
    {id:'2', key:'id', title:'ID'},
    {id:'1', key:'nombre', title:'NOMBRE'},
    {id:'3', key:'apellido', title:'APELLIDO'},
    {id:'4', key:'correo', title:'CORREO'},
    {id:'5', key:'createdAt', title:'CREADO'},
    {id:'6', key:'options', title:'OPTIONS'},
  ];
  displayedColumns = this.tableColumns.map(c => c.id);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  pageSizeOptions=[10,20,50];
  pageSize:number=10;
  currentPage: number = 1;
  totalRows: number;
  pages: Array<number>=[];
  filterValue:any;
  lastPage: number;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    // OBTENEMOS LA DATA DE ALGÚN SERVICIO Y LA ASIGANAMOS AL DATASOURCE
    this.loadData()
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(page=null,size=null){
    page=(page) ? page*1 : 0;
    size=(size) ? size*1 : this.pageSize;
    this.subs.sink = this.userService.getUsers(page, size).subscribe(
      res=>{
        this.totalRows = (res['total']);
        this.fillPages();
        this.dataSource = new MatTableDataSource(res['data']);
        this.dataSource.sort = this.sort;
        // console.log(res);
      }
    )
  }

  applyFilter() {
    let body = {
      value: this.filterValue.trim().toLowerCase(),
      page: 0,
      size: this.pageSize,
    }
    this.subs.sink = this.userService.getFiltered(body).subscribe(
      res=>{
        this.totalRows = (res['total']);
        this.fillPages();
        this.dataSource = new MatTableDataSource(res['data']);
        this.dataSource.sort = this.sort;
      }
    );
  }

  delete(id){
    this.subs.sink = this.userService.deleteUser(id).subscribe(
      res=>{
        alert(res['message']);
        this.loadData();
      }
    )
  }

  edit(id){
    
  }

  //paginacion
  pagination(p){
    this.currentPage = p;
    let i = (this.currentPage * this.pageSize) - this.pageSize;
    let f = (this.currentPage * this.pageSize);
    this.loadData(i, f)
  }

  paginationPrev(){
    this.currentPage = (this.currentPage > 1) ? this.currentPage - 1 : this.currentPage;
    let i = (this.currentPage * this.pageSize) - this.pageSize;
    let f = (this.currentPage * this.pageSize);
    this.loadData(i, f)
  }

  paginationNext(){
    this.currentPage = (this.currentPage < this.lastPage) ? this.currentPage + 1 : this.lastPage;
    let i = (this.currentPage * this.pageSize) - this.pageSize;
    let f = (this.currentPage * this.pageSize);
    this.loadData(i, f)
  }

  fillPages(){
    this.pages=[];
    let b = this.totalRows/this.pageSize;
    for(let i=1; i<=b; i++){
      this.pages.push(i);
      this.lastPage = i;
    }
  }


}