// import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecurePublic from "./useAxiosSecurePublic";

const useProduct = () => {
        const axiosSecurePublic=useAxiosSecurePublic();
    
    const {data:product=[], refetch }= useQuery({
        queryKey:['product1'],
        queryFn: async()=>{
            const res=await axiosSecurePublic.get('/product1')
            return res.data;
        },



    })
    return [product,refetch]

};

export default useProduct;