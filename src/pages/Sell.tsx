import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

declare let Dropzone: any;
function Sell() {
  useEffect(() => {
    const dzoptions = {
      url: '/',
      autoQueue: false,
    };
    const element = document.querySelector('div#file-upload');
    console.log('ELEMENT', element);
    new Dropzone('div#file-upload', dzoptions);
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main>
      <div className="container">
        <div className="text-center p-4">
          <h2>Vender</h2>
          <p className="lead">Ingresa los datos del artículo a vender.</p>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Información del producto</h4>
            <form className="needs-validation" id="sell-info">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="productName">Nombre</label>
                  <input
                    onChange={(c) => console.log(c)}
                    type="text"
                    className="form-control"
                    id="productName"
                    value=""
                    name="productName"
                  ></input>
                  <div className="invalid-feedback">Ingresa un nombre</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 order-md-1">
                  <label>Imágenes</label>
                  <div className="needsclick dz-clickable" id="file-upload">
                    <div className="dz-message needsclick">
                      Arrastra tus fotos aquí
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="productDescription">Descripción</label>
                  <textarea
                    name="productDescription"
                    className="form-control"
                    id="productDescription"
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="productCostInput">Costo</label>
                  <input
                    onChange={(c) => console.log(c)}
                    type="number"
                    name="productCostInput"
                    className="form-control"
                    id="productCostInput"
                    placeholder=""
                    required
                    value="0"
                    min="0"
                  ></input>
                  <div className="invalid-feedback">El costo debe ser mayor que 0.</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="productCurrency">Moneda</label>
                  <select
                    defaultValue={''}
                    onChange={(c) => console.log(c)}
                    name="productCurrency"
                    className="form-select custom-select d-block w-100"
                    id="productCurrency"
                    required
                  >
                    <option value="" hidden>
                      Seleccionar moneda
                    </option>
                    <option>Pesos Uruguayos (UYU)</option>
                    <option>Dólares (USD)</option>
                  </select>
                  <div className="invalid-feedback">Ingresa una categoría válida.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7 mb-3">
                  <label htmlFor="productCategory">Categoría</label>
                  <select
                    defaultValue={''}
                    onChange={(c) => console.log(c)}
                    name="productCategory"
                    className="custom-select form-select d-block w-100"
                    id="productCategory"
                  >
                    <option value="">Elija la categoría...</option>
                    <option>Autos</option>
                    <option>Juguetes</option>
                    <option>Muebles</option>
                    <option>Herramientas</option>
                    <option>Computadoras</option>
                    <option>Vestimenta</option>
                  </select>
                  <div className="invalid-feedback">Por favor ingresa una categoría válida.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="productCountInput">Cantidad en stock</label>
                  <input
                    onChange={(c) => console.log(c)}
                    type="number"
                    name="productCountInput"
                    className="form-control"
                    id="productCountInput"
                    required
                    value="1"
                    min="0"
                  ></input>
                  <div className="invalid-feedback">La cantidad es requerida.</div>
                </div>
              </div>
              <hr className="mb-4"></hr>
              <h5 className="mb-3">Tipo de publicación</h5>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    onChange={(c) => console.log(c)}
                    id="goldradio"
                    name="publicationType"
                    type="radio"
                    className="custom-control-input"
                    checked
                    required
                  ></input>
                  <label className="custom-control-label" htmlFor="goldradio">
                    Gold (13%)
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="premiumradio"
                    name="publicationType"
                    type="radio"
                    className="custom-control-input"
                    required
                  ></input>
                  <label className="custom-control-label" htmlFor="premiumradio">
                    Premium (7%)
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="standardradio"
                    name="publicationType"
                    type="radio"
                    className="custom-control-input"
                    required
                  ></input>
                  <label className="custom-control-label" htmlFor="standardradio">
                    Estándar (3%)
                  </label>
                </div>
                <div className="row">
                  <Button variant="link" className="m-1" onClick={handleShow}>
                    Ver condiciones
                  </Button>
                </div>
              </div>
              <hr className="mb-4"></hr>
              <h4 className="mb-3">Costos</h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Precio</h6>
                    <small className="text-muted">Unitario del producto</small>
                  </div>
                  <span className="text-muted" id="productCostText">
                    -
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Porcentaje</h6>
                    <small className="text-muted">Según el tipo de publicación</small>
                  </div>
                  <span className="text-muted" id="comissionText">
                    -
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total ($)</span>
                  <strong id="totalCostText">-</strong>
                </li>
              </ul>
              <hr className="mb-4"></hr>
              <button className="btn btn-primary btn-lg" type="submit">
                Vender
              </button>
            </form>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Condiciones de publicación</h5>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <h5 className="text-warning">Gold (13%)</h5>
                  <p className="muted text-justify">
                    Tu producto se verá de forma promocionada en portada, además de las condiciones
                    de Premium y Estándar.
                  </p>
                </div>
                <hr />
                <div className="row">
                  <h5 className="text-primary">Premium (7%)</h5>
                  <p className="muted text-justify">
                    Se mostrará el producto en los primeros lugares de resultados de búsqueda, así
                    cómo cuando se ingrese a la categoría que pertenezca.
                  </p>
                </div>
                <hr />
                <div className="row">
                  <h5 className="text-secondary">Estándar (3%)</h5>
                  <p className="muted text-justify">
                    El producto se listará en la categoría correspondiente, así como en los
                    resultados de búsquedas que coincidan con las palabras claves en el nombre.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="primary" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}

export default Sell;
