import { withRouter } from '../../routes/WithRouter';
import { RouteInterface } from '../../routes/types';

const RelatedProduct = ({
  id,
  image,
  name,
  router,
}: {
  id: number;
  image: string;
  name: string;
  router: RouteInterface;
}) => {
  const goToProduct = () => {
    localStorage.setItem('prodID', id.toString());
    router.navigate('/product-info/' + id);
  };

  return (
    <div onClick={goToProduct} className="card cursor-active">
      <img className="card-img-top" src={image} alt={name}></img>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  );
};

export default withRouter(RelatedProduct);
