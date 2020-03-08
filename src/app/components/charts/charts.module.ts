import { NgModule } from "@angular/core";
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';

@NgModule({
    declarations:[
        AreaChartComponent,
        BarChartComponent,
        PieChartComponent,
        ChartsComponent
    ],
    imports:[
        CommonModule
    ]
})
export class ChartsModule {}