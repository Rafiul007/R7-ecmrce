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