import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
// import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
// import { SolicitudDeTrasladoDet } from 'app/logistica/models/solicitudDeTrasladoDet';
import { SectorDetDialogComponent } from './sector-det-dialog.component';


@Component({
  selector: 'sx-almacen-sector-form',
  templateUrl: 'almacen-sector-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlmacenSectorFormComponent implements OnInit {

  form: FormGroup;

  @Input() fecha = new Date();

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  inserted$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      fecha: [{value: this.fecha, disabled: true}, Validators.required],
      sector: [null, Validators.required],
      responsable1: ['', [Validators.required, Validators.maxLength(100)]],
      responsable2: ['', [Validators.required, Validators.maxLength(100)]],
      comentario: ['', [Validators.maxLength(100)]],
      partidas: this.fb.array([])
    });

    this.inserted$ = this.form.get('partidas')
      .valueChanges
      .map( (value: Array<any> )  => _.map(value, item => item.producto.clave) )

  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    return {
      ...this.form.getRawValue(),
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  insertar() {
    const dialogRef = this.dialog.open(SectorDetDialogComponent, {
      data: {sucursal: this.sucursal}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Insertando partida: ', result);
        this.insertarPartida(result);
      }
    });
  }

  insertarPartida(det) {
    const fg = this.fb.group({
      producto: {
        id: det.existencia.producto.id,
        clave: det.existencia.producto.clave,
        descripcion: det.existencia.producto.descripcion
      },
      comentario: det.comentario,
    });
    this.partidas.push(fg);
    this.cd.detectChanges();
  }

  editarPartida($event) {
    const {row, cantidad} = $event;
    this.partidas.controls[row].patchValue({cantidad: cantidad});
  }

  onDelete(index: number) {
    this.removePartida(index);
  }



}
