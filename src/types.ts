export interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number | string;
  imgSrc: string;
}

export interface Product {
  id: number;
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
