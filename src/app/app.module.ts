import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { RecoverComponent } from './components/public/recover/recover.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TopbarComponent } from './components/common/topbar/topbar.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/common/logout/logout.component';
import { SearchComponent } from './components/common/search/search.component';
import { AlertsComponent } from './components/common/alerts/alerts.component';
import { MessageComponent } from './components/common/message/message.component';
import { UserInfoComponent } from './components/common/user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsComponent } from './components/forms/forms.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Angular2CsvModule } from 'angular2-csv';
import { ChartsModule } from './components/charts/charts.module';
import { DataTableComponent } from './components/datatable/datatable.component';
import { PaginatorComponent } from './components/datatable/paginator/paginator.component';
import { ReportsComponent } from './components/datatable/reports/reports.component';
import { FilterColumnsComponent } from './components/datatable/filter-columns/filter-columns.component';
import { TimeAgoPipe } from 'time-ago-pipe'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    ConfigurationComponent,
    CalendarComponent,
    LogoutComponent,
    SearchComponent,
    AlertsComponent,
    MessageComponent,
    UserInfoComponent,
    FormsComponent,
    DataTableComponent,
    PaginatorComponent,
    ReportsComponent,
    FilterColumnsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    ChartsModule,
    Angular2CsvModule,
    // TimeAgoPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
