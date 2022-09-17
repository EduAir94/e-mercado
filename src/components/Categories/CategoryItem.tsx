import { RouteInterface } from '../../routes/types';
import { withRouter } from '../../routes/WithRouter';
import { Category } from '../../types';

function CategoryItem({ item, router }: { item: Category; router: RouteInterface }) {
  const category = item;

  const navigateCategory = (categoryId: number) => {
    localStorage.setItem('catID', categoryId.toString());
    router.navigate(`/products/${categoryId}`);
  };
  return (
    <div
      onClick={() => navigateCategory(category.id)}
      className="list-group-item list-group-item-action cursor-active"
    >
      <div className="row">
        <div className="col-12 col-md-3 pb-2 pb-md-0">
          <img src={category.imgSrc} alt={category.description} className="img-thumbnail"></img>
        </div>
        <div className="col">
          <div className="d-flex w-100 justify-content-between">
            <h4 className="mb-1">{category.name}</h4>
            <small className="text-muted">{category.productCount} artículos</small>
          </div>
          <p className="mb-1">{category.description}</p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CategoryItem);
