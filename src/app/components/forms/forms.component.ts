import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styles: []
})
export class FormsComponent implements OnInit {
  pageTitle="Forms";
  pageDescription="DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the DataTables documentation";
  cardTitle="Forms Example";
  myForm;
  myFormFields=[
    {id: 1, tag:'input', name:'nombre', type:'text', placeholder:'Nombre', required:true, options:[]},
    {id: 2, tag:'input', name:'apellido', type:'text', placeholder:'Apellidos', required:true, options:[]},
    {id: 3, tag:'input', name:'correo', type:'email', placeholder:'Correo', required:true, options:[]},
    {id: 4, tag:'input', name:'telefono', type:'text', placeholder:'Teléfono', required:true, options:[]},
    {id: 5, tag:'input', name:'edad', type:'number', placeholder:'Edad', required:true, options:[]},
    {id: 6, tag:'select', name:'country', type:'text', placeholder:'Country', required:true, options:[
      {id: 7, value:'peru', text:'Perú'},
      {id: 8, value:'chile', text:'Chile'},
      {id: 9, value:'argentina', text:'Argentina'},
    ]},
    {id:10, tag:'input', type:'radio', name:'tipoDocumento', placeholder:'Tipo de Documento', required:true, options:[
      {id:11, value:'DNI', text:'DNI'},
      {id:12, value:'PASAPORTE', text:'PASAPORTE'},
      {id:13, value:'OTRO', text:'OTRO'},
    ]},
    {id:14, tag:'input', type:'checkbox', name:'colores', placeholder:'Colores Favoritos', required:true, options:[
      {id:15, value:'rojo', text:'Rojo'},
      {id:16, value:'azul', text:'Azul'},
      {id:17, value:'verde', text:'Verde'},
    ]},
    {id: 18, tag:'textarea', name:'descripcion', type:'text', placeholder:'Descripción', required:true, options:[]},
    {id: 19, tag:'input', name:'nacimiento', type:'date', placeholder:'Fecha de Nacimiento', required:true, options:[]},
    {id: 20, tag:'input', name:'archivo', type:'file', placeholder:'Subir Archivo', required:true, options:[]},
  ];
  @ViewChild('Formulario',{static:false}) Formulario;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  submitAction(){
    let e = this.Formulario.nativeElement.elements;
    
    this.myForm={
      nombre: e.nombre.value,
      apellido: e.apellido.value,
      correo: e.correo.value,
      telefono: e.telefono.value,
      edad: e.edad.value,
      country: e.country.value,
      tipoDocumento: e.tipoDocumento.value,
      colores: {
        rojo: e.rojo.value,
        azul: e.azul.value,
        verde: e.verde.value
      },
      descripcion: e.descripcion.value,
      nacimiento: e.nacimiento.value,
      archivo: e.archivo.value
    }

    console.log('Datos del Formulario: ', this.myForm)
    //Resetear el formulario una vez enviado.
    this.Formulario.nativeElement.reset();
  }

}
