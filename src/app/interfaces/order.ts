import { Payer } from '@interfaces/payer';

export interface Order {
  id: number;
  total: number;
  status: string;
  payer: Payer;
}
