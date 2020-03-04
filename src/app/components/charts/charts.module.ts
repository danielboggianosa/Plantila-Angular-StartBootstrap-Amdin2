import { NgModule } from "@angular/core";
import { ChartsComponent } from './charts.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
    declarations:[
        ChartsComponent,
        AreaChartComponent,
        PieChartComponent,
        BarChartComponent,
    ]
})
export class ChartsModule {}