function Footer() {
  const scrollTop = function (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-end">
          <a onClick={(e) => scrollTop(e)} href="#">
            Volver arriba
          </a>
        </p>
        <p>
          Este sitio forma parte de
          <a href="https://jovenesaprogramar.edu.uy/" target="_blank" rel="noreferrer">
            Jovenes a Programar
          </a>
          - 2022
        </p>
        <p>
          Clickea{' '}
          <a target="_blank" href="Letra.pdf">
            aquí
          </a>{' '}
          para descargar la letra del obligatorio.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
