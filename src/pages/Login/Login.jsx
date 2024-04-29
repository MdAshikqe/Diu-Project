import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate,validateCaptcha } from 'react-simple-captcha';
import { authContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const Login = () => {
  const {singIn}=useContext(authContext)
  const navigate=useNavigate()
  const location= useLocation()
  const from = location.state?.from?.pathname || "/";

    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const [disable,setDisable]=useState(true)
    const capcaRef= useRef(null)

    const handleCapture=()=>{
        const user_capture_value= capcaRef.current.value;
            if(validateCaptcha(user_capture_value)){
                setDisable(false)
        
            }
            else{
                setDisable(true)
            }
    }


    const handlelogin=event=>{
            event.preventDefault()
            const form=event.target;
            const email=form.email.value;
            const password=form.password.value;
            singIn(email,password)
            .then(result=>{
              const currentUser= result.user;
              console.log(currentUser)
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Login",
                showConfirmButton: false,
                timer: 1500
              });
              
              navigate(from, { replace: true });
            })
            .catch(error=>{
              Swal.fire({
                position: "center",
                icon: "error",
                title: `${error} 
                `,
                showConfirmButton: false,
                timer: 1500
              });
            })

            

           
    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col my-20">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
      <form onSubmit={handlelogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control">
        <label className="label">
        <LoadCanvasTemplate />
          </label>
          <input type="text" ref={capcaRef} name='capcha' placeholder="type capcata value" className="input input-bordered" required />
          <h2  onClick={handleCapture} className='btn btn-outline btn-xs'>validate capture</h2>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-2">
          <input disabled={disable} className='btn btn-primary' type="submit" value="Login" />
        </div>
        <p>New here ? <small className='text-yellow-500'><Link to='/register'>Please Register</Link></small></p>
        <div className="divider"></div>
        <GoogleLogin></GoogleLogin>
        
      </form>
      
      
      
    </div>
  </div>
</div>
    );
};

export default Login;