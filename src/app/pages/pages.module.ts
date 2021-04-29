import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa/empresa.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from '../components/datatable/datatable.module';
import { EmpresasService } from '../services/empresas.service';
import { RegistrosComponent } from './registros/registros.component';
import { DatacardsComponent } from '../components/datacards/datacards.component';
import { AppComponentsModule } from '../components/app-components.module';

@NgModule({
  declarations: [
    EmpresaComponent,
    CuentasComponent,
    RegistrosComponent,
    DatacardsComponent
  ],
  imports: [
    FormsModule, 
    CommonModule,
    RouterModule,
    DataTableModule,
    AppComponentsModule
  ],
  providers: [
    EmpresasService
  ]
})
export class PagesModule { }
