
import { useForm } from 'react-hook-form';
import SectionHeader from '../../../../Shared/SectionHeader/SectionHeader';
import { Rating } from '@smastrom/react-rating';
import { FaUpload } from 'react-icons/fa';
import { useState } from 'react';
import useAxiosSecurePublic from '../../../../Hooks/useAxiosSecurePublic';
import Swal from 'sweetalert2';



const AddReview = () => {
    const { register, handleSubmit,reset } = useForm();
    const [rating, setRating] = useState(0);
    const axiosSecurePublic =useAxiosSecurePublic()


    const onSubmit = async (data) => {
        // const [review,setReview]=useState()
        const reviewee={
            rating,
            name:data.name,
            details:data.details

        }
        console.log('sssssss',reviewee)
        const res= await axiosSecurePublic.post("/review",reviewee)
        if(res.data.insertedId){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Thanks for the review",
                showConfirmButton: false,
                timer: 1500
              });
              reset()
        }
          }
         
    return (
        <div>
        <SectionHeader heading="GIVE A REVIEW..." subHeading="-Sharing is Caring!!!-"></SectionHeader>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
  <label className="form-control w-full ">
    <div className='flex justify-center'>
        <div>
        <h1 className='text-2xl font-semibold text-center'>Rate Us</h1>
    <Rating
         style={{ maxWidth: 180 }}
         value={rating}
         onChange={setRating}
         isRequired
    ></Rating>
        </div>
    </div>
  <div className="label">
<span className="label-text">Name*</span>
</div>
<input {...register("name", {required:true})}  type="text" placeholder="Your Name" className="input input-bordered w-full" />
</label>
  <label className="form-control w-full ">
  <div className="label">
<span className="label-text">Suggestion*</span>
</div>
<input {...register("suggestion", {required:true})}  type="text" placeholder="Your Name" className="input input-bordered w-full" />
</label>
    <div>
    <label className="form-control">
<div className="label">
<span className="label-text">Details</span>
</div>
<textarea {...register('details')} className="textarea textarea-bordered h-24" placeholder="Product Details"></textarea>
</label>
    </div>

{/* Product input */}


<button className='btn btn-primary my-8'>Send Message <FaUpload className='ml-4'></FaUpload></button>


</form>
        </div>
    </div>
    );
};

export default AddReview;