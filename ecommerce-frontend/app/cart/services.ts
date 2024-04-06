import { Cart, ProductInfo, Product } from '../types';

// Creates a cart on dummy API with current cart data
export const fetch_cart_data = async (cart: Cart) => {
    
    try {
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 1,
                products: cart.items
            })
        });
        if (!response.ok) {
            throw new Error(`Error creating cart. Status: ` + response.status + " Message: " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating cart: ", error);
    }
}

export const calculate_total = (items: ProductInfo[], cart_items: Product[]) => {
    let total = 0;
    // for each item in cart_items, find the corresponding product in items and add the price
    cart_items.forEach((cart_item) => {
        const product = items.find((item) => item.id === cart_item.id);
        if (product) {
            total += product.price * cart_item.quantity;
        }
    });
    return total;
}