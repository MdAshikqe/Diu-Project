import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Providers/AuthProvider';

const PrivateRoute = ({children}) => {
    const {users,loading}=useContext(authContext)
    const location= useLocation()

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if(users){
        return children;
    }
    else{
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
};

export default PrivateRoute;