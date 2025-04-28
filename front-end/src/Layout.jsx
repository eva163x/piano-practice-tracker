import NavBar from './NavBar';
import {Outlet} from 'react-router-dom';

//this remains common across all pages or children
export default function Layout() {

    return (
        <>
        <NavBar />
        <Outlet />
        </>
     
    )
  }