import { Payer } from '@interfaces/payer';
import { Article } from '@interfaces/article';

export interface Order {
  id: number;
  total: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  Payer: Payer;
  Articles?: Article[];
}
