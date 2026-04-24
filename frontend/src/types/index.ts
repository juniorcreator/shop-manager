export interface User {
  id: number;
  name: string;
  surname: string;
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

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: number;
  user_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  payment_method: string;
  status: OrderStatus;
  total_price: number;
  comment?: string;
  created_at: string;
  items: OrderItem[];
}

export interface Comment {
  id: number;
  product_id: number;
  product_name: string;
  user_id: number;
  text: string;
  rating: number;
  created_at: string;
}
