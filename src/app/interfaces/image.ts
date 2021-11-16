import { Article } from "@interfaces/article";

export interface Image {
  id?: number;
  filename: string;
  mimetype: string;
  path: string;
  Article?: Article;
}