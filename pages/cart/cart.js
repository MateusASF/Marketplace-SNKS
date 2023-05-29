document.addEventListener("DOMContentLoaded", function () {
    // Função para obter os itens do carrinho do armazenamento local

    // Função para renderizar os itens do carrinho na página
    function renderCartItems() {
        var cartItems = getCartItems();
        var cartItemsContainer = document.querySelector(".cart-items");
        cartItemsContainer.innerHTML = "";

        cartItems.forEach(function (item) {
            var cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");

            var image = document.createElement("img");
            console.log(item.imagem);
            image.src = "../../assets/" + item.imagem;
            image.alt = item.titulo;

            var cartItemInfo = document.createElement("div");
            cartItemInfo.classList.add("cart-item-info");

            var title = document.createElement("h3");
            title.textContent = item.descricao;

            var size = document.createElement("p");
            size.textContent = "Tamanho: " + item.tamanho;

            var price = document.createElement("p");
            price.textContent = "Preço: R$ " + item.preco.toFixed(2);

            var removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.textContent = "Remover";

            cartItemDiv.appendChild(image);
            cartItemInfo.appendChild(title);
            cartItemInfo.appendChild(size);
            cartItemInfo.appendChild(price);
            cartItemDiv.appendChild(cartItemInfo);
            cartItemDiv.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    // Função para remover um item do carrinho
    function removeItemFromCart(index) {
        var cartItems = getCartItems();
        cartItems.splice(index, 1);
        saveCartItems(cartItems);
        renderCartItems();
        updateCartSummary();
    }

    // Função para atualizar o resumo da compra
    function updateCartSummary() {
        var cartItems = getCartItems();
        var totalPrice = 0;
        var totalItems = cartItems.length;

        cartItems.forEach(function (item) {
            totalPrice += item.preco;
        });

        var totalPriceElement = document.getElementById("total-price");
        totalPriceElement.textContent = "R$ " + totalPrice.toFixed(2);

        var totalItemsElement = document.getElementById("total-items");
        totalItemsElement.textContent = totalItems.toString();
    }

    // Função para inicializar a página do carrinho
    function initCartPage() {
        renderCartItems();
        updateCartSummary();

        var cartItemsContainer = document.querySelector(".cart-items");
        cartItemsContainer.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove-button")) {
                var index = Array.from(cartItemsContainer.children).indexOf(
                    event.target.parentNode
                );
                removeItemFromCart(index);
            }
        });

        // Lidar com o clique do botão "Voltar para os Produtos"
        var backToProductsButton = document.getElementById(
            "back-to-products-button"
        );
        backToProductsButton.addEventListener("click", function () {
            window.location.href = "../products/products.html"; // Substitua pelo caminho correto para o arquivo products.html
        });

        // Lidar com o clique do botão "Voltar para os Produtos"
        var goToCheckoutButton = document.getElementById(
            "checkout-button"
        );
        goToCheckoutButton.addEventListener("click", function () {
            window.location.href = "../checkout/checkout.html"; // Substitua pelo caminho correto para o arquivo products.html
        });
    }

    // Inicializar a página do carrinho
    initCartPage();
});

function getCartItems() {
    var cartItemsString = localStorage.getItem("CART");
    if (cartItemsString) {
        return JSON.parse(cartItemsString);
    }
    return [];
}

// Função para salvar os itens do carrinho no armazenamento local
function saveCartItems(cartItems) {
    var cartItemsString = JSON.stringify(cartItems);
    localStorage.setItem("CART", cartItemsString);
}

// Função para adicionar um item ao carrinho
function addToCart(item) {
    var cartItems = getCartItems();
    cartItems.push(item);
    saveCartItems(cartItems);
}
