import { Image } from '@interfaces/image';
import { Category } from '@interfaces/category';

export interface Article {
  id?: number;
  sku: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  quantity: number;
  weight?: {weight: number; unit: string};
  dimensions?: {length: number; width: number; height: number; unit: string; };
  Images?: Image[];
  Category?: Category;
};
