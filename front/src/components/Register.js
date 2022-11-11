import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Metadata from './layout/Metadata';
import{register,clearErrors} from '../actions/userAction'
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [user, setUser] = useState({ //mpaquetando la infromacion de usuario
        nombre: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const { nombre, email, password } = user;
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg")
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error, alert])

    //metodo para traier informacion con los datos del form
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar)

        dispatch(register(formData)) //este formData es lo mismo que el userData que biene de UserAction linea 40 se le va a enviar al datos al userData por medio del formData
    }

    //setear el campo del avatar
    const onChange = e => {
        if (e.target.name === "avatar") { //si el nombre de cualquier target del form se llama avatar
            const reader = new FileReader(); //lea archivos que carguemos en ese boton

            reader.onload = () => { //reader carga ese archivo
                if (reader.readyState === 2) { //si reader tiene algo para cargar readyState  -- "equivale a que ya tiene un archivo"
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])//asigne una url a ese archivo
        }
        //cuando campo no se llama avatar
        else {
            setUser({ ...user, [e.target.name]: e.target.value }) //alimente un user asumiendo  que lo que consigue en cada target del form dependiendo de sus nombre va a ser igual a lo que tenga en su value
        }
    }

    return (
        <Fragment>
            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <Fragment>
                    <Metadata title={'Registrar Usuario'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-3">Registrar</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='nombre'
                                        value={nombre}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        name='password'
                                        value={password}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className="rounded-circle"
                                                    alt="Vistar Previa del Avatar"></img>
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                accept="images/*"
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Escoger Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    id="register_button"
                                    type="submit"
                                    className="btn btn-block py-3"

                                >
                                    REGISTRAR
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}