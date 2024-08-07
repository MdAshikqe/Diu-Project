import React, { useContext} from 'react';
import SectionHeader from '../../../../Shared/SectionHeader/SectionHeader';
import useCarts from '../../../../Hooks/useCarts';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { FaPaypal } from 'react-icons/fa';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import useAxiosSecurePublic from '../../../../Hooks/useAxiosSecurePublic';


const Payment = () => {
    const [cart,refetch,isloading]=useCarts();
    const axiosSecurePublic=useAxiosSecurePublic()
    const {users}=useContext(AuthContext)

    // using reduce help chatgpt totalPrice
   const totalPrice= cart.reduce((total,item)=>{
    return total + item.price;
   },0);

   const { register, handleSubmit ,reset} = useForm();
   const onSubmit = (data) => {
    console.log(data)
    const paymentInfo={
        price:data.price,
        email:data.email,
        name:data.name,
        date:new Date(),
        phone:data.phone,
        address:data.address,
        currency:data.currency,
    }
    axiosSecurePublic.post('/order',paymentInfo)
      .then(res=>{
        console.log(res.data)
        window.location.replace(res.data.url)
      })
      // axiosSecure.post(`/order/success/${transjectionId}`);

}

    return (
        <div data-aos="fade-zoom" data-aos-delay="100" data-aos-duration="1000">
            <SectionHeader heading="Payment" subHeading="Please pay"></SectionHeader>
            <div className='md:flex justify-evenly items-center'>
                <h1 className="text-2xl font-medium uppercase">Total Orders: {cart.length}</h1>
                <h1 className="text-2xl font-medium uppercase">Total price: <svg className='size-4' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>{totalPrice}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
        {/* Your  name */}
      <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Your Name*</span>
  </div>
  <input {...register("name", {required:true})}  type="text" defaultValue={users?.displayName} placeholder="Your name" className="input input-bordered w-full" />
</label>
      <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Your Email*</span>
  </div>
  <input {...register("email", {required:true})}  type="email" defaultValue={users?.email} placeholder="Your email" className="input input-bordered w-full" />
</label>

<div className='flex gap-6'>
                {/* currency */}
                <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Select Your Catagory*</span>
  </div>
  <select {...register("currency",{required:true})} 
      className="select select-bordered w-full">
                <option disabled value="default">Select your Currency</option>
                <option value='BDT'>BDT</option>
                <option value='USD'>USD</option>
                <option value='Euro'>Euro</option>
                
       </select>
</label>
                

                {/* post */}
                <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Post Code</span>
  </div>
  <input {...register("postCode",{required:true})} type="number" placeholder="Post code" className="input input-bordered w-full" />
</label>
</div>

<div className='flex gap-4'>

     {/* price */}
                <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Price*</span>
  </div>
  <input {...register("price",{required:true})} type="number" readOnly defaultValue={totalPrice} placeholder="Price" className="input input-bordered w-full" />
</label>


     {/* Phone number*/}
                <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Phone Number*</span>
  </div>
  <input {...register("phone",{required:true})} type="number" placeholder="Phone Number" className="input input-bordered w-full" />
</label>
</div>
{/* address */}
<label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Addres*</span>
  </div>
  <input {...register("address", {required:true})}  type="text" placeholder="Your address" className="input input-bordered w-full" />
</label>


  <div  className='flex items-center justify-center'>
   <a target='_blank'><button  className='btn btn-primary  my-4'>Payment Now<FaPaypal className='ml-4'></FaPaypal></button></a>
   </div>

  


    </form>
    {/* {<div className='flex items-center justify-center'>
   <button disabled className='btn btn-primary  my-4'>Payment Now<FaPaypal className='ml-4'></FaPaypal></button>
   </div>} */}
        </div>
    );
};

export default Payment;