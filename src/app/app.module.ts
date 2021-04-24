import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsComponent } from './components/forms/forms.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Angular2CsvModule, Angular2CsvComponent } from 'angular2-csv';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { InterfaceModule } from './components/interface/interface.module';
import { LayoutModule } from './components/layout/layout.module';
import { DataTableModule } from './components/datatable/datatable.module';
import { ChartsModule } from './components/charts/charts.module';
import { PublicPagesModule } from './components/public/public.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    ConfigurationComponent,
    CalendarComponent,
    FormsComponent,
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
    InterfaceModule,
    LayoutModule,
    DataTableModule,
    ChartsModule,
    PublicPagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
