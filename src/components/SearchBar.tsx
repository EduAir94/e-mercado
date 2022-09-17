import { useEffect, useState } from 'react';
import { CATEGORIES_URL, EXT_TYPE, PRODUCTS_URL } from '../services/constants';
import { getJSONData } from '../services/init';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';
import { Product } from '../types';
import { TypeaheadMenuProps } from 'react-bootstrap-typeahead/types/components/TypeaheadMenu';
import { withRouter } from '../routes/WithRouter';
import { RouteInterface } from '../routes/types';

function SearchBar({ router }: { router: RouteInterface }) {
  const [data, setData] = useState<Product[]>();

  const product_render = (option: Product, pr: TypeaheadMenuProps) => {
    const { text } = pr;
    const { image, name, description, soldCount, id } = option;
    return (
      <div key={id} className="list-group-item list-group-item-action">
        <div className="row m-0">
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <img alt="product_image" src={'/' + image} className="img-thumbnail" />
          </div>
          <div className="col-12 col-md-9">
            <div className="d-flex w-100 justify-content-between flex-wrap">
              <div className="mb-2 mb-md-0">
                <h4>
                  <Highlighter search={text}>{name}</Highlighter>
                </h4>
                <p className="text-wrap mb-0">
                  <Highlighter search={text}>{description}</Highlighter>
                </p>
              </div>
              <small className="text-muted">{soldCount} vendidos</small>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${CATEGORIES_URL}`;
      const res = await getJSONData(url);
      const result = res.data;
      const products = [];
      for (const { id } of result) {
        const url = `${PRODUCTS_URL}${id}${EXT_TYPE}`;
        const { data } = await getJSONData(url);
        products.push(...data.products);
      }
      console.log('REsult navbar', products);
      setData(products);
    };
    fetchData();
  }, []);

  if (!data) return <></>;

  const options = data;
  let typeahead: any;

  const onChange = (selected: Product[]) => {
    if (selected.length === 0) return;
    const { id } = selected[0] as any;
    const url = '/product-info/' + id;
    const nav = router.navigate(url);
    typeahead.clear();
    console.log('Selected', nav, url);
  };

  return (
    <div className="search-bar w-100 row m-0 pb-2 pt-0 gx-0">
      <div className="col-md-12 col-lg-3 d-flex align-items-center">
        <h1 className="font-weight-bold text-white">e-mercado</h1>
      </div>
      <div className="col-md-12 col-lg-5 d-flex align-items-center">
        <Typeahead
          onKeyDown={(e) => {
            const isValid = e.key === 'Enter' || e.key === 'Tab';
            if (isValid && typeahead) {
              const items = typeahead.items;
              if (items.length) {
                onChange(items);
              }
            }
          }}
          emptyLabel={<div className="text-muted p-3">No se han encontrado productos</div>}
          filterBy={['name', 'description']}
          id="nav_search_bar"
          className="nav_search"
          ref={(ref) => (typeahead = ref)}
          options={options}
          labelKey="name"
          onChange={(selected) => onChange(selected as any)}
          paginate={false}
          placeholder="Buscar producto..."
          renderMenuItemChildren={(option, props) => {
            return product_render(option as any, props);
          }}
        />
      </div>
      <div className="d-md-none col-lg-3"></div>
    </div>
  );
}

export default withRouter(SearchBar);
