import React, { Children, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../FireBase/firebase.config';
import useAxiosSecurePublic from '../Hooks/useAxiosSecurePublic';



export const AuthContext=createContext(null)
const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const [users,setUsers]=useState(null)
    const [loading,setLoading]=useState(true)
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
    const resetPassword= (email,password)=>{
        setLoading(true)
        return sendPasswordResetEmail(auth,email)
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
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false)
                    }
                })

            }
            else{
                //do something
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        });
        return ()=>{
            return unsubcribe();
        }
    },[axiosSecurePublic])

   const authInfo={
        users,
        loading,
        createUsers,
        singIn,
        logOut,
        updateProFileUser,
        googleSignIn,
        resetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
               {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;