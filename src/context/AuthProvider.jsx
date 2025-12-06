import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { auth } from '../utilities/firebase.config';


const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    
    // register user
    const reginsterUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // signup user 
    const signInUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // signin with google
    const Provider = new GoogleAuthProvider();
    const signInGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth,Provider)
    }

    //update profile 
    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }

    // singout 

    const logOut = () =>{
        return signOut(auth)
    }

    // onserver user state 
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser)
        })
        return () =>{
            unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        reginsterUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile
    }
    
    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;