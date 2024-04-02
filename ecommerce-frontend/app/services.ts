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

// Creates a cart on dummy API for guest user
export const guest_create_cart = async () => {
    try {
        const dummy_response = await fetch('https://dummyjson.com/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!dummy_response.ok) {
            throw new Error(`Error creating dummy cart for guest user. Status: ` + dummy_response.status + " Message: " + dummy_response.statusText);
        }
        const data = await dummy_response.json();
        return data;
    } catch (error) {
        console.error("Error creating cart for guest user: ", error);
    }
}

// Takes in existing data from local db, creates cart on dummy API with that data
export const authenticated_create_cart = async (user_id: number) => {
    try {
        // First, get the existing items from the local db
        const response = await fetch(`http://localhost:3000/carts/${user_id}`)
        if(!response.ok) {
            throw new Error(`Error fetching items from user ${user_id}. Status: ` + response.status + " Message: " + response.statusText);
        }
        const items = await response.json();

        // Then, create a dummy cart with the existing items
        const dummy_response = await fetch('https://dummyjson.com/carts', {
            method: 'POST',
            body: JSON.stringify({
                products: items
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!dummy_response.ok) {
            throw new Error(`Error creating dummy cart for user ${user_id}. Status: ` + dummy_response.status + " Message: " + dummy_response.statusText);
        }
        const data = await dummy_response.json();
        return data;
    } catch (error) {
        console.error(`Error creating cart for user ${user_id}: `, error);
    }
}

// Fetches the items from the dummy cart
export const get_cart = async (cart_id: number) => {
    try {
        const response = await fetch('https://dummyjson.com/carts/' + cart_id);
        if (!response.ok) {
            throw new Error(`Error fetching cart ${cart_id}. Status: ` + response.status + " Message: " + response.statusText);
        }
        const data = await response.json();
        return {
            products: data.products,
            total: data.total,
            // num_products: data.totalProducts
        };
    } catch (error) {
        console.error(`Error fetching cart ${cart_id}: `, error);
    }
}

// DummyJSON automatically adds item with correct quantity to cart, just need to specify merge=true
export const add_item = async (cart_id: number, product_id: number, quantity: number) => {
    try {
        const response = await fetch('https://dummyjson.com/carts/' + cart_id, {
            method: 'POST',
            body: JSON.stringify({
                merge: true,
                products: {
                    product_id: product_id,
                    quantity: quantity
                }
            }),
        });
        if (!response.ok) {
            throw new Error(`Error adding item to cart ${cart_id}. Status: ` + response.status + " Message: " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error adding item to cart ${cart_id}: `, error);
    }
}

// Removing an item is trickier, since DummyJSON does not provide a direct endpoint to remove items.
// Thus, we need to get the existing list of items, remove the item, and pass in that new list to the dummy API.
export const remove_item = async (cart_id: number, current_items: any[], product_id: number) => {
    // Filter out the item to remove
    const filtered_items = current_items.filter(item => item.id !== product_id);
    // Create list of ids and quantities
    const updated_items = filtered_items.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));
    // Pass list to dummy API to update cart
    try {
        const response = await fetch('https://dummyjson.com/carts/' + cart_id, {
            method: 'POST',
            body: JSON.stringify({
                products: updated_items
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error removing item from cart ${cart_id}. Status: ` + response.status + " Message: " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error removing item from cart ${cart_id}: `, error);
    }

}

