import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';

const UserHome = () => {
    const {users}=useContext(AuthContext)
    return (
        <div>
           <h2 className='text-2xl'>
           <span>Hi, Welcome </span>
            {
                users?.displayName ? users?.displayName : 'Back'
            }
           </h2>
        </div>
    );
};

export default UserHome;