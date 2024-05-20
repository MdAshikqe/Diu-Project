import React from 'react';
import useCarts from '../../../../Hooks/useCarts';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart,refetch,isloading]=useCarts();
    const [axiosSecure]=useAxiosSecure()

    // using reduce help chatgpt totalPrice
   const totalPrice= cart.reduce((total,item)=>{
    return total + item.price;
   },0);

   const handleDelete=id=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          
            axiosSecure.delete(`/carts/${id}`)
            .then(res=>{
                if(res.data.deletedCount >0){
                      Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
          refetch()

                }
            })

        
        }
      });

   }

    return (
        <div>
            <div className='md:flex justify-evenly items-center'>
                <h1 className="text-2xl font-medium uppercase">Total Orders: {cart.length}</h1>
                <h1 className="text-2xl font-medium uppercase">Total price: ${totalPrice}</h1>
                {cart.length ?<Link to="/dashboard/payment">
                <button className='btn btn-outline'>
                <h1 className=" uppercase">Payment</h1>
                </button>
                </Link>:
                
                <button disabled className='btn btn-outline'>
                <h1 className=" uppercase">Payment</h1>
                </button>
               
                }
            </div>
            <div className="overflow-x-auto">
  <table className="table my-8 ">
    {/* head */}
    <thead className='rounded-2xl'>
      <tr className='bg-slate-100 '>
        <th className='text-xl font-semibold'>
          #
        </th>
        <th className='text-xl font-semibold'>Itmes Image</th>
        <th className='text-xl font-semibold'>Itmes Name</th>
        <th className='text-xl font-semibold'>Price</th>
        <th className='text-xl font-semibold'>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        cart.map((item,index)=> <tr className='hover' key={item._id}>
            <th>
              <label>
                {index+1}
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-20 h-20">
                    <img className="hover:scale-125 ease-in duration-150 cursor-pointer" src={item.img} />
                  </div>
                </div>
              
              </div>
            </td>
            <td className='text-xl font-medium'>
             {item.name}
            </td>
            <td className='text-xl font-medium text-green-500'>${item.price}</td>
            <th>
              <button onClick={()=>handleDelete(item._id)}  className="btn btn-ghost btn-lg"><FaTrashAlt className='text-red-600 text-2xl'></FaTrashAlt></button>
            </th>
          </tr>)
      }
     

    
    </tbody>

    
  </table>
        </div>
        </div>
    );
};

export default Cart;