import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate,validateCaptcha } from 'react-simple-captcha';
import { AuthContext} from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const Login = () => {
  const {singIn,resetPassword}=useContext(AuthContext)
  const navigate=useNavigate()
  const location= useLocation()
  const emailRef = useRef(null);
  const from = location.state?.from?.pathname || "/";

    // useEffect(()=>{
    //     loadCaptchaEnginge(6); 
    // },[])
    // const [disable,setDisable]=useState(true)
    // const capcaRef= useRef(null)

    // const handleCapture=()=>{
    //     const user_capture_value= capcaRef.current.value;
    //         if(validateCaptcha(user_capture_value)){
    //             setDisable(false)
        
    //         }
    //         else{
    //             setDisable(true)
    //         }
    // }
    
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
    const handleForgetPassword = () => {
      const email = emailRef.current.value;
      if (!email) {
          console.log('pelase provide an email', emailRef.current.value)
          return;
      }
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          console.log('please write a valid email')
          return;
      }

      // send validation email
      resetPassword(email)
      .then(() =>{
          alert('please check your email')
      })
      .catch(error =>{
          console.log(error)
      })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col  lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
      <form onSubmit={handlelogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control">
        {/* <label className="label">
        <LoadCanvasTemplate />
          </label>
          <input disabled type="text" ref={capcaRef} name='capcha' placeholder="type capcata value" className="input input-bordered" required />
          <h2   onClick={handleCapture} className='btn btn-outline btn-xs'>validate capture</h2> */}
          <label className="label">
            <a href="#"  onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-2">
          {/* <input disabled={disable} className='btn btn-primary' type="submit" value="Login" /> */}
          <input  className='btn btn-primary' type="submit" value="Login" />
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