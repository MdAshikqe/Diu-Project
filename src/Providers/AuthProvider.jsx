import React, { Children, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../FireBase/firebase.config';
import useAxiosSecurePublic from '../Hooks/useAxiosSecurePublic';



export const authContext=createContext(null)
const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const [users,setUsers]=useState(null)
    const [loading,setLoading]=useState(null)
    const googleProvider= new GoogleAuthProvider()
    const axiosSecurePublic=useAxiosSecurePublic()
   

    const googleSignIn=()=>{
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }

    const createUsers= (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const singIn= (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut= ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateProFileUser=(name,photo)=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(()=>{
      const unsubcribe = onAuthStateChanged(auth, currentUser=>{
            setUsers(currentUser)
            console.log('current user now',currentUser)
            if(currentUser){
                // set token and store
                const userInfo={email: currentUser.email}
                axiosSecurePublic.post('/jwt',userInfo )
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })

            }
            else{
                //do something
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        });
        return ()=>{
            return unsubcribe();
        }
    },[])

   const authInfo={
        users,
        loading,
        createUsers,
        singIn,
        logOut,
        updateProFileUser,
        googleSignIn
    }

    return (
        <authContext.Provider value={authInfo}>
               {children}
        </authContext.Provider>
    );
};

export default AuthProvider;