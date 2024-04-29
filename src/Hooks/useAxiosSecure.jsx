import axios, { Axios } from 'axios';
import React from 'react';

const axiosSecure= axios.create({
    baseURL: 'http://localhost:7000'
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;