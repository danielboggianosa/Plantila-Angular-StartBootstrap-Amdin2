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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/common/logout/logout.component';
import { SearchComponent } from './components/common/search/search.component';
import { AlertsComponent } from './components/common/alerts/alerts.component';
import { MessageComponent } from './components/common/message/message.component';
import { UserInfoComponent } from './components/common/user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsComponent } from './components/forms/forms.component';
import { PaginatorComponent } from './components/datatable/paginator/paginator.component';
import { FilterColumnsComponent } from './components/datatable/filter-columns/filter-columns.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsComponent } from './components/charts/charts.component';
import { ReportsComponent } from './components/datatable/reports/reports.component';
import { Angular2CsvModule, Angular2CsvComponent } from 'angular2-csv';
import { AreaChartComponent } from './components/charts/area-chart/area-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent} from './components/charts/pie-chart/pie-chart.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { InterfaceModule } from './components/interface/interface.module';

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
    FilterColumnsComponent,
    ReportsComponent,
    ChartsComponent,
    AreaChartComponent,
    BarChartComponent,
    PieChartComponent,
    TimeAgoPipe,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    Angular2CsvModule,
    InterfaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
