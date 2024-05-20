import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaPersonBooth, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import SectionHeader from '../../../../Shared/SectionHeader/SectionHeader';


const Allusers = () => {
    const [axiosSecure]= useAxiosSecure()
    const {data:users=[],refetch}=useQuery({
        queryKey:['users'],
        queryFn: async ()=> {
            const res=await axiosSecure.get('/user')
          return res.data;
        }
    })
    const handleMakeAdmin=user=>{
        axiosSecure.patch(`/user/admin/${user._id}`)
        .then(res=>{
            if(res.data.modifiedCount >0){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${user.name}is admin now`,
                    showConfirmButton: false,
                    timer: 1800
                  });
                  refetch()

            }
            
        })

    }


    const handleDeleteUser=id=>{
        console.log("delete")
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${id}`)
                .then(res=>{
                    if(res.data.deletedCount >0 ){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                    refetch()
                })
              
            }
          });
    }
    return (
        <div>
          <SectionHeader heading="MANAGE ALL USERS" subHeading="How many??"></SectionHeader>

            <div className='flex justify-evenly'>
                <h1 className='text-2xl font-medium'>All Users:</h1>
                <h1 className='text-2xl font-medium'>Total Users:- {users.length}</h1>
            </div>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className='text-xl font-medium'>#</th>
        <th className='text-xl font-medium'>Name</th>
        <th className='text-xl font-medium'>Email</th>
        <th className='text-xl font-medium'>Role</th>
        <th className='text-xl font-medium'>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index)=><tr className="hover" key={user._id}>
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                {user.role? <div className='text-red-600 font-medium text-xl'>Admin</div> : <button onClick={()=>handleMakeAdmin(user)} className='btn  bg-green-500'><FaUsers className='text-2xl'></FaUsers></button>}
            </td>
            <td><button onClick={()=>handleDeleteUser(user._id)}  className="btn bg-red-500"><FaTrashAlt className=' text-2xl'></FaTrashAlt></button></td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Allusers;