import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import Metadata from '../layout/Metadata'

export const Dashboard = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard Panel de control</h1>
                    <Fragment>
                        <Metadata title={'Administracion'} />
                        {/* Targeta 1 */}

                        <div className="row pr-4">
                            <div className="col-xl-12 col-sm-12 mb-3">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Ventas Totals<br /> <b>$2.000.000</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Targeta 2 */}
                        <div className="row pr-4">
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Productos en stock<br /> <b>123</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                        <span className="float-left">Ver Detalles</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            {/* Targeta 3 */}


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size"> N° Pedidos<br /> <b>50</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                        <span className="float-left">Ver Detalles</span>
                                        <span className="float-right"><i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            {/* Targeta 4 */}


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-info o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size"> N° - Usuarios<br /> <b>355</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                        <span className="float-left">Ver Detalles</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            {/* Targeta 5 */}


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Agotados<br /> <b>20</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>


                </div>
            </div>

        </Fragment >
    )
}
export default Dashboard