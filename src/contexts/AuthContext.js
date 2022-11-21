import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";
import { auth } from "../firebase";


const AuthContext = React.createContext();

export  function useAuth(){
    return useContext(AuthContext);
}



export function AuthProvider({children}){
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState("")

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    },[])

    //signup funtion
    async function signup(email, password, username){
        await createUserWithEmailAndPassword(auth, email, password);

        //update profile
        await updateProfile(auth.currentUser, {
            displayName: username,
        });

        const user = auth.currentUser;
        
        setCurrentUser({
            ...user,
        });

    }

    //login function
    function singin(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout funtion
    function logout(){
        return signOut(auth);
    }

    const value = {
        currentUser,
        signup,
        singin,
        logout,
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}