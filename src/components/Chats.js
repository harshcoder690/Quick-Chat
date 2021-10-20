import React , {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase';

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";



const Chats = () =>{
    const history = useHistory();
    const { user }  = useAuth();
    const [loading,setLoading] = useState(true);

    console.log("Fetched user", user);

    const handlelogout = async () =>{
        await auth.signOut();

        history.push("/");
    };
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
    
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
      };
    
      useEffect(() => {
        if (!user) {
          history.push("/");
    
          return;
        }
    
        const loadData = async () => {
          try {
            let res = axios.get("https://api.chatengine.io/users/me/", {
              headers: {
                "project-id": "b372f60b-c3a4-44d3-ab 4b-d1e326e86ce0",
                "user-name": user.email,
                "user-secret": user.uid,
              },
            });
            setLoading(false);
            console.log("Response", res);
          } 
          catch (error) {
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);
    
            await getFile(user.photoURL).then(async (avatar) => {
              formdata.append("avatar", avatar, avatar.name);
    
              await axios
                .post("https://api.chatengine.io/users/", formdata, {
                  headers: {
                    "private-key": "89495fce-eb6e-4d30-86d6-30f1122e0b1e",
                  },
                })
                .then(() => {
                  setLoading(false);
                  console.log("success here");
                })
                .catch((error) => console.log(error));
            });
            console.log(error);
          }
        };
    
        loadData();
      }, [user, history]);
    

    if(!user || loading){
        return "Loading............"
    }

    return (
         <div className="chats-page">
              <div className="nav-bar">
                   <div className="logo-tab">
                       QuickChat
                   </div>
                   <div onClick  = {handlelogout} className="logout-tab">
                      <button>Logout</button>
                   </div>
              </div>
              <ChatEngine 
                  height="calc(100vh - 66px)"
                  projectID="b372f60b-c3a4-44d3-ab4b-d1e326e86ce0"
                  userName={user.email}
                  userSecret={user.uid}
                  offset={6} 
              />
         </div>
    );
};
export default Chats;