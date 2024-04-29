import React from 'react';
import { Link } from 'react-router-dom';
import mainImg from '../../assets/main/main2.avif'
import { Helmet } from 'react-helmet';
import { FaArrowRight } from 'react-icons/fa';

const Main2 = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Project-Main</title>
            </Helmet>
  <div className="hero-content flex-col lg:flex-row-reverse mx-40 my-28">
    {/* <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
    <img className="max-w-sm rounded-lg shadow-2xl border-8 border-l-slate-500 border-b-slate-500" src={mainImg} alt="" />
    <div>
      <h1 className="text-5xl font-bold">New Collection For Fall</h1>
      <p className="py-6">Discover all the new arrivals of ready to new collection.</p>
      <Link to="/shop"><button className="btn btn-primary">SHOP NOW <FaArrowRight /> </button></Link>
    </div>
  </div>
</div>
    );
};

export default Main2;