import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { GraficasComponent } from './graficas/graficas.component';
import{AdminComponent} from './admin/admin.component'
import { SearchComponent } from './search/search.component';



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
      path: 'admin',
      component: AdminComponent
    },
    {
      path: 'buscar',
      component: SearchComponent
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
