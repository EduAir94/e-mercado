import { RouteInterface } from '../../routes/types';
import { withRouter } from '../../routes/WithRouter';
import { Product } from '../../types';

function ProductItem({ product, router }: { product: Product; router: RouteInterface }) {
  const { image, name, description, soldCount, cost, currency, id } = product;
  const { html_name, html_description } = product;
  const textTitle = `${html_name ? html_name : name} - ${currency} ${cost}`;
  const textDescription = html_description ? html_description : description;

  const goToProduct = () => {
    router.navigate('/product-info/' + id);
  };

  return (
    <div onClick={goToProduct} className="list-group-item list-group-item-action">
      <div className="row">
        <div className="col-3">
          <img alt="product_image" src={'/' + image} className="img-thumbnail" />
        </div>
        <div className="col">
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-1">
              <h4 dangerouslySetInnerHTML={{ __html: textTitle.replace(/\n/g, '<br />') }}></h4>
              <p dangerouslySetInnerHTML={{ __html: textDescription.replace(/\n/g, '<br />') }}></p>
            </div>
            <small className="text-muted">{soldCount} vendidos</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProductItem);
