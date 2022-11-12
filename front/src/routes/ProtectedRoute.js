import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../actions/userAction"; //loaderUser para tener informacion del usuario

const ProtectedRoute = ({children, isAdmin}) =>{
    const {isAuthenticated=false, loading=true, user} = useSelector((state)=> state.auth)
    const dispatch=useDispatch();

    useEffect(()=>{
        //verifica las condiciones del usuario
        if(!user){
            dispatch(loadUser());
        }
    }, [isAuthenticated, loading]) //que se conseve la autenticacion

    if (loading) return <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>; //si loadin es verdadero dej ver el cargar

    if (loading===false && isAuthenticated){ //si loading es false y estoy auteticado
        if (isAdmin===true & user.role!=="admin"){ //si el rol no compete a admin entonces
            return <Navigate to="/" />; //regrese a la oagina de inicio
        }
        return children; // deejela ir a la children o dashborad
    }
    else{
        return <Navigate to={"/login"} />; //sino loguese
    }
}

export default ProtectedRoute;