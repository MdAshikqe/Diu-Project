import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { authContext } from '../../Providers/AuthProvider';
import useAxiosSecurePublic from '../../Hooks/useAxiosSecurePublic';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const {googleSignIn}=useContext(authContext)
    const axiosSecurePublic= useAxiosSecurePublic()
    const navigateee=useNavigate()
  const location= useLocation()
  const from = location.state?.from?.pathname || "/";

    const handleLogin=()=>{
        googleSignIn()
        .then(result=>{
            // const logUser=result.user;
            console.log('google login',result.user)
            const userInfo={
                email: result?.user?.email,
                name: result?.user?.displayName,
                img: result?.user?.photoURL
            }
            axiosSecurePublic.post('/user',userInfo)
            .then(res=>{
                console.log('update database',res.data)
                navigateee(from, { replace: true });
                // if(res.data.insertedId){
                    
                // }

            })
        })

    }
    return (
        <div className='flex items-center justify-center'>
            <button onClick={handleLogin} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:text-green-700">
                <FaGoogle></FaGoogle>
                Sign up to Google</button>
        </div>
    );
};

export default GoogleLogin;