import { ImageLinks } from "./imageLinks";

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  pageCount: number;
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: ImageLinks;
  language: string;
  infoLink: string;
  canonicalVolumeLink: string;
  previewLink: string;
}
