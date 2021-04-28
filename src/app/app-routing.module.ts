import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { RecoverComponent } from './components/public/recover/recover.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { RegistrosComponent } from './pages/registros/registros.component';


const routes: Routes = [
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  // RUTAS PÚBLICAS
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'recover', component: RecoverComponent},
  // RUTAS PRIVADAS
  {path:'dashboard', component: LayoutComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService],
  children:[
    {path:'', component: DashboardComponent},
    {path:'empresas', component: EmpresaComponent},
    {path: 'cuentas/:empresaId', component: CuentasComponent},
    {path: 'registros/:cuentaId', component: RegistrosComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
