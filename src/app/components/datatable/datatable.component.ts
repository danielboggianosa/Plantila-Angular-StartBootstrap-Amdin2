import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-data-table',
  templateUrl: './datatable.component.html',
  styles: []
})
export class DataTableComponent implements OnInit, OnDestroy {
  subs = new SubSink
  dataSource:DataSource<any>;

  // ARMADO DINÁMICO DE LA TABLA
  // title: corresponde al título que tendrá cada columna
  // key: es el identificador de la tabla que contiene el valor (propiedad)
  tableColumns=[
    {id:'2', key:'id', title:'ID'},
    {id:'1', key:'userId', title:'USER'},
    {id:'3', key:'title', title:'TITLE'},
    {id:'4', key:'body', title:'BODY'},
    {id:'5', key:'options', title:'OPTIONS'},
  ];
  displayedColumns = this.tableColumns.map(c => c.id);

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    // OBTENEMOS LA DATA DE ALGÚN SERVICIO Y LA ASIGANAMOS AL DATASOURCE
    this.loadData()
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(){
    this.subs.sink = this.dataService.getDummyData().subscribe(
      (res:any)=>{
        this.dataSource=res
      }  
    )
  }

}