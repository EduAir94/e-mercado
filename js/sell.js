/* eslint-disable func-names */
/* eslint-disable no-undef */
let productCost = 0;
// eslint-disable-next-line no-unused-vars
let productCount = 0;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = '$';
const DOLLAR_CURRENCY = 'Dólares (USD)';
const PESO_CURRENCY = 'Pesos Uruguayos (UYU)';
const DOLLAR_SYMBOL = 'USD ';
const PESO_SYMBOL = 'UYU ';
const PERCENTAGE_SYMBOL = '%';
const MSG = 'FUNCIONALIDAD NO IMPLEMENTADA';

// Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {
  const unitProductCostHTML = document.getElementById('productCostText');
  const comissionCostHTML = document.getElementById('comissionText');
  const totalCostHTML = document.getElementById('totalCostText');

  const unitCostToShow = MONEY_SYMBOL + productCost;
  const comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
  const totalCostToShow = MONEY_SYMBOL
  + ((Math.round(productCost * comissionPercentage * 100) / 100) + parseInt(productCost, 10));

  unitProductCostHTML.innerHTML = unitCostToShow;
  comissionCostHTML.innerHTML = comissionToShow;
  totalCostHTML.innerHTML = totalCostToShow;
}

// Función que se ejecuta una vez que se haya lanzado el evento de
// que el documento se encuentra cargado, es decir, se encuentran todos los
// elementos HTML presentes.
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('productCountInput').addEventListener('change', function () {
    productCount = this.value;
    updateTotalCosts();
  });

  document.getElementById('productCostInput').addEventListener('change', function () {
    productCost = this.value;
    updateTotalCosts();
  });

  document.getElementById('goldradio').addEventListener('change', () => {
    comissionPercentage = 0.13;
    updateTotalCosts();
  });

  document.getElementById('premiumradio').addEventListener('change', () => {
    comissionPercentage = 0.07;
    updateTotalCosts();
  });

  document.getElementById('standardradio').addEventListener('change', () => {
    comissionPercentage = 0.03;
    updateTotalCosts();
  });

  document.getElementById('productCurrency').addEventListener('change', function () {
    if (this.value === DOLLAR_CURRENCY) {
      MONEY_SYMBOL = DOLLAR_SYMBOL;
    } else if (this.value === PESO_CURRENCY) {
      MONEY_SYMBOL = PESO_SYMBOL;
    }

    updateTotalCosts();
  });

  // Configuraciones para el elemento que sube archivos
  const dzoptions = {
    url: '/',
    autoQueue: false,
  };
  // eslint-disable-next-line no-unused-vars
  const myDropzone = new Dropzone('div#file-upload', dzoptions);

  // Se obtiene el formulario de publicación de producto
  const sellForm = document.getElementById('sell-info');

  // Se agrega una escucha en el evento 'submit' que será
  // lanzado por el formulario cuando se seleccione 'Vender'.
  // eslint-disable-next-line no-shadow
  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.preventDefault();

    const productNameInput = document.getElementById('productName');
    const productCategory = document.getElementById('productCategory');
    // eslint-disable-next-line no-shadow
    const productCost = document.getElementById('productCostInput');
    let infoMissing = false;

    // Quito las clases que marcan como inválidos
    productNameInput.classList.remove('is-invalid');
    productCategory.classList.remove('is-invalid');
    productCost.classList.remove('is-invalid');

    // Se realizan los controles necesarios,
    // En este caso se controla que se haya ingresado el nombre y categoría.
    // Consulto por el nombre del producto
    if (productNameInput.value === '') {
      productNameInput.classList.add('is-invalid');
      infoMissing = true;
    }

    // Consulto por la categoría del producto
    if (productCategory.value === '') {
      productCategory.classList.add('is-invalid');
      infoMissing = true;
    }

    // Consulto por el costo
    if (productCost.value <= 0) {
      productCost.classList.add('is-invalid');
      infoMissing = true;
    }

    if (!infoMissing) {
      // Aquí ingresa si pasó los controles, irá a enviar
      // la solicitud para crear la publicación.

      getJSONData(PUBLISH_PRODUCT_URL).then((resultObj) => {
        const msgToShowHTML = document.getElementById('resultSpan');
        let msgToShow = '';

        // Si la publicación fue exitosa, devolverá mensaje de éxito,
        // de lo contrario, devolverá mensaje de error.
        // FUNCIONALIDAD NO IMPLEMENTADA
        if (resultObj.status === 'ok') {
          msgToShow = MSG;
          document.getElementById('alertResult').classList.add('alert-primary');
        } else if (resultObj.status === 'error') {
          msgToShow = MSG;
          document.getElementById('alertResult').classList.add('alert-primary');
        }

        msgToShowHTML.innerHTML = msgToShow;
        document.getElementById('alertResult').classList.add('show');
      });
    }
  });
});
