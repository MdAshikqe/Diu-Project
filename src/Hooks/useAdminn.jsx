import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { authContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useAdminn = () => {
    const {users}= useContext(authContext)
    const axiosSecure= useAxiosSecure()
  //use transtic
  const {data: isAdmin, isPending: isAdminLoading}=useQuery({
    queryKey: [users?.email,'isAdmin'],
    queryFn: async()=>{
        const res=await axiosSecure.get(`/user/admin/${users?.email}`)
        return res.data?.admin;
    }
  })
  return [isAdmin,isAdminLoading]
};

export default useAdminn;