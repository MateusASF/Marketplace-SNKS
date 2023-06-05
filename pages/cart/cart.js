document.addEventListener("DOMContentLoaded", function () {
    var btDisable;

    // Função para obter os itens do carrinho do armazenamento local

    // Função para renderizar os itens do carrinho na página
// Função para renderizar os itens do carrinho na página
function renderCartItems() {
    var cartItems = getCartItems();
    cartItems.length == 0 ? btDisable = true : btDisable = false;
    var cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    cartItems.forEach(function (item, index) {
        var cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        var image = document.createElement("img");
        image.src = "../../assets/" + item.imagem.replaceAll("../", "");
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
        removeButton.addEventListener("click", function () {
            removeItemFromCart(index);
        });

        cartItemDiv.appendChild(image);
        cartItemInfo.appendChild(title);
        cartItemInfo.appendChild(size);
        cartItemInfo.appendChild(price);
        cartItemDiv.appendChild(cartItemInfo);
        cartItemInfo.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemDiv);
    });
}


    // Função para remover um item do carrinho
    function removeItemFromCart(itemId) {
        var cartItems = getCartItems();
        cartItems = cartItems.filter(function (item, index) {
            return index !== itemId; // Remove o item com base no seu ID
        });
        saveCartItems(cartItems);
        renderCartItems();
        updateCartSummary();
        if (cartItems.length == 0) {
            window.location.href = "../cart/cart.html";
        }
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
                var itemId = event.target.dataset.itemId; // Obtém o ID único do item
                removeItemFromCart(itemId);
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
        var goToCheckoutButton = document.getElementById("checkout-button");
        var zeroItemsSpan = document.getElementById("zeroItems");

        if(btDisable == true) {
            goToCheckoutButton.style.display = 'none';
            zeroItemsSpan.style.display = 'block';
        } else {
            goToCheckoutButton.style.display = 'flex';
            zeroItemsSpan.style.display = 'none';
        }

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
