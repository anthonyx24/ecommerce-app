import { Cart, Product } from "./types";

// Gets all products from dummy API
export const get_products = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products')
        if (!response.ok) {
            throw new Error("Error fetching products. Status: " + response.status + " Message: " + response.statusText);
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products: ", error);
    }
} 

// Gets the items (product_id and quantity) from the backend db
export const authenticated_get_items = async (user_id: number) => {
    try {
        const response = await fetch(`http://localhost:3000/carts/${user_id}`)
        if(!response.ok) {
            throw new Error(`Error fetching items from user ${user_id}. Status: ` + response.status + " Message: " + response.statusText);
        }
        const items = await response.json();
        return items;
    } catch (error) {
        console.error(`Error creating cart for user ${user_id}: `, error);
    }
}


// Creates a cart on dummy API with current cart data
export const fetch_cart_data = async (cart: Cart) => {
    console.log("Creating cart with: ", cart);
    try {
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 1,
                products: cart.products
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

// Saves the existing cart to the backend db of the user
export const save_cart = async (user_id: number, cart: Cart) => {
    try {
        const response = await fetch(`http://localhost:3000/carts/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        });
        if (!response.ok) {
            throw new Error(`Error saving cart. Status: ` + response.status + " Message: " + response.statusText);
        }
    } catch (error) {
        console.error("Error saving cart: ", error);
    }
}

// Fetches the cart from the backend db, then creates a dummy cart with the existing items to get total price
// export const authenticated_create_cart = async (user_id: number) => {
//     try {
//         const response = await fetch(`http://localhost:3000/carts/${user_id}`)
//         if(!response.ok) {
//             throw new Error(`Error fetching items from user ${user_id}. Status: ` + response.status + " Message: " + response.statusText);
//         }
//         const items = await response.json();

//         // Then, create a dummy cart with the existing items
//         const dummy_response = await fetch('https://dummyjson.com/carts/add', {
//             method: 'POST',
//             body: JSON.stringify({
//                 userId: 1, // dummy id
//                 products: items
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (!dummy_response.ok) {
//             throw new Error(`Error creating dummy cart for user ${user_id}. Status: ` + dummy_response.status + " Message: " + dummy_response.statusText);
//         }
//         const data = await dummy_response.json();
//         return data;
//     } catch (error) {
//         console.error(`Error creating cart for user ${user_id}: `, error);
//     }
// }

// Fetches the items from the dummy cart
// export const get_cart = async (cart_id: number) => {
//     try {
//         const response = await fetch('https://dummyjson.com/carts/' + cart_id);
//         if (!response.ok) {
//             throw new Error(`Error fetching cart ${cart_id}. Status: ` + response.status + " Message: " + response.statusText);
//         }
//         const data = await response.json();
//         return {
//             products: data.products,
//             total: data.total,
//             // num_products: data.totalProducts
//         };
//     } catch (error) {
//         console.error(`Error fetching cart ${cart_id}: `, error);
//     }
// }

