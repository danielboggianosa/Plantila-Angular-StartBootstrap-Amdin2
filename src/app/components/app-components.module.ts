import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormsComponent
  ],
  exports:[
    FormsComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class AppComponentsModule { }
