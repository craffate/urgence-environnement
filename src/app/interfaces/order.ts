import { Payer } from '@interfaces/payer';

export interface Order {
  id: number;
  total: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  Payer: Payer;
}
