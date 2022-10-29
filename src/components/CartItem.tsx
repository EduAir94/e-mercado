import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toUSD } from '../services/init';
import { Article } from '../types';

const CartItem = (item: { article: Article; erase: any; update_cart: any }) => {
  const erase = item.erase;
  const update_cart = item.update_cart;
  const el = item.article;
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
        {el.currency} {toUSD(el.unitCost, el.currency)}
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
              update_cart(el.id, val);
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
          {el.currency} {toUSD(total, el.currency)}
        </b>
      </td>
      <td>
        <Button onClick={() => erase(el.id)} variant="outline-danger">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
