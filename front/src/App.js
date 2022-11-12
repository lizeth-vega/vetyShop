import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home.js';
import { ProductDetails } from './components/productsViews/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import { ProductList } from './components/admin/ProductList';
import Carrito from './components/cart/Carrito'
import { NewProduct } from './components/admin/NewProduct';
import { Login } from './components/user/Login';
import { Register } from './components/Register';
import { loadUser } from './actions/userAction';
import store from './store';
import {Profile} from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';




function App() {
  //esto hace que nuestro aplicativo sepa que ya se inicio sesion
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path='/producto/:id' element={<ProductDetails />} />           
            <Route path='/listaProductos' element={<ProductList />} />
            <Route path='/nuevoProducto' element={<NewProduct />} />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/yo' element={<Profile/>}/>

             {/* ruta protegida  --- dashboard es como el children que llaamos en protectedroute */}
             <Route path='/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>



          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;