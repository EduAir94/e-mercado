import { Component } from 'react';
import AuthService from '../../services/authService';
import GoogleLogin from './GoogleLogin';
import { withRouter } from '../../routes/WithRouter';
import { RouteInterface } from '../../routes/types';

type MyState = {
   email: string; 
   password:string; 
   validatedForm:boolean; 
   showPassword:boolean;
};

class LoginForm extends Component<{router: RouteInterface}, MyState>  {

    private loginForm:HTMLFormElement | null;

    constructor(props: {router: RouteInterface}) {
      super(props);
      this.loginForm = null;
      this.state = { email: '', password: '', validatedForm: false, showPassword:false };
      this.handleChange = this.handleChange.bind(this);
      this.loginRedirection = this.loginRedirection.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.showHidePass = this.showHidePass.bind(this);
    }
  
    handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const args:any = {
            [e.target.name]: e.target.value.trim(),
        };
        this.setState(args);
    }

    // Handle on change form typescript


    loginRedirection(email:string) {
      if(email !== this.state.email) {
        this.setState({email:email});
      }
      AuthService.login({email});
      return this.props.router.navigate('/')
    } 
  
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      const form = this.loginForm;
      if(!form) return;
      const { email } = this.state;
      this.setState({
        validatedForm: true,
      });
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
        return;
      }
      this.loginRedirection(email);
      return;
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
                onChange={e=> this.handleChange(e)}
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
                  onChange={e=> this.handleChange(e)}
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
               <GoogleLogin loginRedirection={this.loginRedirection} ></GoogleLogin> 
              </div>
            </div>
          </div>
        </form>
      );
    }
}

export default withRouter(LoginForm);