import { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row, Table } from 'react-bootstrap';
import CartItem from '../components/CartItem';
import PaymentMethod from '../components/PaymentMethod';
import { hideSpinner, showSpinner, toUSD } from '../services/init';
import { CartObj, Article } from '../types';

function Cart() {
  const [data, setData] = useState<CartObj | null>(null);
  const [shipping, setShipping] = useState<string>('');
  const [validate, setValidate] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const set_cart_info = async () => {
        const result: CartObj = {
          user: 0,
          articles: [],
        };
        const cart: Article[] = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart) result.articles.push(...cart);
        if (result) {
          setData(result);
        }
      };
      showSpinner();
      await set_cart_info();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      } as any);
      hideSpinner();
    };
    fetchData();
  }, []);

  const erase = (id: number) => {
    if (data) {
      const articles = data.articles.filter((el) => el.id !== id);
      localStorage.setItem('cart', JSON.stringify(articles));
      setData({ ...data, articles });
    }
  };

  const update_cart = (id: number, count: number) => {
    if (data) {
      const cart: Article[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const articles = cart.map((el) => {
        if (el.id === id) {
          el.count = count;
        }
        return el;
      });
      localStorage.setItem('cart', JSON.stringify(articles));
      setData({ ...data, articles });
    }
  };

  const subtotal =
    data?.articles
      .map((el) => toUSD(el.unitCost, el.currency) * el.count)
      .reduce((a, b) => a + b, 0) || 0;

  const shipping_json: any = {
    premium: 0.15,
    express: 0.07,
    standard: 0.05,
  };

  let shipping_cost = 0;
  console.log('Shipping', shipping);
  if (shipping) {
    shipping_cost = subtotal * shipping_json[shipping];
  }

  const total = subtotal + shipping_cost;

  const formSubmit = (e: any) => {
    const form = e.target;
    e.preventDefault();
    form.classList.add('was-validated');
    const payment_method_form = document.getElementById('form_payment_method');
    console.log('PAYMENT METHOD FORM', payment_method_form);
    setValidate(true);
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }
  };

  return (
    <main className="pb-5">
      <div className="container">
        <div className="text-center p-4">
          <h2>Carrito de Compras</h2>
        </div>
        <div className="cart_table_items mb-3">
          <h3 className="mb-3">Artículos a comprar.</h3>
          <div className="cart_table">
            {data && (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th className="subtotal_column">Subtotal</th>
                    <th className="erase_column"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.articles.map((el: Article) => {
                    return (
                      <CartItem key={el.id} erase={erase} article={el} update_cart={update_cart} />
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        <Form onSubmit={(c) => formSubmit(c)} noValidate={true} className="needs-validation">
          <div className="cart_shipping_option mb-3">
            <h3 className="mb-3">Tipo de envío</h3>
            <div>
              <Form.Check
                required
                name="shipping_type"
                type="radio"
                onChange={(c) => setShipping(c.target.value)}
                label="Premium 2 a 5 días (15%) "
                value="premium"
                id="premium"
              />
              <Form.Check
                required
                name="shipping_type"
                type="radio"
                onChange={(c) => setShipping(c.target.value)}
                label="Express 5 a 8 días (7%) "
                value="express"
                id="express"
              />
              <Form.Check
                required
                name="shipping_type"
                type="radio"
                onChange={(c) => setShipping(c.target.value)}
                label="Standard 12 a 15 días (5%) "
                id="standard"
                value="standard"
              />
            </div>
          </div>
          <div className="cart_shipping_address mb-3">
            <h3 className="mb-3">Dirección de envío</h3>
            <Row>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control name="street" required type="text" defaultValue="" />
                  <div className="invalid-feedback">Ingresa una calle</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control required name="numbr" type="text" defaultValue="" />
                  <div className="invalid-feedback">Ingresa una número</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Esquina</Form.Label>
                  <Form.Control required name="corner" type="text" defaultValue="" />
                  <div className="invalid-feedback">Ingresa una esquina</div>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <hr className="my-5" />
          <div className="cart_shipping_address mb-3">
            <h3 className="mb-3">Costos</h3>
            <ListGroup>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Subtotal</h5>
                    <p className="text-muted mb-0">Costo unitario del producto por cantidad</p>
                  </div>
                  <div>
                    <h6 className="mb-0">USD {subtotal.toFixed(2)}</h6>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Costo de envío</h5>
                    <p className="text-muted mb-0">
                      Según el tipo de envío ({shipping ? shipping : 'N/A'})
                    </p>
                  </div>
                  <div>
                    <h6 className="mb-0">USD {shipping_cost.toFixed(2)}</h6>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Total ($)</h5>
                    <p className="text-muted mb-0">Costo unitario del producto por cantidad</p>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      <b>USD {total.toFixed(2)}</b>
                    </h6>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <hr className="my-5" />
          <div>
            <h3 className="mb-0">Forma de pago</h3>
            <PaymentMethod validate={validate}></PaymentMethod>
          </div>
          <div className="mb-5">
            <Button type="submit" variant="primary">
              Finalizar Compra
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Cart;
