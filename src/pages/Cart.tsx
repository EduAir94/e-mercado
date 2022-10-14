import { useEffect, useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import CartItem from '../components/CartItem';
import { CART_INFO_URL, EXT_TYPE } from '../services/constants';
import { getJSONData, hideSpinner, showSpinner } from '../services/init';
import { CartObj, Article } from '../types';

function Cart() {
  const [data, setData] = useState<CartObj | null>(null);

  useEffect(() => {
    const fetchData = async (userId: number) => {
      const set_cart_info = async () => {
        const url = `${CART_INFO_URL}${userId}${EXT_TYPE}`;
        const res = await getJSONData(url, true);
        const result: CartObj = res.data;
        console.log('RESULT', result);
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

    const userId = 25801;

    fetchData(userId);
  }, []);

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
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.articles.map((el: Article) => {
                    return <CartItem key={el.id} article={el} />;
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        <div className="cart_shipping_option mb-3">
          <h3 className="mb-3">Tipo de envío</h3>
          <div>
            <Form.Check
              name="shipping_type"
              type="radio"
              label="Premium 2 a 5 días (15%) "
              value="premium"
              id="premium"
            />
            <Form.Check
              name="shipping_type"
              type="radio"
              label="Express 5 a 8 días (7%) "
              value="express"
              id="express"
            />
            <Form.Check
              name="shipping_type"
              type="radio"
              label="Standard 12 a 15 días (5%) "
              id="standard"
            />
          </div>
        </div>
        <div className="cart_shipping_address mb-3">
          <h3 className="mb-3">Dirección de envío</h3>
          <Form>
            <Row>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Esquina</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default Cart;
