import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Providers/AuthProvider';

const useAdminn = () => {
    const {users,loading}= useContext(AuthContext)
    const [axiosSecure]= useAxiosSecure()
  //use transtic
  const {data: isAdmin, isPending: isAdminLoading}=useQuery({
    queryKey: [users?.email,'isAdmin'],
    enabled: !loading,
    queryFn: async()=>{
        const res=await axiosSecure.get(`/user/admin/${users?.email}`)
        return res.data?.admin;
    }
  })
  return [isAdmin,isAdminLoading]
};

export default useAdminn;