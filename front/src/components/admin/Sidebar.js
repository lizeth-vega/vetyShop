import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Administración</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Productos</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/listaProductos"><i className="fa fa-clipboard"></i> Lista Productos</Link>
                            </li>

                            <li>
                                <Link to="/nuevoProducto"><i className="fa fa-plus"></i> Crear Producto</Link>
                            </li>
                        </ul>
                    </li>
                    {/* boton para pedidos */}
                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Pedidos</Link>
                    </li>
                    {/* boton para usuarios */}

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Usuarios</Link>
                    </li>
                    {/* boton para opiniones */}

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Opiniones</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
export default Sidebar