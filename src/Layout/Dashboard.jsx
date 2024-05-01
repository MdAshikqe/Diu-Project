import React from 'react';
import { FaAddressBook, FaCalendar, FaDollarSign, FaFileContract, FaHome, FaShopify, FaShoppingCart, FaStreetView } from 'react-icons/fa';
import { FaAdn, FaBook, FaDAndD, FaList, FaUser } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useCarts from '../Hooks/useCarts';
import useAdminn from '../Hooks/useAdminn';


const Dashboard = () => {
    const [cart]=useCarts()
    // const [isAdmin] = UseAdmin;
    const [isAdmin]= useAdminn();
    return (
        <div className='flex '>
            {
                isAdmin ? 
                <>
                <div className='w-64 min-h-screen bg-orange-300'>
                <ul className='menu text-xl'>
                    <li className='uppercase font-medium'><NavLink to='/dashboard/adminHome'><FaHome></FaHome>
                    Admin Home</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/addItems'><FaAdn></FaAdn>
                     add items</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/mangeItems'><FaList></FaList>
                    Manage items</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/booking'><FaBook></FaBook> 
                    Manage Booking</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/users'><FaUser></FaUser> 
                    All users</NavLink></li>
                </ul>
                <div className="divider divider-primary"></div>

                {/* Home page redirect */}
                <ul className='menu text-xl'>

                <li className='uppercase font-medium'><NavLink to='/'><FaHome></FaHome> 
                    Home</NavLink></li>
                <li className='uppercase font-medium'><NavLink to='/shop'><FaShopify></FaShopify> 
                    Shop</NavLink></li>
                <li className='uppercase font-medium'><NavLink to='/about'><FaAddressBook></FaAddressBook> 
                    Abouts Us</NavLink></li>
                <li className='uppercase font-medium'><NavLink to='/contact'><FaFileContract></FaFileContract> 
                Contact</NavLink></li>

                </ul>

            </div>
                </>

                :<>
                 {/* dashboard side bar */}
            <div className='w-64 min-h-screen bg-orange-300'>
                <ul className='menu text-xl'>
                    <li className='uppercase font-medium'><NavLink to='/dashboard/userHome'><FaHome></FaHome>
                     User Home</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar>
                     Reservation</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/payment'><FaDollarSign></FaDollarSign>
                     Payment History</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart> 
                    My Cart ({cart.length})</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/review'><FaStreetView></FaStreetView> 
                    Add Review</NavLink></li>

                    <li className='uppercase font-medium'><NavLink to='/dashboard/booking'><FaBook></FaBook> 
                    My Booking</NavLink></li>
                </ul>
                <div className="divider divider-primary"></div>

                {/* Home page redirect */}
                <ul className='menu text-xl'>

                <li className='uppercase font-medium'><NavLink to='/'><FaHome></FaHome> 
                    Home</NavLink></li>
                <li className='uppercase font-medium'><NavLink to='/shop'><FaShopify></FaShopify> 
                    Shop</NavLink></li>
                <li className='uppercase font-medium'><NavLink to='/about'><FaAddressBook></FaAddressBook> 
                    Abouts Us</NavLink></li>
                <li className='uppercase font-medium'><NavLink to='/contact'><FaFileContract></FaFileContract> 
                Contact</NavLink></li>

                </ul>

            </div>
                </>
            }

           
            

            {/* dashboard main containt */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;