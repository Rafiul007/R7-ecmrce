export interface IProduct {
  id: number;
  title: string;
  images: string[];
  description: string;
  price: number;
  dateAdded: string;
  category?: string;
  inStock?: boolean;
  sizes?: string[];
  colors?: string[];
}

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  colors?: string[];
  quantity: number;
}
