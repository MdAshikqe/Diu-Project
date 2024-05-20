import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaShoppingCart } from 'react-icons/fa';
import banner1 from '../../../assets/panda/banner-images/headphone.png'
import banner2 from '../../../assets/panda/banner-images/tv.png'
import banner3 from '../../../assets/panda/banner-images/xbox.png'

const Banner = () => {
    return (
        <div className='my-2'>
            <Carousel autoPlay showArrows={true} showThumbs={false} className='bg-pink-300 rounded-md'>
                <div className='flex items-center px-5'>
                        <div>
                        <h1 className='text-4xl font-bold py-4'>Mega HeadPhone For Sports</h1>
                                <p className='py-4 text-2xl'>This is the best HeadPhone in the world for people who just want to waste time in front of
                                    tv.</p>
                                <h1 className=' text-2xl font-semibold py-4'><span className='text-red-500 '>Price:</span> $1200</h1>
                                <button type="button" className='btn btn-secondary text-2xl'><FaShoppingCart /> Buy Now</button>
                        </div>

                    <div>
                         <img className='w-32 m-2' src={banner1} />
                    </div>
                </div>
                <div className='flex items-center px-5'>
                        <div>
                        <h1 className='text-4xl font-bold py-4'>Mega LCD TV For Sports</h1>
                                <p className='py-4 text-2xl'>This is the best TV in the world for people who just want to waste time in front of
                                    tv.</p>
                                <h1 className=' text-2xl font-semibold py-4'><span className='text-red-500 '>Price:</span> $14000</h1>
                                <button type="button" className='btn btn-secondary text-2xl'><FaShoppingCart /> Add to Cart</button>
                        </div>

                    <div>
                         <img className='w-32 m-2' src={banner2} />
                    </div>
                </div>
                <div className='flex items-center px-5'>
                        <div>
                        <h1 className='text-4xl font-bold py-4'>Mega XBOX For Sports</h1>
                                <p className='py-4 text-2xl'>This is the best XBOX in the world for people who just want to waste time in front of
                                    tv.</p>
                                <h1 className=' text-2xl font-semibold py-4'><span className='text-red-500 '>Price:</span> $1200</h1>
                                <button type="button" className='btn btn-secondary text-2xl'><FaShoppingCart /> Add to Cart</button>
                        </div>

                    <div>
                         <img className='w-32 m-2' src={banner3} />
                    </div>
                </div>
                <div className='flex items-center px-5'>
                        <div>
                        <h1 className='text-4xl font-bold py-4'>Mega HeadPhone For Sports</h1>
                                <p className='py-4 text-2xl'>This is the best HeadPhone in the world for people who just want to waste time in front of
                                    tv.</p>
                                <h1 className=' text-2xl font-semibold py-4'><span className='text-red-500 '>Price:</span> $1200</h1>
                                <button type="button" className='btn btn-secondary text-2xl'><FaShoppingCart /> Add to Cart</button>
                        </div>

                    <div>
                         <img className='w-32 m-2' src={banner1} />
                    </div>
                </div>
                
                
               
            </Carousel>
        </div>
    );
};

export default Banner;