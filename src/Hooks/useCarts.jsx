import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { authContext } from '../Providers/AuthProvider';

const useCarts = () => {
    const axiosSecure=useAxiosSecure()
    const {users}=useContext(authContext)
    const {refetch, data:cart=[] }=useQuery({
        queryKey:['cart', users?.email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/carts?email=${users?.email}`)
            return res.data;
        }


    })
    return [cart,refetch]
};

export default useCarts;