import React, { useContext } from 'react';
import useAdminn from '../Hooks/useAdminn';
import { authContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const AddminRoutes = ({children}) => {
    const {users,loading}= useContext(authContext)
    const [isAdmin,isAdminLoading]= useAdminn();
    const location= useLocation()

    if(loading || isAdminLoading){
        return <progress className="progress w-80"></progress>
    }

    if(users && isAdmin){
        return children;
    }
    else{
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
    
};

export default AddminRoutes;