import React from 'react';
import useProduct from '../../../../Hooks/useProduct';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SectionHeader from '../../../../Shared/SectionHeader/SectionHeader';
import { Link } from 'react-router-dom';
import useAxiosSecurePublic from '../../../../Hooks/useAxiosSecurePublic';
import { toast } from 'react-toastify';

const MangeItems = () => {
    const [product,isLoading,refetch] = useProduct();
    const axiosSecurePublic=useAxiosSecurePublic();
    if(isLoading){
      return 
    }

    const handleDeleteProduct=itemee=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
               const res= await axiosSecurePublic.delete(`/product1/${itemee._id}`)
               console.log(res.data)
               if(res.data.deletedCount >0){
                Swal.fire({
                    title: "Deleted!",
                    text: `${itemee.name} has been deleted`,
                    icon: "success"
                  });
                  
               }
               refetch();
    
            
            }
          });
    
       }
    return (
        <div>
            <SectionHeader heading='MANAGE ALL ITEMS' subHeading='Hurry Up!'></SectionHeader>
            
        <div className='md:flex justify-evenly items-center'>
            <h1 className="text-2xl font-medium uppercase">Total Product: {product.length}</h1>
        </div>
        <div className="overflow-x-auto">
<table className="table my-8 ">
{/* head */}
<thead className='rounded-2xl'>
  <tr className='bg-slate-100 '>
    <th className='text-xl font-semibold'>
      #
    </th>
    <th className='text-xl font-semibold'>Item Image</th>
    <th className='text-xl font-semibold'>Item Name</th>
    <th className='text-xl font-semibold'>Price</th>
    <th className='text-xl font-semibold'>Action</th>
    <th className='text-xl font-semibold'>Action</th>
  </tr>
</thead>
<tbody>
  {
  product.data.map((itemee,index)=> <tr className='hover' key={itemee._id}>
    
        <th>
          <label>
            {index+1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-20 h-20">
                <img className="hover:scale-125 ease-in duration-150 cursor-pointer" src={itemee.img} />
              </div>
            </div>
          
          </div>
        </td>
        <td className='text-xl font-medium'>
         {itemee.name}
        </td>
        <td className='text-xl font-medium text-green-500 flex'><svg className='size-4' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>{itemee.price}</td>
        <th>
          <Link to={`/dashboard/updateItem/${itemee._id}`}>
          <button className="btn btn-ghost btn-lg"><FaEdit className='text-red-600 text-2xl'></FaEdit ></button>
          </Link>
        </th>
        <th>
          <button onClick={()=>handleDeleteProduct(itemee)}  className="btn btn-ghost btn-lg"><FaTrashAlt className='text-red-600 text-2xl'></FaTrashAlt></button>
        </th>
      </tr>)
      }
 

</tbody>


</table>
    </div>
    </div>
    );
};

export default MangeItems;