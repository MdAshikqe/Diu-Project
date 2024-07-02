import React, { useState } from 'react';
import SectionHeader from '../../../Shared/SectionHeader/SectionHeader';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa6';
import useAxiosSecurePublic from '../../../Hooks/useAxiosSecurePublic';
import axios from 'axios';
import Swal from 'sweetalert2';

// const imageKey=import.meta.env.VITE_IMAGE_HOSTING;
// // const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddItems = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosSecurePublic= useAxiosSecurePublic();
    const [imgUrl,setImg]=useState("")
    // const [axiosSecure]=useAxiosSecure();

    const onSubmit =  async(data) => {
      const productItems={
        ...data,
        img:imgUrl
      }
      const res= await axiosSecurePublic.post('/product1',productItems)
      if(res.data.insertedId){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully add a product",
          showConfirmButton: false,
          timer: 1500
        });
      }
      reset();
      setImg("")
    };
    const handleUploadImage=(event)=>{
      const image=event.target.files[0]
      const formData= new FormData();
      formData.set("image",image)
      axios.post("https://api.imgbb.com/1/upload?key=1d8228dfab58a9dea9c7046ad6a7171a",formData)
      .then(res =>{
        setImg(res.data.data.display_url)
      })
      .catch(error=>console.log(error))
    }

    return (
        <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
            <SectionHeader heading="Add an Items" subHeading="What's New"></SectionHeader>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
        {/* Receipe name */}
      <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Product Name*</span>
  </div>
  <input {...register("name",{required:true})} type="text" placeholder="Product Name" className="input input-bordered w-full" />
</label>

<div className='flex gap-6'>
                {/* catagory */}
                <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Select Your Catagory*</span>
  </div>
  <select defaultValue="default" {...register("category",{required:true})} 
      className="select select-bordered w-full">
                <option disabled value="default">Select your catagory</option>
                <option>Men's Pants</option>
                <option>Men's Boot</option>
                <option>Men's Sneaker</option>
                <option>Cap</option>
                <option>Earphones</option>
                <option>Bag</option>
                <option>Bottle</option>
       </select>
</label>
                

                {/* price */}
                <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Price*</span>
  </div>
  <input {...register("price",{required:true})} type="number" placeholder="Price" className="input input-bordered w-full" />
</label>
</div>
        <div className='flex gap-4'>
            {/* Stock Deatieles */}
        <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Stock*</span>
  </div>
  <input {...register("stock",{required:true})} type="number" placeholder="Stock" className="input input-bordered w-full" />
</label>
        {/* Shiping Deatieles */}
        <label className="form-control w-full ">
      <div className="label">
    <span className="label-text">Shiping*</span>
  </div>
  <input {...register("shipping",{required:true})} type="number" placeholder="shipping" className="input input-bordered w-full" />
</label>
        </div>

        {/* Product Details */}

        <div>
        <label className="form-control">
  <div className="label">
    <span className="label-text">Product Details</span>
  </div>
  <textarea {...register('productDetails',{required:true})} className="textarea textarea-bordered h-24" placeholder="Product Details"></textarea>
</label>
        </div>

{/* Product input */}

<div>
<label className="form-control w-full max-w-xs my-4">
  <div className="label">
    <span className="label-text">Product Image</span>
  </div>
  <input type="file" className="file-input file-input-bordered w-full max-w-xs"
  onChange={handleUploadImage}
   />
</label>
</div>

    <button disabled={!imgUrl ? true : false} className='btn btn-primary'>Add Items <FaUtensils className='ml-4'></FaUtensils></button>


    </form>
            </div>
        </div>
        
    );
};

export default AddItems;