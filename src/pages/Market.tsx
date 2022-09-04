import { Link } from 'react-router-dom';
import { RouteInterface } from '../routes/types';
import { withRouter } from '../routes/WithRouter';

function Market({ router }: { router: RouteInterface }) {
  const navigateCategory = (categoryId: number) => {
    localStorage.setItem('catID', categoryId.toString());
    router.navigate(`/products/${categoryId}`);
  };

  return (
    <main>
      <div className="jumbotron text-center"></div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div
                onClick={() => navigateCategory(101)}
                className="card mb-4 shadow-sm custom-card cursor-active"
                id="autos"
              >
                <img
                  className="bd-placeholder-img card-img-top"
                  src="img/cars_index.jpg"
                  alt="Imgagen representativa de la categoría 'Autos'"
                ></img>
                <h3 className="m-3">Autos</h3>
                <div className="card-body">
                  <p className="card-text">
                    Los mejores precios en autos 0 kilómetro, de alta y media gama.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                onClick={() => navigateCategory(102)}
                className="card mb-4 shadow-sm custom-card cursor-active"
                id="juguetes"
              >
                <img
                  className="bd-placeholder-img card-img-top"
                  src="img/toys_index.jpg"
                  alt="Imgagen representativa de la categoría 'Juguetes'"
                ></img>
                <h3 className="m-3">Juguetes</h3>
                <div className="card-body">
                  <p className="card-text">
                    Encuentra aquí los mejores precios para niños/as de cualquier edad.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                onClick={() => navigateCategory(103)}
                className="card mb-4 shadow-sm custom-card cursor-active"
                id="muebles"
              >
                <img
                  className="bd-placeholder-img card-img-top"
                  src="img/furniture_index.jpg"
                  alt="Imgagen representativa de la categoría 'Muebles'"
                ></img>
                <h3 className="m-3">Muebles</h3>
                <div className="card-body">
                  <p className="card-text">
                    Muebles antiguos, nuevos y para ser armados por uno mismo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Link className="btn btn-light btn-lg btn-block" to="/categories">
              Y mucho más!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withRouter(Market);
