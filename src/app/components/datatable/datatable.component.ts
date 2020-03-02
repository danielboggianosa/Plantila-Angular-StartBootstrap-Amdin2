import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
    {id:'1', key:'id', title:'ID'},
    {id:'2', key:'nombre', title:'NOMBRE'},
    {id:'3', key:'apellido', title:'APELLIDO'},
    {id:'4', key:'correo', title:'CORREO'},
    {id:'5', key:'createdAt', title:'CREADO'},
    {id:'6', key:'options', title:'OPTIONS'},
  ];
  displayedColumns = this.tableColumns.map(c => c.id);
  pageSize:number=10;
  totalRows: number;
  filterValue:any;
  field:string = 'id';
  order:string = 'asc';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    // OBTENEMOS LA DATA DE ALGÚN SERVICIO Y LA ASIGANAMOS AL DATASOURCE
    this.loadData()
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(page=null, field=null, order=null){
    let body={
      page:(page) ? +page : 0,
      size: +this.pageSize,
      field: (field) ? field : this.field,
      order: (order) ? order : this.order
    }
    this.subs.sink = this.userService.getUsers(body).subscribe(
      res=>{
        this.totalRows = (res['total']);
        this.dataSource = new MatTableDataSource(res['data']);
      }
    )
  }

  loadSize(e){
    this.pageSize = e;
    this.loadData();
  }

  applyFilter() {
    let body = {
      value: this.filterValue.trim().toLowerCase(),
      page: 0,
      size: +this.pageSize,
    }
    this.subs.sink = this.userService.getFiltered(body).subscribe(
      res=>{
        this.totalRows = (res['total']);
        this.dataSource = new MatTableDataSource(res['data']);
      }
    );
  }

  delete(id){
    let del = confirm("¿Do you really want to delete this entry?")
    if(del){
      this.subs.sink = this.userService.deleteUser(id).subscribe(
        res=>{
          alert(res['message']);
          this.loadData();
        }
      )
    }
  }

  edit(id){
    
  }

  sortData(e){
    if(e.active != 6){
      this.field = this.tableColumns.filter(c=>c.id==e.active)[0].key
      this.order = e.direction;
      this.loadData(0, this.field, this.order)
    }
  }



}