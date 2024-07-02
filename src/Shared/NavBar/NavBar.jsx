
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext} from '../../Providers/AuthProvider';
import logo from '../../assets/logo/e-commerce-logo-2.png'
import pic from '../../assets/logo/logo.jpg'
import useCarts from '../../Hooks/useCarts';
import useAdminn from '../../Hooks/useAdminn';
import { useContext } from 'react';



const NavBar = () => {
  const {users,logOut}=useContext(AuthContext)
  const navigate= useNavigate()
  const [cart]=useCarts();
  const [isAdmin, ]=useAdminn();

 


  const totalPrice=cart.reduce((total,item)=>{
    return total + (item.price);
  },0)

  const handleLogOut=()=>{
  
    logOut()
    .then(()=>{
     navigate('/login')
    })
    .catch(error=>console.log(error))
  }
    const navItems=<>
        <li><NavLink to="/">Shop</NavLink></li>
        {
          users && !isAdmin && <li><NavLink to="/booking">My Booking</NavLink></li>
        }
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        {
          users && isAdmin && <li><NavLink to="/dashboard/addminHome">Dashboard</NavLink></li>
        }
        {
          users && !isAdmin && <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
        }
    </>

    return (
        <div className="navbar fixed z-10 bg-opacity-50 bg-black text-white max-w-screen-xl">
  <div className="navbar-start">
    <div className="dropdown bg-slate-600">
    
      <div tabIndex={0} role="button" className="btn btn-success text-white lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-opacity-30 bg-black text-white rounded-box w-52">
        {navItems}
        
      </ul>
    </div>
    <Link to="/"><img className='h-20' src={logo} alt="" /></Link>  
  </div>
  <div className="form-control">
      <input type="text" placeholder="Search" className="input  text-black input-bordered md:w-96 min-w-24 " />
    </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
  </div>
  
  <div className="navbar-end">
    
  <div className="flex items-center justify-center">
    <div className="dropdown dropdown-end dropdown-hover pr-10">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">+{cart.length}</span>
        </div>

      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-slate-600 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">Order:+{cart.length}</span>
          <span className="text-info">Subtotal: {totalPrice}</span>
          <div className="card-actions">
            <NavLink to="/dashboard/cart"><button className="btn btn-primary btn-block">View cart</button></NavLink>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end dropdown-hover ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            users ? <>
            
             <img alt="Tailwind CSS Navbar component"  src={users?.photoURL}/>
            
            
            </> : <img alt="Tailwind CSS Navbar component" src={pic}/>
          }
          
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 rounded-box w-52">
        <li>
        <Link to='/dashboard/userHome'>
        <a className="justify-between">
            Profile
            {/* <span className="badge">New</span> */}
          </a>
        </Link>
          
        </li>
        {/* <li><a>Settings</a></li> */}
        {
          users ? <>
          <li><p>{users?.displayName}</p></li>
          <li><p>{users?.email}</p></li>
          <li onClick={handleLogOut}><Link>LogOut</Link></li>
          </>
          : <div>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </div>
          
        }        
        
      </ul>
    </div>
  </div>
  </div>
  
</div>

    );
};

export default NavBar;