import React, { Fragment, useState, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userAction'

export const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch(); //muestra el erro o datos
    const { error, loading, message } = useSelector(state => state.forgotPassword) //error, loading, message esto lo trae del reducer

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, alert, error, message]) //Sale de el  alert, error, message

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <Metadata title={'Olvide mi contraseña'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Olvide mi contraseña</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email registrado</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false} >
                            Recuperar contraseña
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default ForgotPassword