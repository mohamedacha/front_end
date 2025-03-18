import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Services from './pages/services_pages/services';
import ServiceCard from './pages/services_pages/serviceCard';

import Home from './parties/home';
import Layoute from './parties/layoute';
import NotFound from './parties/notFound';

import Products from './pages/products_pages/products';
import ProductDetails from './pages/products_pages/showproduct';

import Profaile from './pages/users_pages/profaile';
import UpdateUser from './pages/users_pages/update_user';

import OrdersCard from './pages/orders_pages/ordersCard';
import Update_order from './pages/orders_pages/Update_order';

export default function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layoute/>}>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>} />
        </Route>

        <Route path='/users' element={<Layoute/>}>
          <Route path='index' element={<Products/>} />
          <Route path='create' element={<Products/>} />
          <Route path='update' element={<UpdateUser/>} />
          <Route path='show' element={<Profaile/>} />
        </Route>

        <Route path='/products' element={<Layoute/>}>
          <Route index element={<Products/>} />
          <Route path='create' element={<Products/>} />
          <Route path='update' element={<Services/>} />
          <Route path='show/:id' element={<ProductDetails/>
} />
        </Route>

        <Route path='/services' element={<Layoute/>}>
          <Route index element={<Services/>} />
          <Route path='servic.create' element={<Services/>} />
          <Route path='servic.update' element={<Services/>} />
          <Route path='show/:id' element={<ServiceCard/>} />
        </Route>   

               

        <Route path='/orders' element={<Layoute/>}>
          <Route index element={<OrdersCard/>} />
          <Route path='order.create' element={<Services/>} />
          <Route path='update/:id' element={<Update_order/>} />
          <Route path='show' element={<ProductDetails/>} />
        </Route>

      </Routes>
      </BrowserRouter>
      </>
  );
}


