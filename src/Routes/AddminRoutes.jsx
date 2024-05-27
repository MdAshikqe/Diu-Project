import React, { useContext } from 'react';
import useAdminn from '../Hooks/useAdminn';
import { AuthContext} from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const AddminRoutes = ({children}) => {
    const {users,loading}= useContext(AuthContext)
    const [isAdmin,isAdminLoading]= useAdminn();
    const location= useLocation()

    if(loading || isAdminLoading){
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader size={150} color="#36d7b7" />
    </div>
    }

    if(users && isAdmin){
        return children;
    }
    else{
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
    
};

export default AddminRoutes;