const url = "http://localhost:3000/products";

async function getProducts() {
    const products = await fetch(url);
    return await products.json();
};

async function sendProducts(img, name, price){
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                img: img,
                name: name,
                price: price,
            })
        });
    
        if (!response.ok) {
            throw new Error('A solicitação não teve êxito. Código de estado: ' + response.status);
        }

        return await response.json();
    } catch (error) {
        console.error("Aconteceu um erro ao criar o produto:", error);        
    }
};

async function deleteProduct(id){
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error('A solicitação não teve êxito. Código de estado: ' + response.status);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Aconteceu um erro ao eliminar o produto:", error);
    }
}


export const conexionAPI={
    getProducts, 
    sendProducts, 
    deleteProduct
};