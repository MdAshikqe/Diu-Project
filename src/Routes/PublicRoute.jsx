import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { RingLoader } from 'react-spinners';

const PublicRoute = ({children}) => {
    const {loading}=useContext(AuthContext)
    if(loading){
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader size={150} color="#36d7b7" />
    </div>
    
    }
    else{
        return children;
    }
};

export default PublicRoute;