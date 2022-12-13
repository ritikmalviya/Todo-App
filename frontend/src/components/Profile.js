import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { account } from "../appwrite/appwriteConfig";
import CreateTodo from "./CreateTodo";
import Search from './Search'

const Profile = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState();

    useEffect(()=>{
        const getData = account.get()
        getData.then(
            function(res){
                setUserDetails(res)
            },
            function(error){
                console.log(error)
            }
        )
    },[])

    const logout = async() =>{
        try {
            await account.deleteSession('current')
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }


  return (
  <div>
    {userDetails ? (
        <div>
            <div className="flex justify-around mt-1">
                <p className="font-bold text-lg"> Hello {userDetails.name}</p>
                <button className="bg-red-600 text-white p-2 rounded-md" onClick={logout}> Logout </button>
            </div>


            <CreateTodo userId={userDetails.$id}/>
            <Search userId={userDetails.$id}/> 
        </div>
    ):(
        <div>
            <p>Please Login to see profile {" "}
            <Link to="/">
                <span>
                    Login
                </span>
            </Link>
            </p>
        </div>
    )}
  </div>)
};

export default Profile;
