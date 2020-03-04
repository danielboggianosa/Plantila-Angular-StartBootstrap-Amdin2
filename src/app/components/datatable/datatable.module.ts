import { NgModule } from '@angular/core';
import { DataTableComponent } from './datatable.component';
import { FilterColumnsComponent } from './filter-columns/filter-columns.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ReportsComponent } from './reports/reports.component';
import { Angular2CsvModule } from 'angular2-csv';
import { MatTableModule } from '@angular/material/table';

// @NgModule({
//     declarations:[
//         DataTableComponent,
//         FilterColumnsComponent,
//         PaginatorComponent,
//         ReportsComponent,
//         MatTableModule
//     ],
//     imports:[
//         Angular2CsvModule
//     ]
// })
// export class DataTableModule {}