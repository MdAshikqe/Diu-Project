import React, { useEffect, useState } from 'react';
import ProductCart from './ProductCart';

const Product = () => {
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const [thum,setThum]=useState(true)
  useEffect(()=>{
    fetch('http://localhost:7000/product1')
    .then(res=>res.json())
    .then(data=>{
      setProducts(data)
      setLoading(false)
      setThum(false)
    })
  },
    [])

    return (
        <div className='grid md:grid-cols-3 lg:grid-cols-3 gap-4'>
            {
              products.map(item=> <ProductCart
              key={item._id}
              item={item}
              ></ProductCart>)
            }
        </div>
    );
};

export default Product;