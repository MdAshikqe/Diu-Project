
import useCarts from '../../../../Hooks/useCarts';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    // eslint-disable-next-line no-unused-vars
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
        <div data-aos="fade-zoom" data-aos-delay="50" data-aos-duration="2000">
            <div className='md:flex justify-evenly items-center'>
                <h1 data-aos="fade-zoom" data-aos-delay="50"
         className="text-2xl font-medium uppercase">Total Orders: {cart.length}</h1>
                <h1  data-aos="fade-zoom" data-aos-delay="50"
        data-aos-duration="700" className="text-2xl font-medium uppercase flex">Total price: <svg className='size-4' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
      </svg>{totalPrice}</h1>
                {cart.length ?<Link to="/dashboard/payment">
                <button className='btn btn-outline'>
                <h1 className=" uppercase">Payment</h1>
                </button>
                </Link>:
                
                <button data-aos="fade-zoom" data-aos-delay="50" disabled className='btn btn-outline'>
                <h1 className=" uppercase">Payment</h1>
                </button>
               
                }
            </div>
            <div  className="overflow-x-auto">
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
            <td className='text-xl font-medium text-green-500 flex'> <svg className='size-4' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>{item.price}</td>
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