import React from 'react';

import "firebase/app";

import { auth } from "./firebase";
import firebase from "firebase/app";

const Login = () => {
    return (
       <div id = "login-page">
           <div id = "login-card">
               <h2>Welcome to QuickChat!</h2>
               <div className = "login-button google" 
               onClick={async () =>
            await auth.signInWithRedirect(
              new firebase.auth.GoogleAuthProvider()
            )
          }
               >
                  <i class="fab fa-google"></i> Sign In With Google
               </div>
               <br />
               <br />
               <div className = "login-button facebook"
           onClick={async () => {
            console.log("facebook");
            await auth.signInWithRedirect(
              new firebase.auth.FacebookAuthProvider()
            );
          }}
               >
                  <i class="fab fa-facebook"></i> Sign In With Facebook
               </div>
           </div>
       </div>
    );
}

export default Login;