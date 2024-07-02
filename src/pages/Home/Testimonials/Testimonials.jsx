import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews,setReviews]=useState([])
    useEffect(()=>{
        fetch('https://diu-project-server.vercel.app/review')
        .then(res=>res.json())
        .then(data=>{
            setReviews(data)
        })
    },[])
    return (
        <section>
           <div className='mx-auto w-4/12 text-center py-8'>
               <p className='text-yellow-500'>---What Our Clients Say---</p>
               <div className="divider"></div> 
               <h1 className='text-4xl font-semibold'>TESTIMONIALS</h1>
               <div className="divider"></div> 
           </div>
           <div className=''>
           <Swiper autoplay={true} navigation={true} modules={[Navigation]} className="mySwiper">
            {
                reviews.map(review=><SwiperSlide
                key={review._id}
                >
                <div className='my-14'>
                <div className='flex justify-center items-center'>
                <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
                 />
                </div>

                <p className='px-28'> {review.details}</p>
                <h3 className='flex justify-center items-center text-2xl font-medium'>{review.name}</h3>
                </div>
                </SwiperSlide>)
            }

           </Swiper>
           </div>

            
        </section>
    );
};

export default Testimonials;