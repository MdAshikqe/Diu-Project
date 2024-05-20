import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext} from '../Providers/AuthProvider';

const useCarts = () => {
    const [axiosSecure]=useAxiosSecure()
    const {users}=useContext(AuthContext)
    const {refetch, data:cart=[],isLoading }=useQuery({
        queryKey:['cart', users?.email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/carts?email=${users?.email}`)
            return res.data;
        }


    })
    return [cart,refetch,isLoading]
};

export default useCarts;