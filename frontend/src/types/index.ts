export interface User {
  id: string;
  name: string;
  serName: string;
  email: string;
  password?: string;
  created_at: Date;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
