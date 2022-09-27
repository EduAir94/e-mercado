import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/ProductInfo/Comments';
import RelatedProduct from '../components/ProductInfo/RelatedProduct';
import { EXT_TYPE, PRODUCT_INFO_COMMENTS_URL, PRODUCT_INFO_URL } from '../services/constants';
import { getJSONData, hideSpinner, showSpinner } from '../services/init';
import { ProductComment, ProductFull } from '../types';

function ProductInfo() {
  const { prodID } = useParams();
  const [data, setData] = useState<ProductFull>();
  const [comments, setComments] = useState<ProductComment[]>([]);

  useEffect(() => {
    const fetchData = async (productId: number) => {
      const set_product_info = async () => {
        const url = `${PRODUCT_INFO_URL}${productId}${EXT_TYPE}`;
        const res = await getJSONData(url, true);
        const result: ProductFull = res.data;
        if (result) {
          return new Promise((resolve) => {
            setTimeout(() => {
              setData(result);
              resolve(true);
            }, 5000);
          });
        }
      };
      // Set Comments.
      const set_comments = async () => {
        const url = `${PRODUCT_INFO_COMMENTS_URL}${productId}${EXT_TYPE}`;
        const res = await getJSONData(url, true);
        const result: ProductComment[] = res.data || [];
        setComments(result);
        return result;
      };
      showSpinner();
      await set_product_info();
      await set_comments();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      } as any);
      hideSpinner();
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

  console.log('RENDER DATA', data);

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
          <Comments comments={comments} productId={data.id} />
        </div>
        <hr className="mt-5 mb-5" />
        <div>
          <h4 className="pb-3">Productos relacionados</h4>
          <div className="products_related">
            <div className="row">
              {data.relatedProducts.map((el) => {
                return (
                  <div key={el.id} className="col-12 col-md-6 col-lg-3 mb-3">
                    <RelatedProduct {...el}></RelatedProduct>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductInfo;
