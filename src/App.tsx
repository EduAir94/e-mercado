import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Market from './pages/Market';
import MyProfile from './pages/MyProfile';
import ProductInfo from './pages/ProductInfo';
import Products from './pages/Products';
import Sell from './pages/Sell';
import PrivateRoute from './routes/PrivateRoute';
import WithNav from './routes/WithNav';
import AuthService from './services/authService';

function App() {
  AuthService.setLoggedIn();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<WithNav />}>
          <Route path="/" element={<PrivateRoute Component={Market} />} />
          <Route path="/categories" element={<PrivateRoute Component={Categories} />} />
          <Route path="/cart" element={<PrivateRoute Component={Cart} />} />
          <Route path="/my-profile" element={<PrivateRoute Component={MyProfile} />} />
          <Route path="/sell" element={<PrivateRoute Component={Sell} />} />
          <Route path="/products/:catID" element={<PrivateRoute Component={Products} />} />
          <Route path="/products" element={<PrivateRoute Component={Products} />} />
          <Route path="/product-info" element={<PrivateRoute Component={ProductInfo} />} />
          <Route path="/product-info/:prodID" element={<PrivateRoute Component={ProductInfo} />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
