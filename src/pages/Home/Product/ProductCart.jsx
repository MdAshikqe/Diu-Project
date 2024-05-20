import React, { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { AuthContext} from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCarts from '../../../Hooks/useCarts';




const ProductCart = ({item}) => {
    const {category,name,price,img,_id}=item;
    const {users} = useContext(AuthContext)
    const navigate= useNavigate()
    const location=useLocation()
    const [axiosSecure]= useAxiosSecure()
    const [,refetch,isloading]=useCarts()
   


    const handleAddToCard=(product)=>{
      if(users && users.email){
        console.log(users.email , product )
        const productItem= {
          productId:_id,
          email:users.email,
          name,
          price,
          img,
          category
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
              title: `${name} added product to your cart`,
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
        <div>
            <div className='my-10'>
            <div className="card  w-96 bg-base-100 shadow-xl">
  <figure><img className="hover:scale-125 ease-in duration-150 cursor-pointer" src={img} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{category}</p>
    <p>Price: ${price}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleAddToCard(item)}  className="btn btn-primary select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Add To Cart <FaArrowRight /></button>
    </div>
  </div>
</div>
        </div>
        </div>
    );
};

export default ProductCart;