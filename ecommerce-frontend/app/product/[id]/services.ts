export const fetch_product_info = async (id: string) => {
    try {
        const response = await fetch('https://dummyjson.com/products/' + id)
        if (!response.ok) {
            throw new Error("Error fetching searched products. Status: " + response.status + " Message: " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}