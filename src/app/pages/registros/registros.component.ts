import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CategoriasService } from 'src/app/services/categorias.service';
import { RegistrosService } from 'src/app/services/registros.service';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
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
  pageSize: number = 100;
  field:string = 'fecha';
  order:string = 'desc';
  cardTitle:string = 'Registros';
  filterValue: string = '';
  attributes: any;
  csvData: any;
  totalRows: number;
  dataSource: any;
  cardType:string = 'registros'
  tableColumns = [
    {id:'1', key:'id', title:'ID', visible:true},
    {id:'2', key:'fecha',  title:'FECHA', visible:false},
    {id:'3', key:'nombre', title:'NOMBRE', visible:true},
    {id:'4', key:'banco', title:'BANCO', visible:true},
    {id:'5', key:'moneda', title:'MONEDA', visible:true},
    {id:'6', key:'codigo', title:'CÓDIGO', visible:true},
    {id:'7', key:'cci', title:'CCI', visible:true},
    {id:'8', key:'saldo', title:'SALDO', visible:true},
    {id:'9', key:'notas', title:'NOTAS', visible:false},
    {id:'10', key:'fecha', title:'FECHA',   visible:true},
    {id:'0', key:'options',   title:'OPCIONES',  visible:false, options:{delete:true,edit:true,select:false,unselect:false}},
  ]
  cuenta;
  $cuenta:{id:String;nombre:String;notas:String;imagen:String,empresa_id:String}
  edit:boolean=false
  hide:boolean=false

  myForm = {
    fecha:null,
    ingreso:null,
    descripcion:null,
    entidad:null,
    operacion:null,
    monto:null,
    imagen:null,
    categoria_id:null,
    subcategoria_id:null,
    cuenta_id:null
  }
  myFormFields = [
    {id: 1, tag:'input', name:'fecha', type:'date', placeholder:'Fecha', label:"Fecha:", required:true, disabled:false, options:[]},
    {id: 2, tag:'input', name:'ingreso', type:'radio', label:'¿Es un ingreso?', placeholder:'Ingreso', required:true, disabled:false, options:[
      {id: 3, value: '1', text: 'Sí'},
      {id: 4, value: '0', text: 'No'}
    ]},
    {id: 5, tag:'input', name:'monto', type:'number', label: 'Monto', placeholder:'', required:true, disabled:false, options:[]},
    {id: 10, tag:'select', name:'categoria_id', type:'text', label: 'Categoría:', placeholder:'', required:true, disabled:false, options:[]},
    {id: 11, tag:'select', name:'subcategoria_id', type:'text', label: 'Subcategoría:', placeholder:'', required:false, disabled:false, options:[]},
    {id: 6, tag:'input', class: 'd-none', name:'cuenta_id', type:'text', placeholder:'', required:false, disabled:false, options:[]},
    {id: 7, tag:'textarea', name:'descripcion', type:'text', label:'Descripcion:', placeholder:'Detalles del gasto', required:false, disabled:false, options:[]},
    {id: 8, tag:'input', name:'entidad', type:'text', placeholder:'Entidad:', label: 'Entidad', required:false, disabled:false, options:[]},
    {id: 9, tag:'input', name:'operacion', type:'text', label: 'Operación:', placeholder:'Número de operación', required:false, disabled:false, options:[]},
  ]

  myCuenta = {
    nombre:null,
    banco:null,
    moneda:null,
    codigo:null,
    cci:null,
    imagen:null,
    notas:null,
    empresa_id:null,
  }
  myCuentaFields = [
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
  categoriasShow: boolean = false;
  subcategoriasShow: boolean = false;

  myCategoria = {
    nombre:null,
    empresa_id:null
  }

  myCategoriaFields = [
    {id: 1, tag:'input', name:'nombre', type:'text', label:'Categoría',placeholder:'Nombre de la categoria', required:true, disabled:false, options:[]}
  ]

  mySubcategoria = {
    nombre:null,
    categoria_id:null
  }

  mySubcategoriaFields = [
    {id: 1, tag:'input', name:'nombre', type:'text', label:'Subcategoría',placeholder:'Nombre de la subcategoria', required:true, disabled:false, options:[]}
  ]


  constructor(
    private router:Router,
    private mainService:RegistrosService,
    private ngbModal:NgbModal,
    private categoriaService:CategoriasService,
    private subcategoriaService:SubcategoriasService,
  ) { }

  ngOnInit(): void {
    this.$cuenta = window.history.state
    if(!this.$cuenta.id)
      this.router.navigate(['/dashboard/empresas'])
      else{
        this.myForm.cuenta_id = this.$cuenta.id
        this.myCategoria.empresa_id = this.$cuenta.empresa_id
        this.loadCategorias()
        this.loadData({
          page:0,
          size:this.pageSize,
          field:this.field,
          order:this.order,
          value:this.filterValue,
          attributes:this.attributes,
          cuenta_id: this.$cuenta.id
        });
      }
  }

  async loadData(e:{page,size,field,order,value,attributes,cuenta_id}){
    this.setValues(e)
    const {page,size,value,attributes,field,order,cuenta_id} = e
    let query={
      page: (page) ? +page : 1,
      size: (size) ? +size : +this.pageSize,
      field: (field) ? field : this.field,
      order: (order) ? order : this.order,
      value: (value) ? value : this.filterValue,
      attributes: (attributes) ? attributes : this.attributes,
      cuenta_id: (cuenta_id) ? cuenta_id : this.$cuenta.id
    }
    this.subs.sink = await this.mainService.listar(query).subscribe(
      res=>{
        this.csvData = res['data'];
        this.totalRows = (res['pagina']['total_filas']);
        this.dataSource = res['data'];
        this.dataSource.forEach(d => {
          d.fecha = (d.fecha) ? moment(d.fecha).fromNow() : '';
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
      this.loadData({page:null,size:null,field:null,order:null,value:null,attributes:null,cuenta_id:null});
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

  create(e){
    if(e.ingreso)
      e.monto = Math.abs(e.monto)
    else
      e.monto = Math.abs(e.monto) * (-1)

    this.subs.sink = this.mainService.crear(e).subscribe(res => {
      if(res["success"]){
        this.hide = false
        this.loadData(e)
      }
      else{
        alert(res['message'])
        this.hide = false
      }

    })
  }

  deleteCuenta(){}

  updateCuenta(e){}

  inputChange(e){
    switch(e){
      case 'categoria_id' :
        if(this.myForm.categoria_id === 'nueva'){      
          this.hide = false
          this.categoriasShow = true
        }
        else{
          this.loadSubcategorias(this.myForm.categoria_id)
          this.mySubcategoria.categoria_id = this.myForm.categoria_id
        }
        break
      case 'subcategoria_id' :
        if(this.myForm.subcategoria_id === 'nueva'){
          this.hide = false
          this.subcategoriasShow = true
        }
    }

  }

  loadCategorias(){
    let query = {
      page: 1,
      size:1000,
      order: 'asc',
      field: 'nombre',
      empresaId: this.$cuenta.empresa_id
    }
    this.subs.sink = this.categoriaService.listar(query).subscribe(res => {
      if(res["data"]){
        let index = this.myFormFields.findIndex(field => field.id === 10)
        this.myFormFields[index].options = []
        res["data"].map((cat, i) => {
          i += 100
          this.myFormFields[index].options.push({id:i, value:cat.id, text:cat.nombre})
        })
        this.myFormFields[index].options.push({id:99, value:'nueva', text:'Nueva Categoria'})
      }
    })
    return
  }

  loadSubcategorias(id){
    let query = {
      page: 1,
      size:1000,
      order: 'asc',
      field: 'nombre',
      categoria_id: id
    }
    let index = this.myFormFields.findIndex(field => field.id === 11)
    this.myFormFields[index].options = []
    this.subs.sink = this.subcategoriaService.listar(query).subscribe(res => {
      if(res["data"]){
        res["data"].map((cat, i) => {
          i += 200
          this.myFormFields[index].options.push({id:i, value:cat.id, text:cat.nombre})
        })
        this.myFormFields[index].options.push({id:199, value:'nueva', text:'Nueva Categoria'})
      }
    })
  }

  selectCategoria(e){
    this.subs.sink = this.categoriaService.crear(e).subscribe(async res=>{
      if(res['success']){
        await this.loadCategorias()
        this.myForm.categoria_id = res['data'][0]['id']
        this.mySubcategoria.categoria_id = res['data'][0]['id']
        this.categoriasShow=false
        this.hide=true
      }
      else alert(res['message'])
    })
  }

  selectSubcategoria(e){
    this.subs.sink = this.subcategoriaService.crear(e).subscribe(async res=>{
      if(res['success']){
        await this.loadSubcategorias(this.myForm.categoria_id)
        this.myForm.subcategoria_id = res['data'][0]['id']
        this.subcategoriasShow=false
        this.hide=true
      }
      else alert(res['message'])
    })
  }

}
