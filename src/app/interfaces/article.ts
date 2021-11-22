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
  weight?: number; 
  weight_unit: string;
  length: number;
  width: number;
  height: number;
  dimensions_unit: string;
  Images?: Image[];
  Category?: Category;
  updated_at?: string;
};

export interface ArticlesWithCount {
  articles: Article[];
  totalPages: number;
}