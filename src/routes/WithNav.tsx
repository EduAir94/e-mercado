import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

export default function WithNav() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
