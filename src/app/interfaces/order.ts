import { Article } from '@interfaces/article';

export interface Order {
  id?: number;
  total: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  Articles?: Article[];
}
