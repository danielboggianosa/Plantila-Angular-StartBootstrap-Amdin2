import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../../services/empresas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {
  title = 'Empresas'
  @ViewChild('editar',{static:false}) editar;
  subs = new SubSink
  pageSize: number = 10;
  field:string = 'id';
  order:string = 'asc';
  cardTitle:string = 'Lista de Empresas';
  filterValue: string = '';
  attributes: any;
  csvData: any;
  totalRows: number;
  dataSource: any;
  cardType: string = 'empresa';
  tableColumns = [
    {id:'1', key:'id', title:'ID', visible:true},
    {id:'2', key:'image_url',  title:'IMAGEN', visible:true},
    {id:'3', key:'nombre', title:'NOMBRE',   visible:true},
    {id:'4', key:'notas', title:'NOTAS',   visible:true},
    {id:'5', key:'createdAt', title:'ACTUALIZADO',   visible:false},
    {id:'0', key:'options',   title:'OPCIONES',  visible:true, options:{delete:true,edit:true,select:false,unselect:false}},
  ]
  empresa;
  page: number = 1;
  search: string = '';
  constructor(private empresaService:EmpresasService, private ngbModal:NgbModal, private router:Router) { }
  hide:boolean=false

  myForm = {
    nombre:null,
    notas:null,
    imagen:null,
  }
  myFormFields = [
    {id: 1, tag:'input', name:'nombre', type:'text', placeholder:'Nombre', required:true, disabled:false, options:[]},
    {id: 2, tag:'input', name:'imagen', type:'text', placeholder:'URL de la imágen', required:false, disabled:false, options:[]},
    {id: 18, tag:'textarea', name:'notas', type:'text', placeholder:'Descripción', required:false, disabled:false, options:[]},
  ]
  formsTitle:string = 'Crear Nueva Empresa'

  ngOnInit(): void {
    this.loadData({page:0,size:this.pageSize,field:this.field,order:this.order,value:this.filterValue,attributes:this.attributes, search:this.search});
  }

  loadData(e:{page,size,field,order,value,attributes,search}){
    this.setValues(e)
    const {page,size,value,attributes,field,search,order} = e
    let body={
      page: (page) ? page : this.page,
      size: (size) ? +size : +this.pageSize,
      field: (field) ? field : this.field,
      search: (search) ? search : this.search,
      order: (order) ? order : this.order,
      value: (value) ? value : this.filterValue,
      attributes: (attributes) ? attributes : this.attributes
    }
    this.subs.sink = this.empresaService.listar(body).subscribe(
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
    const {page,size,value,search,attributes,field,order} = e
    this.field = (field) ? field : this.field
    this.search = (search) ? search : this.search
    this.filterValue = (value) ? value : this.filterValue
    this.pageSize = (size) ? size : this.pageSize
    this.attributes = (attributes) ? attributes : this.attributes
    this.order = (order) ? order : this.order
    this.page = (page) ? page : this.page
  }

  delete(e){
    this.subs.sink = this.empresaService.borrar(e).subscribe(res=>{
      alert(res['message']);
      this.loadData({page:null,size:null,field:null,order:null,value:null,attributes:null,search:null});
    })
  }

  update(e){
    this.empresa = this.dataSource.data.filter(d=>d.id == e)[0];
    this.ngbModal.open(this.editar)
    console.log(e)
  }

  actualizar(e){
    delete e.updatedAt;
    delete e.deletedAt;
    delete e.createdAt;
    this.subs.sink = this.empresaService.actualizar(e.id, e).subscribe(res=>{
      if(res['success'])
        alert(res['message'])
    })
  }

  select(e){
    console.log(e)
    this.empresa = this.dataSource.filter( data => data.id == e)
    this.router.navigate(['/dashboard/cuentas', e], {state: this.empresa[0]})
  }

  create(e){
    console.log(e)
    this.subs.sink = this.empresaService.crear(e).subscribe(res => {
      if(res['success'])
        this.hide=!this.hide
      else
        alert(res['message'])
    })
  }

}
