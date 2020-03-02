import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { RecoverComponent } from './components/public/recover/recover.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DataTableComponent } from './components/datatable/datatable.component';


const routes: Routes = [
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'recover', component: RecoverComponent},
  {path:'dashboard', component: LayoutComponent, children:[
    {path:'profile', component: ProfileComponent},
    {path:'table', component: DataTableComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
