import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Products from './pages/products';
import Home from './pages/home';
import NotFound from './pages/notFound';
import Services from './pages/services';
import Orders from './pages/orders';

import Footer from './parties/footer';
import Header from './parties/header';
import Layoute from './parties/layoute';

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layoute/>}>
          <Route index element={<Home/>}/>
        </Route>

        <Route path='/users' element={<Layoute/>}>
          <Route path='users.index' element={<Products/>} />
          <Route path='user.create' element={<Products/>} />
          <Route path='user.update' element={<Services/>} />
          <Route path='user.show' element={<Orders/>} />
        </Route>

        <Route path='/products' element={<Layoute/>}>
          <Route index element={<Products/>} />
          <Route path='product.create' element={<Products/>} />
          <Route path='product.update' element={<Services/>} />
          <Route path='product.show' element={<Orders/>} />
        </Route>

        <Route path='/services' element={<Layoute/>}>
          <Route index element={<Services/>} />
          <Route path='servic.create' element={<Services/>} />
          <Route path='servic.update' element={<Services/>} />
          <Route path='servic.show' element={<Orders/>} />
        </Route>       

        <Route path='/orders' element={<Layoute/>}>
          <Route index element={<Orders/>} />
          <Route path='order.create' element={<Services/>} />
          <Route path='order.update' element={<Services/>} />
          <Route path='order.show' element={<Orders/>} />
        </Route>

        <Route path='*' element={<NotFound/>} />

      </Routes>
      </BrowserRouter>
    </>
  );
}


