import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Article } from '../types';

const CartItem = (item: { article: Article }) => {
  const update_cart = (item: Article) => {
    const cart: Article[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const new_cart = cart.map((el) => {
      if (el.id === item.id) {
        el.count = item.count;
      }
      return el;
    });
    localStorage.setItem('cart', JSON.stringify(new_cart));
  };

  const [el, setEl] = useState<Article>(item.article);
  const total = el.unitCost * el.count;
  return (
    <tr key={el.id}>
      <td>
        <Link to={'/product-info/' + el.id}>
          <img width="100" src={el.image}></img>
        </Link>
      </td>
      <td>
        <Link className="no_link" to={'/product-info/' + el.id}>
          {el.name}
        </Link>
      </td>
      <td>
        {el.currency} {el.unitCost}
      </td>
      <td>
        <div className="pe-3">
          <Form.Control
            min="1"
            onChange={(c) => {
              let val = parseInt(c.target.value);
              if (isNaN(val)) return;
              if (val < 1) {
                c.target.value = '1';
                val = 1;
              }
              const new_el = { ...el, count: val };
              update_cart(new_el);
              setEl(new_el);
            }}
            defaultValue={el.count}
            as="input"
            type="number"
            placeholder="Cant."
          />
        </div>
      </td>
      <td>
        <b>
          {el.currency} {total}
        </b>
      </td>
    </tr>
  );
};

export default CartItem;
