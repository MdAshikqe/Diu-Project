import React, { useContext } from 'react';
import { authContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecurePublic from '../../Hooks/useAxiosSecurePublic';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import useCarts from '../../Hooks/useCarts';

const Register = () => {
    const {createUsers,updateProFileUser}=useContext(authContext)
    const axiosSecurePublic = useAxiosSecurePublic()
    const navigate= useNavigate()
  //   const location= useLocation()
  // const from = location.state?.from?.pathname || "/";
  const [,refetch]=useCarts()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm()

      const onSubmit = (data) => {
        console.log(data)
        createUsers(data.email, data.password)
        .then(result=>{
            const currentUser= result.user;
            console.log(currentUser)
            updateProFileUser(data.name, data.photo)
            .then(()=>{
              const userInfo={
                name: data.name,
                email: data.email,
                photoURL: data.photo

              }
              axiosSecurePublic.post('/user',userInfo)
              .then(res=>{
                if(res.data.insertedId){
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Scuccessfuly Register",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                  
                }   
              })

              reset();
              navigate('/');
              
                
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
            
            

              

        })
        .catch(error=>console.log(error))
      }

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col my-20">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="name" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
          {errors.name?.type === "required" && (
        <p className='text-red-600'>Name is required</p>
      )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">PhotoURL</span>
          </label>
          <input type="photo" {...register("photo", { required: true })} placeholder="Your Photo" className="input input-bordered" />
          {errors.photo?.type === "required" && (
        <p className='text-red-600'>Photo is required</p>
      )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
          {errors.email?.type === "required" && (
        <p className='text-red-600'>Email is required</p>
      )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password", { required: true,maxLength: 20,
            minLength:6,
            pattern:/(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} placeholder="password" className="input input-bordered" />
          {errors.password?.type === "required" && (
        <p className='text-red-600'>Password is required</p>
      )}
      {errors.password?.type === "minLength" && (
        <p className='text-red-500'>Password at last 6 charcter</p>
          )}
          
           {errors.password?.type === "maxLength" && (
        <p className='text-red-500'>Password at last 20 charcter</p>
          )}
           {errors.password?.type === "pattern" && (
        <p className='text-red-500'>pasword have one special case letter,one digit,one lowercase letters</p>
          )}
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Register" />

        </div>
        <p>Already have a account ? <small className='text-green-500'><Link to='/login'>Please login</Link></small></p>
        <div className="divider"></div>
        <GoogleLogin></GoogleLogin>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;