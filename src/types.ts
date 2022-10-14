export interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number | string;
  imgSrc: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  cost: number;
  currency: string;
  soldCount: number;
  image: string;
  html_name?: string;
  html_description?: string;
}

export type StoreObject = any;

export interface JSONResult {
  status: 'ok' | 'error';
  data: any;
}

export interface SortData {
  id: string;
  content: JSX.Element | string;
  exec: (a: StoreObject, b: StoreObject) => number;
}

export interface FilterData {
  exec: (a: StoreObject) => boolean;
}

export interface ProductFull {
  id: number;
  name: string;
  description: string;
  cost: number;
  currency: string;
  soldCount: number;
  category: string;
  images: string[];
  relatedProducts: RelatedProduct[];
}

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
}

export interface ProductComment {
  product: number;
  score: number;
  description: string;
  user: string;
  dateTime: string;
}

export interface CartObj {
  user: number;
  articles: Article[];
}

export interface Article {
  id: number;
  name: string;
  count: number;
  unitCost: number;
  currency: string;
  image: string;
}
