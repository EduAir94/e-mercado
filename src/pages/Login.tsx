import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import AuthService from '../services/authService';

function Login() {
  const clientId = '305807321503-rqapibjl40pakon4rr586u07c8iucpot.apps.googleusercontent.com';
  const auth = AuthService.isLoggedIn();
  if (auth) return <Navigate to="/" />;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main id="login_page" className="d-flex align-items-center">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-4 col-md-7 text-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </GoogleOAuthProvider>
  );
}

export default Login;
