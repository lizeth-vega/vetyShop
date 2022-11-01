import './App.css';
import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home.js';
import {ProductDetails} from './components/productsViews/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import { ProductList } from './components/admin/ProductList';
import Carrito from './components/cart/Carrito'
import { NewProduct } from './components/admin/NewProduct';



function App() {
  return (
    <Router>
    <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path='/producto/:id' element={<ProductDetails/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/listaProductos' element={<ProductList/>}/>
            <Route path='/nuevoProducto' element={<NewProduct />}/>
            <Route path='/carrito' element={<Carrito/>}/>
            
          </Routes>
        </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;