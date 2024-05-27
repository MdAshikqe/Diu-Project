import React, { useEffect, useState } from 'react';
import ProductCart from './ProductCart';
import useAxiosSecurePublic from '../../../Hooks/useAxiosSecurePublic';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {
  const axiosSecurePublic=useAxiosSecurePublic();
  const [products,setProducts]=useState([])
  const [limit, setLimit] = useState(6);
  const [pageNumber,setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  console.log(limit)
  const [loading,setLoading]=useState(true)
  const [thum,setThum]=useState(true)
  
  
  

  useEffect(() => {
    // query parameter
    (async () =>{
      const {data} = await axiosSecurePublic.get(`/product1?limit=${limit}&pageNumber=${pageNumber}`);

      if(!data.data) {
        setProducts([])
        return toast.error(data.data.error);

      }
      setProducts(data.data);
      setTotalPage(Math.ceil(data.count/limit))
      setLoading(false)
      setThum(false)
      

    })()
    
  }, [limit,pageNumber])

  // useEffect(()=>{
  //   fetch('http://localhost:7000/product1')
  //   .then(res=>res.json())
  //   .then(data=>{
  //     setProducts(data)
  //     setLoading(false)
  //     setThum(false)
  //   })
  // },
  //   [])

    return (
      <div>
          <div data-aos="fade-down" data-aos-delay="50"
          data-aos-duration="1000" className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {    
            products.map(item=> <ProductCart
            key={item._id}
            item={item}
            ></ProductCart>)}
            
    
        </div>
       
       <div className='flex justify-end'>
       {
          [...Array(totalPage).keys()].map(number=> <div onClick={()=>setPageNumber(number)} className={`mx-3 border btn btn-gost cursor-pointer border-black px-6 py-2 ${pageNumber === number ? "bg-slate-800 text-white":""}`}>{number+1}</div>)
        }
         <select defaultValue={limit} className='border border-black' onChange={(e) => setLimit(e.target.value)}>
          <option value="2">2</option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

       </div>
       
      </div>
    );
};

export default Product;