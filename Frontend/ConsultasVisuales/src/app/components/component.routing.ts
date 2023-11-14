import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { GraficasComponent } from './graficas/graficas.component';



const routes: Routes = [

{ path : '',

   children:[
    {
      path: '',
      component: ConsultasComponent
      
    },
    {
      path: 'graficas',
      component: GraficasComponent 
    },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },

   ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})

export class ComponentRoutingModule {}
