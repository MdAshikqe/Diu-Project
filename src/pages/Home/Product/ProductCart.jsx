
import { FaArrowRight } from 'react-icons/fa';
import { AuthContext} from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCarts from '../../../Hooks/useCarts';
import { useContext } from 'react';
import useAxiosSecurePublic from '../../../Hooks/useAxiosSecurePublic';




const ProductCart = ({item}) => {
    const {category,name,price,img,_id}=item;
    const {users} = useContext(AuthContext)
    const navigate= useNavigate()
    const location=useLocation()
    const axiosSecurePublic= useAxiosSecurePublic()
    const [cart,refetch,isloading]=useCarts()
  

    // const totalPrice=cart.reduce((total,item)=>{
    //   return total + item.price;
    // },0)
   


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
        axiosSecurePublic.post('/carts',productItem)
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
        <div data-aos="fade-up" 
        data-aos-delay="50"
        data-aos-duration="1000">
            <div className='my-10'>
            <div data-aos="fade-up"
        data-aos-duration="600" className="card h-full w-full bg-base-100 shadow-xl">
  <figure><img  className="hover:scale-125 ease-in duration-150 cursor-pointer" src={img} alt="Shoes" /></figure>
  <div className="card-body h-60">
    <h2 className="card-title">{name}</h2>
    <p>{category}</p>
    <p className='flex'>Price: <svg className='size-3' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>{price}</p>
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