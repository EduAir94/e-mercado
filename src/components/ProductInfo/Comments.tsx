import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ProductComment } from '../../types';
import CommentItem from './CommentItem';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import AuthService from '../../services/authService';
import commentStorage from '../../services/comentStorage';

function Comments({ comments, productId }: { comments: ProductComment[]; productId: number }) {
  const [data, setData] = useState<ProductComment[]>();

  useEffect(() => {
    setData([...comments, ...commentStorage.get(productId)]);
  }, [productId]);

  const date = () => {
    const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ');
    return datetime;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const user = AuthService.user();
    const comment = {
      product: productId,
      score: parseInt(formData.get('score') as string, 10),
      description: formData.get('comment') as string,
      user: user.email,
      dateTime: date(),
    };
    commentStorage.save(productId, comment);
    const newData = [...(data || []), comment];
    setData(newData);
    target.reset();
  };

  return (
    <div className="mt-3">
      <h4 className="mb-2">Comentarios</h4>
      <div className="list-group">
        {data && data.map((item, index) => <CommentItem key={index} {...item}></CommentItem>)}
      </div>
      <div className="mt-3">
        <Form onSubmit={handleSubmit}>
          <h4 className="mb-2">Comentar</h4>
          <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>Tu opinión:</Form.Label>
            <Form.Control required as="textarea" name="comment" type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicScore">
            <Form.Label>Tu puntuación:</Form.Label>
            <Form.Select name="score" className="score_select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
}

Comments.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Comments;
