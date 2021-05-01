import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CuentasService } from 'src/app/services/cuentas.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  title = 'Cuentas'
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
    {id:'2', key:'imagen',  title:'IMAGEN', visible:false},
    {id:'3', key:'nombre', title:'NOMBRE', visible:true},
    {id:'4', key:'banco', title:'BANCO', visible:true},
    {id:'5', key:'moneda', title:'MONEDA', visible:true},
    {id:'6', key:'codigo', title:'CÓDIGO', visible:true},
    {id:'7', key:'cci', title:'CCI', visible:true},
    {id:'8', key:'saldo', title:'SALDO', visible:true},
    {id:'9', key:'notas', title:'NOTAS', visible:false},
    {id:'10', key:'createdAt', title:'ACTUALIZADO',   visible:false},
    {id:'0', key:'options',   title:'OPCIONES',  visible:false, options:{delete:true,edit:true,select:false,unselect:false}},
  ]
  cuenta;
  search:string = ''
  cardType:string = 'cuentas'
  $empresa:{id:String;nombre:String;notas:String;imagen:String}

  constructor(private mainService:CuentasService, private ngbModal:NgbModal, private router:Router, private empresaService:EmpresasService) { }
  hide:boolean = false
  edit:boolean = false
  myForm = {
    nombre:null,
    banco:null,
    moneda:null,
    codigo:null,
    cci:null,
    imagen:null,
    notas:null,
    empresa_id:null,
  }
  myFormFields = [
    {id: 1, tag:'input', name:'nombre', type:'text', placeholder:'Nombre', required:true, disabled:false, options:[]},
    {id: 3, tag:'input', name:'banco', type:'text', placeholder:'Banco', required:false, disabled:false, options:[]},
    {id: 2, tag:'select', name:'moneda', type:'text', placeholder:'Moneda', required:true, disabled:false, options:[
      {id: 4, value:'PEN', text:'Soles'},
      {id: 5, value:'USD', text:'Dólares Americanos'},
      {id: 6, value:'EUR', text:'Euros'},
    ]},
    {id: 7, tag:'input', name:'codigo', type:'text', placeholder:'Número de cuenta', required:false, disabled:false, options:[]},
    {id: 8, tag:'input', name:'cci', type:'text', placeholder:'Código Interbancario', required:false, disabled:false, options:[]},
    {id: 9, tag:'input', name:'imagen', type:'text', placeholder:'URL de la imágen', required:false, disabled:false, options:[]},
    {id: 18, tag:'textarea', name:'notas', type:'text', placeholder:'Descripción', required:false, disabled:false, options:[]},
    {id: 9, tag:'input', class: 'd-none', name:'empresa_id', type:'text', placeholder:'', required:true, disabled:false, options:[]},
  ]
  formsTitle:string = 'Crear Nueva Cuenta'
  myEmpresa = {
    nombre:null,
    imagen:null,
    notas:null,
  }
  myEmpresaFields = [
    {id: 1, tag:'input', name:'nombre', type:'text', placeholder:'Nombre:', label:'Nombre', required:true, disabled:false, options:[]},
    {id: 2, tag:'input', name:'imagen', type:'text', placeholder:'URL de la imágen', label: 'Imagen:', required:false, disabled:false, options:[]},
    {id: 3, tag:'textarea', name:'notas', type:'text', placeholder:'Descripción', required:false, disabled:false, options:[]},
  ]
  editTitle="Editar Empresa"
  invitar:boolean=false
  myUsuario = {
    empresa_id: null,
    usuario_email: null
  }
  myUsuarioFields = [
    {id: 1, tag:'input', name:'usuario_email', type:'text', placeholder:'Correo del usuario', label:'Correo:', required:true, disabled:false, options:[]},
    {id: 1, tag:'input',class: 'd-none', name:'empresa_id', type:'text', placeholder:'Correo del usuario', label:'Correo:', required:true, disabled:false, options:[]},
  ]
  usuarioCardDescription = "Al invitar un usuario a tu empresa, este podrá ver y editar todos los registros que esta contenga."

  ngOnInit(): void {
    this.$empresa = window.history.state
    this.myForm.empresa_id = this.$empresa.id
    this.myUsuario.empresa_id = this.$empresa.id

    this.myEmpresa.imagen = this.$empresa.imagen
    this.myEmpresa.nombre = this.$empresa.nombre
    this.myEmpresa.notas = this.$empresa.notas

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
    this.cuenta[0].empresa_id = this.$empresa.id
    let state = {
      id: this.cuenta[0].id,
      nombre: this.cuenta[0].nombre,
      banco: this.cuenta[0].banco,
      notas: this.cuenta[0].notas,
    }
    this.router.navigate(['/dashboard/registros', e], {state: this.cuenta[0]})
  }

  editar(){
    this.myEmpresa = this.$empresa
    this.edit = !this.edit
  }

  create(e){
    this.subs.sink = this.mainService.crear(e).subscribe(res => {
      if(res["success"]){
        this.hide=false
        this.loadData(e)
      }
    })
  }

  updateEmpresa(e){
    const body={
      nombre: e.nombre,
      notas: e.notas,
      imagen: e.imagen
    }
    this.subs.sink = this.empresaService.actualizar(e.id, e).subscribe(res => {
      if(res['success']){
        this.edit = !this.edit
        this.$empresa = res['data'][0]
      }
      else alert(res['message'])
    })
  }

  deleteEmpresa(){
    if(confirm("Está seguro de borrar esta empresa y todo lo asociado a esta"))
      this.subs.sink = this.empresaService.borrar(this.$empresa.id).subscribe( res => {
        if(res['success'])
          this.router.navigate(['/dashboard/empresas'])
        else alert(res['message'])
      })
  }

  invitarUsuario(e){
    this.subs.sink = this.empresaService.addUser(e).subscribe(res => {
      if(res["success"])
        this.invitar=false
      else alert(res['message'])
    })
  }

}
