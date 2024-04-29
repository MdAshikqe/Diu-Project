import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from './Banner/Banner';
import Product from './Product/Product';
import Testimonials from './Testimonials/Testimonials';
import { useLocation } from 'react-router-dom';
import useCarts from '../../Hooks/useCarts';

const Home = () => {
    return (
       <>
       <Helmet>
        <title>Eshop-Home</title>
       </Helmet>
        <div>
           <div className='py-24'>
           <Banner></Banner>
           </div>
           <h1 className='text-4xl font-semibold'>Product : </h1>
           <Product></Product>
           <Testimonials></Testimonials>
        </div>
       
       </>
    );
};

export default Home;