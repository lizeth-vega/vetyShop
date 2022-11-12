import React, { Fragment } from 'react'
import "../../App.css"
import { Link } from 'react-router-dom'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userAction'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth) //state.auth va a sacar el user y loadin para saber que mostrar en pantalla
    //funcion que llame al metodo logout
    const logoutHandler=()=>{
        dispatch(logout());
        alert.success("Logouth exitoso")
    }

    return (
        <Fragment>
            <nav className='navbar row'>
                <div className='col-12 col-md-3'>
                    <div className='navbar-brand'>
                        <img src="./images/vetyshop.png" alt="Vety Shop Store Logo"></img>
                    </div>
                </div>

                <div className='col-12 col-md-4 mt-2 mt-md-0'>

                    {/* Aqui va buscar */}
                    <Search />

                    {/* <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            class="form-control"
                            placeholder='Que producto busca?'></input>
                        <div class="input-group-append">
                            <button id="search-btn" class="btn">
                                <i class="fa fa-search-plus fa-2x text-white" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div> */}

                </div>
                {/*Boton inicio sesión*/}
                <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
                    <Link to="/carrito"><i class="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                        <span className="ml-1" id="cart_count">2</span></Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                                id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className='avatar avatar-nav'>
                                    <img
                                        src={user.avatar && user.avatar.url} //lo que tiene el usuario en su campo avatar y su url como valor de direccionamiento
                                        alt={user && user.nombre}// valor alaternativo nombre del usuario
                                        className="rounded-circle"></img>
                                </figure>
                                <span>{user && user.nombre}</span>  {/*se ve el nombre del usuario */}
                            </Link>
                            <div className='dropdown-menu' aria-labelledby='dropDownMenu'>

                                {/*Preguntamos el rol de quien esta online*/}
                                {user && user.role === "admin" && (  // el usuario que eta logueado en su campo rol es igula admin?
                                    <Link className="dropdown-item" to="/dashboard">Adm. Productos</Link> //va a ver lo que esta el dashboard
                                )}

                                <Link className="dropdown-item" to="/">Pedidos</Link>
                                <Link className="dropdown-item" to="/yo">Mi Perfil</Link>
                                <Link className="dropdown-item" to="/" onClick={logoutHandler}>Cerrar Sesion</Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className='btn ml-4' id="login_btn">Login</Link>} {/* si no esta logueado lo lleva a loguin */}


                </div>

            </nav>

        </Fragment>
    )
}

export default Header