import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import { MDBDataTable } from 'mdbreact'

export const ProductList = () => { 
    const { loading, productos, error } = useSelector(state => state.products) /*loading, productos, error*/
    const alert = useAlert();

    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts());
    }, [dispatch])
    //tomar el json que es suna lista y voverla mas corta - eso va en una función

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc'
                },
                {
                    label: 'Precio',
                    field: 'precio',
                    sort: 'asc'
                },
                {
                    label: 'Inventario',
                    field: 'inventario',
                    sort: 'asc'
                },
                {
                    label: 'Vendedor',
                    field: 'vendedor',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'actions',
                },
            ],
            rows: []
        }

        //por cada producto que encuentre

        productos.forEach(product => {
            data.rows.push({ // en todas las filas = empuje
                nombre: product.nombre,
                precio: `$${product.precio}`,
                inventario: product.inventario,
                vendedor: product.vendedor,
                actions:
                    <Fragment>
                        <Link to={`/producto/${product._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link><Link to="/" className="btn btn-warning py-1 px-2">
                            <i class="fa fa-pencil"></i>
                        </Link>

                        <Link to="/" className="btn btn-danger py-1 px-2">
                            <i className="fa fa-trash"></i>
                        </Link>


                    </Fragment>

            })

        })
        return data;

    }
    return (
        <Fragment>
            <Metadata title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Productos Registrados</h1>

                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default ProductList