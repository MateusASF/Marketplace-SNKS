document.addEventListener("DOMContentLoaded", function () {
    var savedProducts = getProductsFromStorage();

    if (savedProducts) {
        renderProducts(savedProducts);
    } else {
        searchProducts({});
    }

    function saveProductsToStorage(products) {
        localStorage.setItem("PRODUTOS", JSON.stringify(products));
    }

    function getProductsFromStorage() {
        var productsString = localStorage.getItem("PRODUTOS");
        return JSON.parse(productsString);
    }

    function searchProducts(params) {
        // Carregar o arquivo JSON de produtos
        fetch("products.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Salvar os produtos no localStorage
                saveProductsToStorage(data);

                // Filtrar os produtos com base nos parâmetros
                var filteredProducts = data.filter(function (product) {
                    var isMatch = true;

                    if (params.precoMin) {
                        if (product.preco < params.precoMin) {
                            isMatch = false;
                        }
                    }

                    if (params.precoMax) {
                        if (product.preco > params.precoMax) {
                            isMatch = false;
                        }
                    }

                    if (params.marca && params.marca.length > 0) {
                        if (!params.marca.includes(product.marca)) {
                            isMatch = false;
                        }
                    }

                    if (params.tamanho && params.tamanho.length > 0) {
                        if (!params.tamanho.includes(product.tamanho)) {
                            isMatch = false;
                        }
                    }

                    return isMatch;
                });

                // Exibir os resultados da busca
                var searchResultsDiv =
                    document.getElementById("search-results");
                searchResultsDiv.innerHTML = "";

                filteredProducts.forEach(function (product) {
                    var productDiv = document.createElement("div");
                    productDiv.classList.add("product-card");
                    productDiv.innerHTML = `
                <h2>${product.titulo}</h2>
                <img src="${product.imagem}" alt="${
                        product.titulo
                    }" width="100">
                <p>${product.descricao}</p>
                <p>Marca: ${product.marca}</p>
                <p>Tamanho: ${product.tamanho}</p>
                <p>Preço: R$ ${product.preco.toFixed(2)}</p>
                <button class="add-to-cart-button2">Adicionar ao Carrinho</button>
              `;
                    searchResultsDiv.appendChild(productDiv);

                    var addToCartButton = productDiv.querySelector(
                        ".add-to-cart-button2"
                    );
                    addToCartButton.addEventListener("click", function () {
                        addToCart(product);
                        window.location.href = "../cart/cart.html";
                    });
                });
            })
            .catch(function (error) {
                console.error("Erro ao carregar os produtos:", error);
            });
    }

    // Função para inicializar a busca
    function initSearch() {
        var searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", function () {
            var searchInput = document.getElementById("search-input").value;
            var priceMin = document.getElementById("price-min").value;
            var priceMax = document.getElementById("price-max").value;
            var brand = document.getElementById("brand").value;
            var size = document.getElementById("size").value;

            var params = {
                busca: searchInput !== "" ? searchInput : null,
                precoMin: priceMin !== "" ? parseFloat(priceMin) : null,
                precoMax: priceMax !== "" ? parseFloat(priceMax) : null,
                marca: brand,
                tamanho: size,
            };

            searchProducts(params);
        });

        var params = getSearchParams();
        if (params && Object.keys(params).length > 0) {
            searchProducts(params);
        } else {
            var products = getProductsFromStorage();
            if (products) {
                // Carregar os produtos do localStorage
                renderProducts(products);
            } else {
                // Realizar a requisição inicial para obter os produtos
                fetch("products.json")
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        // Salvar os produtos no localStorage
                        saveProductsToStorage(data);
                        // Exibir todos os produtos
                        renderProducts(data);
                    })
                    .catch(function (error) {
                        console.error("Erro ao carregar os produtos:", error);
                    });
            }
        }
    }

    function renderProducts(products) {
        var searchResultsDiv = document.getElementById("search-results");
        searchResultsDiv.innerHTML = "";

        products.forEach(function (product) {
            var productDiv = document.createElement("div");
            productDiv.classList.add("product-card");
            productDiv.innerHTML = `
            <h2>${product.titulo}</h2>
            <img src="${product.imagem}" alt="${product.titulo}" width="100">
            <p>${product.descricao}</p>
            <p>Marca: ${product.marca}</p>
            <p>Tamanho: ${product.tamanho}</p>
            <p>Preço: R$ ${product.preco.toFixed(2)}</p>
            <button class="add-to-cart-button">Adicionar ao Carrinho</button>
          `;
            searchResultsDiv.appendChild(productDiv);

            var addToCartButton = productDiv.querySelector(
                ".add-to-cart-button"
            );
            addToCartButton.addEventListener("click", function () {
                addToCart(product);
                window.location.href = "../cart/cart.html";
            });
        });
    }

    initSearch();
});
