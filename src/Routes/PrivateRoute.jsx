import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';



const PrivateRoute = ({children}) => {
    const {users,loading}=useContext(AuthContext)
    const location= useLocation()

    if(loading){
        return <progress className="progress items-center w-56"></progress>
    }

    if(users){
        return children;
    }
    else{
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
};

export default PrivateRoute;