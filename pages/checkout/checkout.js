document.addEventListener("DOMContentLoaded", function () {
    const formaPagamentoSelect = document.getElementById("forma-pagamento");
    const paymentInfoElements = document.querySelectorAll(".payment-info");

    const fretePrice = 15;

    formaPagamentoSelect.addEventListener("change", function () {
        const selectedOption = formaPagamentoSelect.value;

        paymentInfoElements.forEach(function (element) {
            element.style.display = "none";
        });

        const selectedPaymentInfo = document.getElementById(
            `${selectedOption}-info`
        );
        if (selectedPaymentInfo) {
            selectedPaymentInfo.style.display = "flex";
            selectedPaymentInfo.style.gap = "10px";
        }
    });

    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Implementar o código para finalizar o pedido aqui
    });

    // Função para buscar endereço utilizando a API do ViaCEP
    function buscarEndereco(cep) {
        // Fazer requisição GET para o ViaCEP com o CEP informado
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                // Preencher os campos do formulário com as informações do endereço
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;
                document.getElementById("pais").value = "Brasil";

                const cupomInput = document.getElementById("cupom");
                const cupom = cupomInput.value.trim();

                if (cupom === "PRIMEIROSNKS") {
                    const subtotalPrice = parseFloat(
                        document.getElementById("subtotal-price").textContent
                    );
                    const desconto = (subtotalPrice + fretePrice) * 0.1; // 10% de desconto
                    const totalPrice = subtotalPrice + fretePrice - desconto;
                    document.getElementById("total-price").textContent =
                        totalPrice.toFixed(2);
                    document.getElementById("frete-price").textContent =
                        fretePrice.toFixed(2);
                    document.getElementById("total-price").textContent =
                        totalPrice.toFixed(2);
                } else {
                    const subtotalPrice = parseFloat(
                        document.getElementById("subtotal-price").textContent
                    );
                    const totalPrice = subtotalPrice + fretePrice;
                    document.getElementById("frete-price").textContent =
                        fretePrice.toFixed(2);
                    document.getElementById("total-price").textContent =
                        totalPrice.toFixed(2);
                }
            })
            .catch((error) => {
                console.log("Erro ao buscar endereço:", error);
            });
    }

    // Event listener para o campo de CEP
    const cepInput = document.getElementById("cep");
    cepInput.addEventListener("blur", function () {
        const cep = cepInput.value;
        buscarEndereco(cep);
    });

    // Função para preencher as informações do carrinho
    function preencherInformacoesCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("CART"));
        let summaryHTML = "";
        let totalSummary = 0;

        const summaryInfo = document.querySelector(
            ".summary-info .product-summary"
        );

        if (carrinho) {
            carrinho.forEach(function (item) {
                summaryHTML += `<div class="productResume">${item.descricao} - Tamanho: ${item.tamanho}</div>`;
                totalSummary += item.preco;
            });

            summaryHTML += `<div class="total-price">Total: R$ ${totalSummary.toFixed(
                2
            )}</div>`;
            summaryInfo.innerHTML = summaryHTML;

            document.getElementById("subtotal-price").textContent =
                totalSummary.toFixed(2);
            document.getElementById("total-price").textContent =
                totalSummary.toFixed(2);
        }
    }

    // Função para aplicar o cupom de desconto
    function aplicarCupomDesconto() {
        const cupomInput = document.getElementById("cupom");
        const cupom = cupomInput.value.trim();
        const totalPurchase =
            document.getElementById("total-price").textContent;

        if (cupom === "PRIMEIROSNKS") {
            const desconto = totalPurchase * 0.1; // 10% de desconto
            const totalPrice = totalPurchase - desconto;
            document.getElementById("total-price").textContent =
                totalPrice.toFixed(2);
            alert("Cupom PRIMEIROSNKS, sua compra teve um desconto de 10%");
        } else if (cupom === "") {
        } else {
            alert("Cupom Inválido ou expirado");
            cupomInput.value = "";
        }
    }

    // =============================
    const form = document.getElementById("checkout-form");
    const btForm = document.getElementById("checkout-button");
    let isValid = true;

    const emailTest = document.getElementById("email");
    emailTest.addEventListener("blur", validEmail);

    const cpfTest = document.getElementById("cpf");
    cpfTest.addEventListener("blur", validCpf);

    function validCpf() {
      const cpfInput = document.getElementById("cpf").value;
      isValid = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/.test(cpfInput) == true? true : false;
      if (isValid == true || cpfInput == "") {
        const inputs = form.querySelectorAll('input[id="cpf"]');
        inputs.forEach(function (input) {
          input.nextElementSibling.style.color = 'rgb(255, 250, 240)';
        });
      } else {
        const inputs = form.querySelectorAll('input[id="cpf"]');
        inputs.forEach(function (input) {
          input.nextElementSibling.style.color = 'red';
        });
      }
  }

    function validEmail() {
        const emailInput = document.getElementById("email").value;
        isValid = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/.test(emailInput) == true? true : false;
        if (isValid == true || emailInput == "") {
            const inputs = form.querySelectorAll('input[id="email"]');
            inputs.forEach(function (input) {
              input.nextElementSibling.style.color = 'rgb(255, 250, 240)';
            });
        } else {
          const inputs = form.querySelectorAll('input[id="email"]');
          inputs.forEach(function (input) {
            input.nextElementSibling.style.color = 'red';
          });
        }
    }

    btForm.addEventListener("click", function (event) {
        event.preventDefault();

        if (validateForm() == true) {
          window.location.href = "../finishPurchase/finishPurchase.html";
        }
    });

    function validateForm() {
        isValid == true ? true : false;
        const cepV = document.getElementById("cep").value;
        const logradouroV = document.getElementById("logradouro").value;
        const numeroV = document.getElementById("numero").value;
        const bairroV = document.getElementById("bairro").value;
        const cidadeV = document.getElementById("cidade").value;
        const paisV = document.getElementById("pais").value;
        const emailV = document.getElementById("email").value;
        const nomeV = document.getElementById("nome").value;
        const cpfV = document.getElementById("cpf").value;
        const telefoneV = document.getElementById("telefone").value;

        if (cepV == "" || logradouroV == "" || numeroV == "" || bairroV == "" || cidadeV == "" || 
        paisV == "" || emailV == "" || nomeV == "" || cpfV == "" || telefoneV == "" ){
          alert("Preencha todos os Campos marcados com *");
          isValid = false;
        }
        return isValid;
    }

    // Event listener para aplicar cupom de desconto ao perder o foco do campo
    const cupomInput = document.getElementById("cupom");
    cupomInput.addEventListener("blur", aplicarCupomDesconto);

    preencherInformacoesCarrinho();
});
