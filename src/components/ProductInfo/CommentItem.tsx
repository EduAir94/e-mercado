import PropTypes from 'prop-types';
import { ProductComment } from '../../types';
import Rating from '../Rating';

const CommentItem = (item: ProductComment) => {
  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center">
        <strong>{item.user}</strong>
        <span className="mx-1">-</span>
        {item.dateTime}
        <span className="mx-1">-</span>
        <Rating score={item.score}></Rating>
      </div>
      <div>{item.description}</div>
    </li>
  );
};

CommentItem.propTypes = {
  product: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default CommentItem;
