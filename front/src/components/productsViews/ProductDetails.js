import React, { Fragment } from 'react'
import Metadata from "../layout/MetaData"

export const ProductDetails = () => {
  return (
    
    <Fragment>
        <Metadata title="Agility Alimento Blando Perros"></Metadata>
        <div className='row d-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fluid' id="imagen_producto">
                <img src="../../images/productos/chunky-adulto.jpg" alt="Imagen_producto" height="450" width="450"></img>
            </div>

            <div className='col-12 col-lg-5 mt-5'>
                <h3>Alimento humedo Agility para Perros</h3>
                <p id="product_id">Product #3253252</p>
            </div>
        </div>
    </Fragment>







    
  )
}


