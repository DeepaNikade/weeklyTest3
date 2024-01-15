// list of products
const products = [
    { id: 1, name: "Product-1", price: 100 },
    { id: 2, name: "Product-2", price: 200 },
    { id: 3, name: "Product-3", price: 300 },
    { id: 4, name: "Product-4", price: 400 },
    { id: 5, name: "Product-5", price: 500 },
    { id: 6, name: "Product-6", price: 600 },
    { id: 7, name: "Product-7", price: 700 },
    { id: 8, name: "Product-8", price: 800 },
];


// get the id from html
const productContainer1 = document.querySelector("#productCardsDown");
const cartContainer1 = document.querySelector("#cartCardsDown");
const emptyMessage1 = document.querySelector("#emptyMessage");
const totalPrice1 = document.querySelector("#totalProice");


// create an array
const cart = [];


// on load we will display the products
window.onload = () => {
    products.forEach((product) => {

        // here we are creating div for all the products
        let div = document.createElement("div");
        div.innerHTML = `
            <p class="pName">${product.name}</p>
            <p class="pPrice">${product.price}</p>
            <div class="counter">
                <button class="decrease">-</button>
                <span class="value">0</span>
                <button class="increase">+</button>
            </div>
        `;
        div.classList.add("productCards");
        productContainer1.appendChild(div);


       //this is the counter button logic 
        const decreaseButton = div.querySelector(".decrease");
        const valueElement = div.querySelector(".value");
        const increaseButton = div.querySelector(".increase");

        let count = 0;
        decreaseButton.addEventListener("click", () => {
            count = Math.max(0, count - 1);
            valueElement.innerHTML = count;
            updateCartItem(product.id, count);
            updateTotalPrice();
        });

        increaseButton.addEventListener("click", () => {
            count += 1;
            valueElement.innerHTML = count;
            updateCartItem(product.id, count);
            updateTotalPrice();
        });
    });
};


// cart section
function updateCartItem(productId, quantity) {
    const existingCartItem = cart.find((item) => item.id === productId);

    if (existingCartItem) {
        if (quantity === 0) {
            // Remove item from cart if quantity becomes zero
            const index = cart.indexOf(existingCartItem);
            cart.splice(index, 1);
        } else {
            // Update quantity if item already exists in cart
            existingCartItem.quantity = quantity;
        }
    } else {
        // Add new item to cart
        cart.push({ id: productId, quantity: quantity, price: getProductPrice(productId) });
    }

    renderCart();
}

function getProductPrice(productId) {
    const product = products.find((p) => p.id === productId);
    return product ? product.price : 0;
}

function renderCart() {
    cartContainer1.innerHTML = "";
    if (cart.length === 0) {
        emptyMessage1.style.display = "block";
    } else {
        emptyMessage1.style.display = "none";
        cart.forEach((cartItem) => {
            const cartCard = document.createElement("div");
            cartCard.className = "cart-card";
            const totalItemPrice = cartItem.price * cartItem.quantity;
            cartCard.innerHTML = `
                <p>${getProductName(cartItem.id)} </p> 
                <p>${cartItem.price} x ${cartItem.quantity}</p>
                 <p>${totalItemPrice}</p>

                
            `;
            cartContainer1.appendChild(cartCard);
        });
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalPrice1.textContent = `${total}`;
}

function getProductName(productId) {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "";
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex((item) => item.id === productId);

    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];

        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }

        renderCart();
    }
}
