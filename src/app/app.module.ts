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
import { CdkTableModule } from '@angular/cdk/table';

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
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
