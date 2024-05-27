import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { FaBook, FaDollarSign, FaJediOrder, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FaPaypal } from 'react-icons/fa6';
import useCarts from '../../../../Hooks/useCarts';
import useAxiosSecurePublic from '../../../../Hooks/useAxiosSecurePublic';
import { useQuery } from '@tanstack/react-query';

const UserHome = () => {
    const [cart,refetch,isloading]=useCarts();
    const {users}=useContext(AuthContext)
    const axiosSecurePublic = useAxiosSecurePublic();

    const { data: payments=[]} = useQuery({
        queryKey: ['payments', users.email],
        queryFn: async () => {
            const res = await axiosSecurePublic.get(`/order/success/${users.email}`)
            return res.data;
        }
    })
    return (
        <div data-aos="fade-up" data-aos-delay="50"
        data-aos-duration="1000">
           <h2 className='text-2xl font-bold'>
           <span>Hi, Welcome </span>
            {
                users?.displayName ? users?.displayName : 'Back'
            }
           </h2>
           <div className="stats stats-vertical lg:stats-horizontal shadow my-6 lg:flex justify-center">
  <div className="stat ">
    <div className="stat-figure text-secondary">
    <FaShoppingCart className='text-3xl'></FaShoppingCart>
    </div>
    <div className="stat-title">Cart</div>
    <div className="stat-value">{cart.length}</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaDollarSign className='text-3xl'></FaDollarSign>
    </div>
    <div className="stat-title">Payment</div>
    <div className="stat-value">{payments.length}</div>

  </div>            
</div>

<div className="lg:flex justify-center my-24">

    <div className="w-1/2">
    <div className="avatar">
  <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={users?.photoURL} />
  </div>
  
</div>
    </div>

    {/* <div className="flex flex-col w-full lg:flex-row"> */}
<div className="divider lg:divider-horizontal"></div> 
{/* </div> */}

    <div className="w-1/2">
            <h1 className='uppercase text-3xl font-semibold'>Your Activites</h1>
            <div className='my-4 mx-6'>
            <p className='text-2xl  text-green-500'>Order: <span className='text-pink-400 font-medium'>{cart.length}</span></p>
            <p className='text-2xl  text-green-500'>Payment: <span className='text-pink-400 font-medium'>{payments.length}</span></p>
            </div>
    </div>

</div>




        </div>
    );
};

export default UserHome;