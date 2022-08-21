/* eslint-disable jsx-a11y/label-has-associated-control */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.showHidePass = this.showHidePass.bind(this);

    // eslint-disable-next-line no-undef
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: '305807321503-rqapibjl40pakon4rr586u07c8iucpot.apps.googleusercontent.com',
      scope: 'openid',
      ux_mode: 'popup',
      response_type: 'id_token token',
      callback: this.googleLogin,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value.trim(),
    });
  }

  handleSubmit(event) {
    const form = this.loginForm;
    const { email } = this.state;
    this.setState({
      validatedForm: true,
    });
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    localStorage.setItem('email', email);
    event.preventDefault();
    // window.location.href = '/market.html';
  }

  googleLogin = async (response) => {
    let responsePayload;
    if (response.access_token) {
      const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${
        response.access_token}`;
      responsePayload = await fetch(url).then((res) => res.json());
    }
    const { email } = responsePayload;
    this.setState({
      email,
    });
    localStorage.setItem('email', email);
    window.location.href = '/market.html';
  };

  loginWithGoogle(e) {
    this.client.requestAccessToken();
    e.preventDefault();
  }

  showHidePass() {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  }

  render() {
    const {
      email, password, validatedForm, showPassword,
    } = this.state;
    const formClass = validatedForm ? 'was-validated' : '';
    const showPassClass = showPassword ? 'bi-eye' : 'bi-eye-slash';
    const passType = showPassword ? 'text' : 'password';
    return (
      <form
        onSubmit={this.handleSubmit}
        id="login"
        ref={(c) => { this.loginForm = c; }}
        className={formClass}
        noValidate
      >
        <img
          className="w-100 h-auto"
          src="./img/login.png"
          alt="Login"
        />
        <h1 className="fs-3 fw-bold">Inicio de sesión</h1>
        <div>
          <div className="form-group mt-3">
            <label className="mb-0" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={this.handleChange}
              autoComplete="username"
              type="email"
              required
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div id="email_invalid_feedback" className="invalid-feedback">
              { email ? 'E-mail no es válido' : 'Ingresa tu e-mail' }
            </div>
            <small id="emailHelp" className="form-text text-muted">
              Nunca compartiremos tu correo electrónico con nadie más.
            </small>
          </div>
          <div className="form-group mt-3">
            <label
              className="mb-0"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="d-flex flex-wrap">
              <input
                value={password}
                onChange={this.handleChange}
                required
                autoComplete="current-password"
                type={passType}
                className="form-control flex-10"
                name="password"
                id="password"
                placeholder="Contraseña"
              />
              <button type="button" onClick={this.showHidePass} className="btn_show_hide_pass btn btn-primary flex-1">
                <i className={`bi ${showPassClass}`} />
              </button>
              <div className="w-100 invalid-feedback">Ingresa tu contraseña</div>
            </div>
          </div>
          <div>
            <div className="mt-4">
              <button className="btn btn-primary px-4 py-2" type="submit">
                Ingresar
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={this.loginWithGoogle}
                type="button"
                id="login_with_google"
                className="px-4 py-2 btn btn-danger login_with_google d-flex align-items-center mx-auto"
              >
                <i className="bi bi-google" />
                <span>Ingresar con Google</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function ReactApp() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-4 col-md-7 text-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));
