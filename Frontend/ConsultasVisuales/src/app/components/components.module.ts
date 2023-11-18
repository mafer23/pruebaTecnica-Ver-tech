import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './graficas/graficas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ComponentRoutingModule } from './component.routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasService } from '../service/consultas.service';
import { SearchComponent } from './search/search.component';
import { AllComponent } from './all/all.component';



@NgModule({
  declarations: [
    GraficasComponent,
    ConsultasComponent,
    AdminComponent,
    SearchComponent,
    AllComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],providers:[ConsultasService]
})
export class ComponentsModule { }
