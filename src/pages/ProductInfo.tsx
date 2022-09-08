import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/ProductInfo/Comments';
import { EXT_TYPE, PRODUCT_INFO_URL } from '../services/constants';
import { getJSONData } from '../services/init';
import { ProductFull } from '../types';

function ProductInfo() {
  const { prodID } = useParams();
  const [data, setData] = useState<ProductFull>();

  useEffect(() => {
    const fetchData = async (productId: number) => {
      const url = `${PRODUCT_INFO_URL}${productId}${EXT_TYPE}`;
      const res = await getJSONData(url);
      const result: ProductFull = res.data;
      if (result) {
        setData(result);
      }
    };

    let productId: number;
    if (prodID) {
      productId = parseInt(prodID) as number;
    } else {
      productId = localStorage.getItem('prodID')
        ? parseInt(localStorage.getItem('prodID') as string)
        : 50741;
    }

    fetchData(productId);
  }, [prodID]);

  if (!data) return <></>;

  const images = () => {
    return data.images.map((image, index) => (
      <div key={index} className="col-12 col-md-6 col-lg-3">
        <img alt="product_image" src={image} className="img-thumbnail" />
      </div>
    ));
  };

  const display = [
    { label: 'Precio', value: data.currency + ' ' + data.cost },
    { label: 'Descripción', value: data.description },
    { label: 'Categoría', value: data.category },
    { label: 'Cantidad de vendidos', value: data.soldCount },
    { label: 'Imagenes ilustrativas', value: <div className="row mt-2">{images()}</div> },
  ];

  const list = () => {
    return display.map(({ label, value }, index) => {
      return (
        <li key={index} className="mb-4">
          <div>
            <strong>{label}</strong>
          </div>
          <div>{value}</div>
        </li>
      );
    });
  };

  return (
    <main>
      <div className="container">
        <div className="pt-4">
          <h2>{data.name}</h2>
        </div>
        <hr />
        <div className="product_info_content">
          <ul className="list-unstyled">{list()}</ul>
        </div>
        <div className="product_comments">
          <Comments productId={data.id} />
        </div>
      </div>
    </main>
  );
}

export default ProductInfo;
