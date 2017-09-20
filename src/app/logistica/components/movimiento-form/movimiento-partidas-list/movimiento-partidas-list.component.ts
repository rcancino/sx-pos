import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MovimientoDet } from "app/logistica/models/movimientoDet";

@Component({
  selector: 'sx-movimiento-partidas-list',
  templateUrl: './movimiento-partidas-list.component.html',
  styleUrls: ['./movimiento-partidas-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovimientoPartidasListComponent implements OnInit {
  
  

  @Input() parent: FormGroup
  
  @Input() partidas: MovimientoDet[];
  
  constructor() { }

  ngOnInit() {
  }

}
