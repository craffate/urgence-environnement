import { Image } from '@interfaces/image';

export interface Article {
  id: number;
  sku?: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  categoryId: number;
  Images?: Image[];
};
