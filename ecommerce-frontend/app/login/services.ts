export const authenticate = async (username: string, password: string) => {
    const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password}),
    });

    if(response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        return null;
    }
}