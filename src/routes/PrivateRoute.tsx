import AuthService from '../services/authService'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}:any) => {
    const auth = AuthService.isLoggedIn();
    return auth ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute;