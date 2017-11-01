import { Sucursal, Cliente, VentaDet, Vendedor } from 'app/models';


export interface Venta {
  id: string;
  fecha: string
  sucursal: Sucursal;
  cliente: Cliente;
  vendedor?: Vendedor,
  tipo: string;
  documento: number;
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
  cod?: boolean
  cargosPorManiobra?: number
  comisionTarjeta?: number
  comisionTarjetaImporte?: number,
  corteImporte?: number,
  facturar?: string
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
