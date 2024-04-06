export interface ProductInfo {
    id: number;
    title: string;
    price: number;
    quantity: number;
    description: string;
    rating: number;
    brand: string;
    category: string;
    thumbnail: string;
}

export interface Product {
    id: number;
    quantity: number;
}

export interface Cart {
    items: Product[];
}

export type User = {
    id: number;
} | null;