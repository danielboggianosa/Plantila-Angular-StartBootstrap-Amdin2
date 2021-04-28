import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { RegistrosService } from 'src/app/services/registros.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  title = 'Cuentas'
  @ViewChild('editar',{static:false}) editar;
  subs = new SubSink
  pageSize: number = 10;
  field:string = 'id';
  order:string = 'asc';
  cardTitle:string = 'Registros';
  filterValue: string = '';
  attributes: any;
  csvData: any;
  totalRows: number;
  dataSource: any;
  cardType:string = 'registros'
  tableColumns = [
    {id:'1', key:'id', title:'ID', visible:true},
    {id:'2', key:'imagen_url',  title:'IMAGEN', visible:true},
    {id:'3', key:'nombre', title:'NOMBRE', visible:true},
    {id:'4', key:'banco', title:'BANCO', visible:true},
    {id:'5', key:'moneda', title:'MONEDA', visible:true},
    {id:'6', key:'codigo', title:'CÓDIGO', visible:true},
    {id:'7', key:'cci', title:'CCI', visible:true},
    {id:'8', key:'saldo', title:'SALDO', visible:true},
    {id:'9', key:'notas', title:'NOTAS', visible:false},
    {id:'10', key:'createdAt', title:'ACTUALIZADO',   visible:false},
    {id:'0', key:'options',   title:'OPCIONES',  visible:true, options:{delete:true,edit:true,select:false,unselect:false}},
  ]
  cuenta;
  $cuenta:{id:String;nombre:String;notas:String;imagen_url:String}

  constructor(private router:Router, private mainService:RegistrosService, private ngbModal:NgbModal) { }

  ngOnInit(): void {
    this.$cuenta = window.history.state
    if(!this.$cuenta.id)
      this.router.navigate(['/dashboard/empresas'])
      else
      this.loadData({
        page:0,size:this.pageSize,
        field:this.field,
        order:this.order,
        value:this.filterValue,
        attributes:this.attributes,
        cuentaId: this.$cuenta.id
      });
  }

  async loadData(e:{page,size,field,order,value,attributes,cuentaId}){
    this.setValues(e)
    const {page,size,value,attributes,field,order,cuentaId} = e
    let query={
      page: (page) ? +page : 1,
      size: (size) ? +size : +this.pageSize,
      field: (field) ? field : this.field,
      order: (order) ? order : this.order,
      value: (value) ? value : this.filterValue,
      attributes: (attributes) ? attributes : this.attributes,
      cuentaId: (cuentaId) ? cuentaId : this.$cuenta.id
    }
    this.subs.sink = await this.mainService.listar(query).subscribe(
      res=>{
        this.csvData = res['data'];
        this.totalRows = (res['pagina']['total_filas']);
        this.dataSource = res['data'];
        this.dataSource.forEach(d => {
          d.createdAt = (d.createdAt) ? moment(d.createdAt).fromNow() : '';
          d.updatedAt = (d.updatedAt) ? moment(d.updatedAt).fromNow() : '';
          d.deletedAt = (d.deletedAt) ? moment(d.deletedAt).fromNow() : '';
        });
      }
    )
  }

  setValues(e){
    const {size,value,attributes,field,order} = e
    this.field = (field) ? field : this.field
    this.filterValue = (value) ? value : this.filterValue
    this.pageSize = (size) ? size : this.pageSize
    this.attributes = (attributes) ? attributes : this.attributes
    this.order = (order) ? order : this.order
  }

  delete(e){
    this.subs.sink = this.mainService.borrar(e).subscribe(res=>{
      alert(res['message']);
      this.loadData({page:null,size:null,field:null,order:null,value:null,attributes:null,cuentaId:null});
    })
  }

  update(e){
    this.cuenta = this.dataSource.data.filter(d=>d.id == e)[0];
    this.ngbModal.open(this.editar)
    console.log(e)
  }

  actualizar(e){
    delete e.updatedAt;
    delete e.deletedAt;
    delete e.createdAt;
    this.subs.sink = this.mainService.actualizar(e.id, e).subscribe(res=>{
      if(res['success'])
        alert(res['message'])
    })
  }

  select(e){
    this.cuenta = this.dataSource.data.filter( data => data.id == e)
    this.router.navigate(['/dashboard/registros/' + this.$cuenta.id, e], {state: this.cuenta[0]})
  }

}
