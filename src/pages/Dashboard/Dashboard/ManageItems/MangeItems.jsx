import React from 'react';
import useProduct from '../../../../Hooks/useProduct';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import SectionHeader from '../../../../Shared/SectionHeader/SectionHeader';

const MangeItems = () => {
    const [product, ,refetch] = useProduct();
    const axiosSecure=useAxiosSecure()

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
               const res= await axiosSecure.delete(`/product1/${itemee._id}`)
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
    product.map((itemee,index)=> <tr className='hover' key={itemee._id}>
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
        <td className='text-xl font-medium text-green-500'>${itemee.price}</td>
        <th>
          <button className="btn btn-ghost btn-lg"><FaEdit className='text-red-600 text-2xl'></FaEdit ></button>
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