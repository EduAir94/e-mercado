const { useEffect, useState } = React;

/**
 * Product Component.
 * @param {*} props
 * @returns
 */
function Product(props) {
  const { product } = props;
  const {
    image, name, description, soldCount, cost, currency,
  } = product;
  return (
    <div className="list-group-item list-group-item-action">
      <div className="row">
        <div className="col-3">
          <img alt="product_image" src={image} className="img-thumbnail" />
        </div>
        <div className="col">
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-1">
              <h4>
                {name}
                {' '}
                {' '}
                -
                {' '}
                {currency}
                {' '}
                {cost}
              </h4>
              <p>{description}</p>
            </div>
            <small className="text-muted">
              {soldCount}
              {' '}
              vendidos
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.element.isRequired,
};

class Sort extends React.Component {
  constructor({ handleChange, count }) {
    super();
    this.state = '';
    this.handleChange = handleChange;
    this.data = [
      {
        id: 'sortAsc',
        content: 'A-Z',
        exec: (a, b) => a.name.localeCompare(b.name),
      },
      {
        id: 'sortDesc',
        content: 'Z-A',
        exec: (a, b) => b.name.localeCompare(a.name),
      },
      {
        id: 'sortByCount',
        content: (<i className="fas fa-sort-amount-down mr-1" />),
        exec: (a, b) => a[count] - b[count],
      },
    ];
  }

  setValue(event) {
    this.state = event.target.value;
    this.handleChange(this.data.find((el) => el.id === this.state).exec);
  }

  render() {
    return (
      <div className="col text-end">
        <div
          onChange={this.setValue.bind(this)}
          className="btn-group btn-group-toggle mb-4"
          data-bs-toggle="buttons"
        >
          {this.data.map(({ id, content }) => (
            <div>
              <input
                type="radio"
                className="btn-check"
                value={id}
                name="options"
                id={id}
              />
              <label className="btn btn-light" htmlFor={id}>
                {content}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Sort.propTypes = {
  handleChange: PropTypes.element.isRequired,
};

function Filter() {
  return (
    <div className="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
      <div className="row container p-0 m-0">
        <div className="col">
          <p className="font-weight-normal text-end my-2">Cant.</p>
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            placeholder="min."
            id="rangeFilterCountMin"
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            placeholder="máx."
            id="rangeFilterCountMax"
          />
        </div>
        <div className="col-3 p-0">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-light btn-block" id="rangeFilterCount">
              Filtrar
            </button>
            <button type="button" className="btn btn-link btn-sm" id="clearRangeFilter">
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReactApp() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async (categoryId) => {
      const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
      const res = await getJSONData(url);
      const result = res.data;
      if (result) {
        setData(result);
      }
    };
    const categoryId = localStorage.getItem('catID')
      ? localStorage.getItem('catID')
      : 101;
    fetchData(categoryId);
  }, []);

  const handleChange = (sort) => {
    if (data) {
      data.products.sort(sort);
      setData({ products: data.products });
    }
  };

  const renderProducts = (products) => products.map((product) => (
    <Product key={product.id} product={product} />
  ));

  if (data) {
    return (
      <div>
        <div className="text-center p-4">
          <h2>Productos</h2>
          <p className="lead">
            Verás aquí todos los productos de la categoría
            {' '}
            {data.catName}
            .
          </p>
        </div>
        <div className="container">
          <div className="row">
            <Sort handleChange={handleChange} />
          </div>
          <div className="row">
            <Filter />
          </div>
          <div id="product-list">{renderProducts(data.products)}</div>
        </div>
      </div>
    );
  }
  return <div />;
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));
