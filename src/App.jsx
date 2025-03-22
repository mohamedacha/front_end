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
import CreateUser from './pages/users_pages/create_user';
import Login from './pages/users_pages/login';
import AddProduct from './pages/products_pages/addproduct';
import AddService from './pages/services_pages/addservice';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext({})

export default function App() {
  
  const [token , setToken] = useState(localStorage.getItem('authToken') || '')
  const updateToken = (token) => setToken(token)
  
  return (
    <AppContext.Provider value={{ token , updateToken }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layoute />}>
            <Route index element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='/users' element={<Layoute />}>
            {token ? (<>
              <Route path='create' element={<CreateUser />} />
              <Route path='update' element={<UpdateUser />} />
              <Route path='show' element={<Profaile />} />
            </>
            ) : (
              <Route path='login' element={<Login />} />
            )}

          </Route>

          <Route path='/products' element={<Layoute />}>
            <Route index element={<Products />} />
            <Route path='show/:id' element={<ProductDetails />} />
            {token && (
              <>
                <Route path='create' element={<AddProduct />} />
                <Route path='update/:id' element={<Services />} />
              </>)}
          </Route>

          <Route path='/services' element={<Layoute />}>
            <Route index element={<Services />} />
            <Route path='show/:id' element={<ServiceCard />} />
            {token && (
              <>
                <Route path='create' element={<AddService />} />
                <Route path='update' element={<Services />} />
              </>
            )}
          </Route>


          {token && (
            <Route path='/orders' element={<Layoute />}>
              <Route index element={<OrdersCard />} />
              <Route path='order.create' element={<Services />} />
              <Route path='update/:id' element={<Update_order />} />
              <Route path='show' element={<ProductDetails />} />
            </Route>
          )}

        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}


