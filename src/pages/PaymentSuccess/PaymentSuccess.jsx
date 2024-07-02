import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionHeader from '../../Shared/SectionHeader/SectionHeader';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecurePublic from '../../Hooks/useAxiosSecurePublic';

const PaymentSuccess = () => {
  const { users } = useContext(AuthContext)
  const axiosSecurePublic = useAxiosSecurePublic();

  const { data: payments=[]} = useQuery({
      queryKey: ['payments', users.email],
      queryFn: async () => {
          const res = await axiosSecurePublic.get(`/order/success/${users.email}`)
          return res.data;
      }
  })
    return (
        <div data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
            <div>
              <SectionHeader heading="Payment Successfuly" subHeading="Payment history"></SectionHeader>
            <h1 className='text-2xl font-bold'>Total Payment : <span className='text-green-600'>{payments.length}</span></h1>
            <br />
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment,index)=> <tr key={payment._id}>
        <th>{index +1}</th>
        <td className='flex'><svg className='size-4' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>{payment.price}</td>
        <td>{payment.transjectionId}</td>
        <td>{payment.paidStatus}</td>
      </tr>)}
      
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default PaymentSuccess;