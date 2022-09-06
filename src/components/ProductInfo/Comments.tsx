import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { EXT_TYPE, PRODUCT_INFO_COMMENTS_URL } from '../../services/constants';
import { getJSONData } from '../../services/init';
import { ProductComment } from '../../types';
import CommentItem from './CommentItem';

function Comments({ productId }: { productId: number }) {
  const [data, setData] = useState<ProductComment[]>();

  useEffect(() => {
    const fetchData = async (productId: number) => {
      const url = `${PRODUCT_INFO_COMMENTS_URL}${productId}${EXT_TYPE}`;
      const res = await getJSONData(url);
      const result: ProductComment[] = res.data;
      if (result) {
        setData(result);
      }
    };
    fetchData(productId);
  }, []);

  return (
    <div className="mt-3">
      <h4 className="mb-2">Comentarios</h4>
      <div className="list-group">
        {data && data.map((item, index) => <CommentItem key={index} {...item}></CommentItem>)}
      </div>
    </div>
  );
}

Comments.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Comments;
