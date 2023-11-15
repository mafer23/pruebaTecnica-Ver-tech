import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './graficas/graficas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ComponentRoutingModule } from './component.routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GraficasComponent,
    ConsultasComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    NgApexchartsModule,
    HttpClientModule
  ]
})
export class ComponentsModule { }
