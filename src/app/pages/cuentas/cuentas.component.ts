import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { CuentasService } from 'src/app/services/cuentas.service';
import { SubSink } from 'subsink';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  title = 'Cuentas'
  @ViewChild('editar',{static:false}) editar;
  subs = new SubSink
  pageSize: number = 10;
  field:string = 'id';
  order:string = 'asc';
  cardTitle:string = 'Cuentas';
  filterValue: string = '';
  attributes: any;
  csvData: any;
  totalRows: number;
  dataSource: any;
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
  search:string = ''
  cardType:string = 'cuentas'
  $empresa:{id:String;nombre:String;notas:String;image_url:String}

  constructor(private mainService:CuentasService, private ngbModal:NgbModal, private router:Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.$empresa = window.history.state
    if(!this.$empresa.id)
      this.router.navigate(['/dashboard/empresas'])
    else
      this.loadData({
        page:0,size:this.pageSize,
        field:this.field,
        order:this.order,
        value:this.filterValue,
        attributes:this.attributes,
        empresaId: this.$empresa.id,
        search: this.search
      });
  }

  loadData(e:{page,size,field,order,value,attributes,empresaId,search}){
    this.setValues(e)
    const {page,size,value,attributes,field,order,empresaId,search} = e
    let query={
      page: (page) ? +page : 1,
      size: (size) ? +size : +this.pageSize,
      field: (field) ? field : this.field,
      search: (search) ? search : this.search,
      order: (order) ? order : this.order,
      value: (value) ? value : this.filterValue,
      attributes: (attributes) ? attributes : this.attributes,
      empresaId: (empresaId) ? empresaId : this.$empresa.id
    }
    this.subs.sink = this.mainService.listar(query).subscribe(
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
    const {size,value,attributes,field,order,search} = e
    this.field = (field) ? field : this.field
    this.search = (search) ? search : this.search
    this.filterValue = (value) ? value : this.filterValue
    this.pageSize = (size) ? size : this.pageSize
    this.attributes = (attributes) ? attributes : this.attributes
    this.order = (order) ? order : this.order
  }

  delete(e){
    this.subs.sink = this.mainService.borrar(e).subscribe(res=>{
      alert(res['message']);
      this.loadData({page:null,size:null,field:null,order:null,value:null,attributes:null,empresaId:null,search:null});
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
    this.cuenta = this.dataSource.filter( data => data.id == e)
    this.router.navigate(['/dashboard/registros', e], {state: this.cuenta[0]})
  }

}
