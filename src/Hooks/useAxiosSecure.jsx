import axios, { Axios } from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Providers/AuthProvider';

const axiosSecure= axios.create({
    baseURL: 'http://localhost:7000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(authContext)
    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {
    const token= localStorage.getItem('access-token')
    config.headers.authorization=`bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  // Add a response interceptor
axiosSecure.interceptors.response.use(function (response) {

    return response;
  }, async(error)=> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status= error.response.status;
    if(status === 401 || status === 403){
        // await logOut();
        // logOut()
        // .then(()=>{
          
        // })
        // navigate('/login')
       
    }
    return Promise.reject(error);
  });
    return axiosSecure;
};

export default useAxiosSecure;