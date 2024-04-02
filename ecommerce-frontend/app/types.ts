export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export type User = {
    id: number;
} | null;