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
import { DataTableComponent } from './components/datatable/datatable.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/common/logout/logout.component';
import { SearchComponent } from './components/common/search/search.component';
import { AlertsComponent } from './components/common/alerts/alerts.component';
import { MessageComponent } from './components/common/message/message.component';
import { UserInfoComponent } from './components/common/user-info/user-info.component';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsComponent } from './components/forms/forms.component';
import { PaginatorComponent } from './components/datatable/paginator/paginator.component';
import { FilterColumnsComponent } from './components/datatable/filter-columns/filter-columns.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsComponent } from './components/charts/charts.component';
import { ReportsComponent } from './components/datatable/reports/reports.component';
import { Angular2CsvModule } from 'angular2-csv';

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
    DataTableComponent,
    LogoutComponent,
    SearchComponent,
    AlertsComponent,
    MessageComponent,
    UserInfoComponent,
    FormsComponent,
    PaginatorComponent,
    FilterColumnsComponent,
    ChartsComponent,
    ReportsComponent
    // TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    Angular2CsvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
