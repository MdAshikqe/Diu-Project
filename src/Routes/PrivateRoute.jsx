import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { RingLoader } from 'react-spinners';



const PrivateRoute = ({children}) => {
    const {users,loading}=useContext(AuthContext)
    const location= useLocation()

    if(loading){
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader size={150} color="#36d7b7" />
    </div>
    }

    if(users){
        return children;
    }
    else{
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
};

export default PrivateRoute;