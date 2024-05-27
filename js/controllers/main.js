import { conexionAPI } from "../services/conexionAPI.js";

const list = document.querySelector("[data-list]");
const formulario = document.querySelector("[data-formulario]");
const cleanButtton = document.querySelector(".formulario__boton-limpiar");

export default function createCard(id, img, name, price) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = id;
    card.innerHTML = `
        <img class="card-container--image" src="${img}" />
        <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
            <p>$ ${price}.00</p>
            <img class="card__trash-icon" src="./assets/images/trash_icon.png" />
        </div>
        </div>
    `;

    const trashButton = card.querySelector(".card__trash-icon");

    trashButton.addEventListener("click", () => {
            const id = card.dataset.id;
            const question = confirm(`Tem certeza que deseja apagar o produto ${id}?`);

            if (question) {
                conexionAPI.deleteProduct(id)
                .then(() => {
                    card.remove();
                })
                .catch(err => console.log(err));
            }
    });
    return card;
};

async function listProducts() {
    try {
        const listAPI = await conexionAPI.getProducts();
        listAPI.forEach(product => list.appendChild(createCard(product.id, product.img, product.name, product.price)));
    } catch (error) {
        list.innerHTML = `<h2 class="mensaje__titulo">Ocorreu um problema com a conexão.</h2>`;
        console.log(error);
    }
};

cleanButtton.addEventListener("click", () => {
    formulario.reset();
});

listProducts();