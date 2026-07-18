import { useState } from "react";
import { useEffect } from 'react';

function Profile() {
    const [ profile , setProfile ] = useState({});
    const getData = async ()=> {
    const response = await fetch("http://localhost:8080/home/profile", {
            method: "GET",
            credentials: "include"

        });
        const data = await response.json();
        setProfile(data);
    }
    useEffect(() => {
   getData();
   }, []);
    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Profile</h2>
                <p className="text">{profile.username}</p>
                <p className="text">{profile.email}</p>

            </div>
        </div>
    );
}
export default Profile;