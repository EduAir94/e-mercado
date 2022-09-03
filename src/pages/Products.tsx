import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import ProductItem from '../components/Products/ProductItem';
import Sort from '../components/Sort';
import { EXT_TYPE, PRODUCTS_URL } from '../services/constants';
import { getJSONData } from '../services/init';
import { FilterData, Product, SortData } from '../types';

function Products() {
  const { catID } = useParams();
  const [data, setData] = useState<{ items: Product[]; catName?: string }>({
    items: [],
    catName: '',
  });
  const [filter, setFilter] = useState<{ filter: FilterData['exec'] | undefined }>({
    filter: undefined,
  });
  const stateRef: any = useRef();
  stateRef.current = { items: data.items, filter: filter.filter };

  useEffect(() => {
    const fetchData = async (categoryId: number) => {
      const url = `${PRODUCTS_URL}${categoryId}${EXT_TYPE}`;
      const res = await getJSONData(url);
      const result = res.data;
      if (result) {
        setData({ items: result.products, catName: result.catName });
      }
    };
    let categoryId: number;
    if (catID) {
      categoryId = parseInt(catID) as number;
    } else {
      categoryId = localStorage.getItem('catID')
        ? parseInt(localStorage.getItem('catID') as string)
        : 101;
    }
    if (categoryId) {
      fetchData(categoryId);
    }
  }, []);

  const handleSort = (exec: SortData['exec']) => {
    const { items } = stateRef.current;
    setData({ items: items.sort(exec) });
  };

  const handleFilter = (exec: FilterData['exec']) => {
    setFilter({ filter: exec });
  };

  const filterList = () => {
    const { items, filter } = stateRef.current;
    if (filter) {
      return items.filter(filter);
    }
    return items;
  };

  const list = (products: Product[]) =>
    products.map((product) => <ProductItem key={product.id} product={product} />);

  if (data && data.items.length) {
    return (
      <div>
        <div className="text-center p-4">
          <h2>Productos</h2>
          <p className="lead">Verás aquí todos los productos de la categoría {data.catName}.</p>
        </div>
        <div className="container">
          <div className="row">
            <Sort count="soldCount" sort="cost" type="numeric" handleSort={handleSort} />
          </div>
          <div className="row">
            <Filter label="Precio" count="cost" handleFilter={handleFilter} />
          </div>
          <div id="product-list">{list(filterList())}</div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default Products;
