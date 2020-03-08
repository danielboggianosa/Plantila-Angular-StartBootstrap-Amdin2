import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { RecoverComponent } from './components/public/recover/recover.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsComponent } from './components/forms/forms.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ButtonsComponent } from './components/interface/buttons/buttons.component';
import { CardsComponent } from './components/interface/cards/cards.component';
import { ColorsComponent } from './components/interface/colors/colors.component';
import { BordersComponent } from './components/interface/borders/borders.component';
import { AnimaitionsComponent } from './components/interface/animaitions/animaitions.component';
import { OtherComponent } from './components/interface/other/other.component';
import { UnknownComponent } from './components/interface/unknown/unknown.component';
import { BlankComponent } from './components/interface/blank/blank.component';
import { DataTableComponent } from './components/datatable/datatable.component';
import { ChartsComponent } from './components/charts/charts.component';


const routes: Routes = [
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  // RUTAS PÚBLICAS
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'recover', component: RecoverComponent},
  // RUTAS PRIVADAS
  {path:'dashboard', component: LayoutComponent, 
  children:[
    {path:'', component: DashboardComponent},
    {path:'profile', component: ProfileComponent},
    {path:'table', component: DataTableComponent},
    {path:'forms', component: FormsComponent},
    {path:'charts', component: ChartsComponent},
    {path:'buttons', component: ButtonsComponent},
    {path:'cards', component: CardsComponent},
    {path:'colors', component: ColorsComponent},
    {path:'borders', component: BordersComponent},
    {path:'animations', component: AnimaitionsComponent},
    {path:'other', component: OtherComponent},
    {path:'blank', component: BlankComponent},
    {path:'unknown', component: UnknownComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
