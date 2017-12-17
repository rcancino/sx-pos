import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { Traslado } from 'app/logistica/models/traslado';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class TrasladosService {

  readonly apiUrl = environment.apiUrl + '/inventario/traslados';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
  }

  get(id: string): Observable<Traslado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Traslado>(url)
  }

  list(tipo?: string, documento: number = 0 ): Observable<Traslado[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento > 0) {
      params =  params.set('documento', documento.toString());
    }
    if( tipo ){
      params = params.set('tipo', tipo);
    }
    return this.http.get<Traslado[]>(this.apiUrl, {params: params})
  }

  update(traslado: Traslado) {
    const url = `${this.apiUrl}/${traslado.id}`;
    return this.http.put(url, traslado);
  }
  
  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams()
      .set('ID', id);
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  choferes(): Observable<Array<any>> {
    const url = environment.apiUrl + '/embarques/choferes';
    return this.http.get<Array<any>>(url);
  }

}
