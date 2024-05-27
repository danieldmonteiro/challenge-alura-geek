import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function createProduct(evento) {
    evento.preventDefault();

    const img = document.querySelector("[data-img]").value;
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;

    try {
        const res = await conexionAPI.sendProducts(img, name, price);
        window.location.reload();
        console.log(res);
    } catch (err) {
        console.log(err);
    }
    
}

formulario.addEventListener("submit", evento => {
    createProduct(evento);
    formulario.reset()
});