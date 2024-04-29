import axios from 'axios';
import React from 'react';

const axiosSecurePublic=axios.create({
    baseURL:'http://localhost:7000',

})
const useAxiosSecurePublic = () => {
    return axiosSecurePublic;
};

export default useAxiosSecurePublic;