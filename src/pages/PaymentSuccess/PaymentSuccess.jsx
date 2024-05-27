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
        <td>${payment.price}</td>
        <td>{payment.transjectionId}</td>
        <td>{payment.paidStatus}</td>
      </tr>)}
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentSuccess;