import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";
import { LogisticaRoutingModule } from './logistica-routing.module';

import * as components  from './components';
import * as pages from './_pages';

// Services
import { MovimientosService } from "./services/movimientos/movimientos.service";
import { TransformacionesService } from "@siipapx/logistica/services/transformaciones/transformaciones.service";



const PAGES =  [
  pages.MainPageComponent,
  pages.MainDashboardComponent,
  pages.InventariosPageComponent,
  pages.MovimientosPageComponent,
  pages.MovimientosCreateComponent,
  pages.ComprasPageComponent,
  pages.TrasladosPageComponent,
  pages.ExistenciasPageComponent,
  pages.TransformacionesPageComponent,
  pages.TransformacionesCreatePageComponent,
];
const COMPONENTS = [
  components.MovimientosListComponent,
  components.MovimientoViewComponent,
  components.MovimientoFormComponent,
  components.MovimientoDetFormComponent,
  components.MovimientoPartidasListComponent,
  components.TransformacionFormComponent,
]

@NgModule({
  imports: [
    SharedModule,
    LogisticaRoutingModule
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  providers: [MovimientosService, TransformacionesService]
})
export class LogisticaModule { }
