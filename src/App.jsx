import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';

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
import { createContext, useState } from 'react';


export const AppContext = createContext({});

export const AddButton = (props) => {

  const buttonStyle = {
    padding: "0",
    height: "35px",
    width: "50px",
    backgroundColor: "#2564eb",
    color: "white",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    margin: "0",
    overflow: "hidden",
    transition: "all 0.125s ease-in-out",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  const hoverStyle = {
    width: "150px",
    marginLeft : '-100px'
  };
  const navigate = useNavigate();
  const [content, setContent] = useState('+');

  const handelMouseEnter = (e) => {
    Object.assign(e.target.style, hoverStyle)
    setContent('add ' + props.added_element_name)
  };
  const handelMouseLeave = (e) => {
    Object.assign(e.target.style, buttonStyle)
    setContent('+')
  };
  const handelClick = () => { navigate(props.navigate) }

  return (
    <button style={buttonStyle} onMouseEnter={handelMouseEnter} onMouseLeave={handelMouseLeave} onClick={handelClick} >{content}</button>
  );
};

export const AdminUI = (props) => {
  const Navigate = useNavigate();
  const style = {
    container: {
      position : 'absolute' ,
      width: "100%",
      bottom : '20px' ,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      textDecoration: "none",
      textAlign: "center",
      display: "block",
      width: "200px",
      height: "35px",
      borderRadius:'1000px' ,
      backgroundColor: "red", // Button color
      color: "white",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    },
    link: {
      borderRadius:'1000px' ,
      textDecoration: "none",
      textAlign: "center",
      display: "flex",
      justifyContent : 'center' ,
      alignItems : 'center' ,
      width: "200px",
      height: "35px",
      backgroundColor: "orange", // Link color
      color: "white",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  const handlDeleteByAdmin = (e) => {
    e.preventDefault()
    const delete_item = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/${props.deleteAPI}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${props.token}`,
            "Accept": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          Navigate(`${props.backToPreviousPage}`)
        } else {
          console.error(data.message)
        }
      } catch (error) { console.error(error.message); }
    }
    delete_item()
  };

  return (
    <form style={style.container} className="espace_admin" onSubmit={handlDeleteByAdmin}>
      <Link style={style.link} to={props.navigateUpdateItem} className="admin_Link_update"><p>update</p></Link>
      <button style={style.button} type="submit" className="delete">delete</button>
    </form>
  );
};


export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')) || '');
  const UpdateAuthUser = (user) => { setUser(user) }

  const [token, setToken] = useState(localStorage.getItem('authToken') || '')
  const updateToken = (token) => setToken(token)

  const [profail, setProfail] = useState(user ? user.img : 'dafault.png')
  const updateProfail = (img) => setProfail(img)

  const [admin, setAdmin] = useState(user ? user.admin : false)
  const updateAdmin = (admin) => setAdmin(admin)



  return (
    <AppContext.Provider value={{ user , UpdateAuthUser , profail, updateProfail, token, updateToken, admin, updateAdmin }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layoute />}>
            <Route index element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='/users' element={<Layoute />}>
            {token ? (<>
              <Route path='update' element={<UpdateUser />} />
              <Route path='show' element={<Profaile />} />
            </>
            ) : (
              <>
                <Route path='create' element={<CreateUser />} />
                <Route path='login' element={<Login />} />
              </>
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


