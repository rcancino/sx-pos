import { Sucursal, Cliente, VentaDet } from 'app/models';


export interface Venta {
  id: string;
  sucursal: Sucursal;
  cliente: Cliente;
  vendedor: {id: string, nombre: string},
  tipo: string;
  documeto: number;
  // Importes y totales
  importe: number;
  descuento: number
  descuentoImporte: number
  subTotal: number
  impuesto: number
  impuestoTasa: number
  total: number;
  // END Importes y totales
  formaDePago: string;
  moneda: string;
  tipoDeCambio: number;
  kilos: number;
  partidas: Array<VentaDet>;
  vale?: boolean;
  atencion?: string;
}

export interface TipoDeVenta {
  clave: string
  descripcion: string
}
export const TIPOS: TipoDeVenta[] = [
  { clave: 'CON', descripcion: 'Contado'},
  { clave: 'CRE', descripcion: 'Crédito'},
  { clave: 'COD', descripcion: 'Cobro contra entrega'},
  // { clave: 'ANT', descripcion: 'Anticipo'},
  // { clave: 'USD', descripcion: 'Dolares'},
  // { clave: 'ACT', descripcion: 'Activos'},
];
