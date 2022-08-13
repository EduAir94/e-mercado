const { useEffect, useState } = React;

const Product = (props) => {
  const { image, name, description, soldCount } = props.product;
  return (
    <div class="list-group-item list-group-item-action">
      <div class="row">
        <div class="col-3">
          <img src={image} alt="product image" class="img-thumbnail"></img>
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
              <h4>{name}</h4>
              <p>{description}</p>
            </div>
            <small class="text-muted">{soldCount} vendidos</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReactApp = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async (category_id) => {
      const url = `https://japceibal.github.io/emercado-api/cats_products/${category_id}.json`;
      const result = await fetch(url)
        .then((response) => response.json())
        .catch((e) => null);
      setData(result);
    };
    fetchData(101);
  });

  const render_products = () =>
    data.products.map((product) => (
      <Product key={product.id} product={product} />
    ));

  return (
    <div>
      <div class="text-center p-4">
        <h2>Productos</h2>
        <p class="lead">
          Verás aquí todos los productos de la categoría Autos.
        </p>
      </div>
      <div class="container">
        <div id="product-list">{data && render_products()}</div>
      </div>
    </div>
  );
};

ReactDOM.render(<ReactApp />, document.getElementById("root"));
