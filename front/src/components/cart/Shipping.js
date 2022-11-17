import React, { Fragment, useEffect, useState } from 'react'
import Metadata from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps'

export const Shipping = () => {
    let Pais = require('./Colombia.json'); //trae toda la informacion del json departamentos de colombia
    const navigate = useNavigate() //redirecciona
    const { shippingInfo } = useSelector(state => state.cart)
    const [direccion, setDireccion] = useState(shippingInfo.direccion) //shippingInfo recuerda el contenido que se escribio previamente
    const [ciudad, setCiudad] = useState(shippingInfo.ciudad)
    const [telefono, setTelefono] = useState(shippingInfo.telefono)
    const [departamento, setDepartamento] = useState(shippingInfo.departamento)
    const [ciudades, setCiudades] = useState([]) //lista de ciudades dependiendo el departametno que elija

    useEffect(() => {
        Pais.forEach((depar) => {
            if (depar.departamento === departamento) { //si departamento es igual a loq ue la persona ha seleecionado en el campo departamento
                setCiudades(depar.ciudades)//muestre una lista de ciudades que compete a depar.ciudades
            }
        })
    })
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ direccion, ciudad, telefono, departamento })) //nos guiamos del order
        navigate("/order/confirm")
    }
    return (
        <Fragment>

            <Metadata title={'Información de envio'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onClick={submitHandler}>
                        <h1 className="mb-4">Información de envio</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Dirección</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Telefono</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Departamento</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
                                required
                            >

                                {Pais.map(dep => (
                                    <option key={dep.departamento} value={dep.departamento}>
                                        {dep.departamento}
                                    </option>
                                ))}

                            </select>


                            <div className="form-group">
                                <label htmlFor="city_field">Ciudad</label>
                                <select
                                    id="city_field"
                                    className="form-control"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    required
                                >
                                    {/* cuando selecciona un departamento este muestra las ciudades que le corresponden */}
                                    {ciudades.map(ciudad => (
                                        <option key={ciudad} value={ciudad}>
                                            {ciudad}
                                        </option>
                                    ))}


                                </select>
                            </div>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUAR
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping