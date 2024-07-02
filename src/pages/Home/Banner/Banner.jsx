import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaShoppingCart } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCarts from '../../../Hooks/useCarts';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';


const Banner = () => {
    const {users} = useContext(AuthContext)
    const navigate= useNavigate()
    const location=useLocation()
    const [axiosSecure]= useAxiosSecure()
    const [,refetch,isloading]=useCarts()
    const [banner,setBanner]=useState([])

    useEffect(()=>{
        fetch('https://diu-project-server.vercel.app/banner')
        .then(res=>res.json())
        .then(data=>{
            setBanner(data)
        })
    },[])

    const handleAddToCard=(product)=>{
        if(users && users.email){
          const productItem= {
            email:users.email,
            name:product.name,
            price:product.price,
            img:product.img
          }
          axiosSecure.post('/carts',productItem)
          .then(res =>{
            console.log(res.data)
            if(res.data.insertedId){
              if(isloading === res.data.insertedId){
                <span className="loading loading-ring loading-xs"></span>
              }
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${product.name} added product to your cart`,
                showConfirmButton: false,
                timer: 1900
              });
            }
            refetch();
          })
          .catch(error=>console.log(error))
          
  
        }
        else{
          Swal.fire({
            title: "Please login to add to cart?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login now"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from:location}} )
            }
          });
        }
  
      }

    return (
        <div className='my-2'
        data-aos="fade-down"
    data-aos-delay="50"
    data-aos-duration="1000"
        >
            <Carousel autoPlay showArrows={true} showThumbs={false} className='bg-pink-300 rounded-md'>
                {
                    banner.map(item=><div key={item._id} className='flex items-center px-5' data-aos="fade-down"
                        data-aos-delay="50"
                        data-aos-duration="1000">
                        <div>
                        <h1 className='text-4xl font-bold py-4'>{item.name}</h1>
                                <p className='py-4 text-2xl'>{item.discreption}</p>
                                <h1 className=' text-2xl font-semibold py-4 flex justify-center'><span className='text-red-500'>Price: </span> {item.price} <svg className='size-4' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg></h1>
                                <button onClick={()=>handleAddToCard(item)} type="button" className='btn btn-secondary text-2xl'><FaShoppingCart />Add To Cart</button>
                        </div>

                    <div>
                         <img className='w-32 m-2' src={item.img} />
                    </div>
                </div> )
                }
            </Carousel>
        </div>
    );
};

export default Banner;