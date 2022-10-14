import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Carrousel from '../components/ProductInfo/Carrousel';
import Comments from '../components/ProductInfo/Comments';
import RelatedProduct from '../components/ProductInfo/RelatedProduct';
import { RouteInterface } from '../routes/types';
import { withRouter } from '../routes/WithRouter';
import { EXT_TYPE, PRODUCT_INFO_COMMENTS_URL, PRODUCT_INFO_URL } from '../services/constants';
import { getJSONData, hideSpinner, showSpinner } from '../services/init';
import { ProductComment, ProductFull, Article } from '../types';

function ProductInfo({ router }: { router: RouteInterface }) {
  const carrousel = useRef();
  const { prodID } = useParams();
  const [data, setData] = useState<ProductFull>();
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async (productId: number) => {
      const set_product_info = async () => {
        const url = `${PRODUCT_INFO_URL}${productId}${EXT_TYPE}`;
        const res = await getJSONData(url, true);
        const result: ProductFull = res.data;
        if (result) {
          setData(result);
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

  const selectImage = (index: number) => {
    if (carrousel.current) {
      (carrousel.current as any).changeImage(index);
    }
  };

  const images = () => {
    return data.images.map((image, index) => (
      <div role="button" key={index} className={'col-3'} onClick={() => selectImage(index)}>
        <img
          alt="product_image"
          src={image}
          className={
            'img-thumbnail' + (index === activeIndex ? ' border border-primary border-4' : '')
          }
        />
      </div>
    ));
  };

  const display = [
    { label: 'Precio', value: data.currency + ' ' + data.cost },
    { label: 'Descripción', value: data.description },
    { label: 'Categoría', value: data.category },
    { label: 'Cantidad de vendidos', value: data.soldCount },
    {
      label: 'Imagenes ilustrativas',
      value: (
        <div className="mt-2">
          <Carrousel
            setActiveIndex={setActiveIndex}
            ref={carrousel}
            images={data.images}
          ></Carrousel>
          <div className="row gx-0 gx-md-4 mt-2">{images()}</div>
        </div>
      ),
    },
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

  const comprar = () => {
    let cart: Article[] = JSON.parse(localStorage.getItem('cart') || '[]');
    let hasElement = false;
    if (cart.length) {
      cart = cart.map((el) => {
        if (el.id === data.id) {
          hasElement = true;
          el.count++;
        }
        return el;
      });
    }
    if (!hasElement) {
      cart.push({
        id: data.id,
        name: data.name,
        count: 1,
        unitCost: data.cost,
        currency: data.currency,
        image: data.images[0],
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    router.navigate('/cart');
  };

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between w-100 align-items-center pt-4">
          <div>
            <h2>{data.name}</h2>
          </div>
          <Button onClick={comprar} variant="success">
            Comprar
          </Button>
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

export default withRouter(ProductInfo);
