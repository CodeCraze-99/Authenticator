import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
function Profile() {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch("http://localhost:8080/home/profile", {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) {
            navigate("/login");
            return;
        }
        setProfile(data);
    };

    const logOut = async ()=> {
        const response = await fetch("http://localhost:8080/home/logout", {
            method: "POST",
            credentials: "include"
        })
        if(response.ok) {
           navigate("/login");
        }
    };
    
    const deleteUser = async ()=> {
        const response = await fetch("http://localhost:8080/home/delete", {
            method: "DELETE",
            credentials: "include",
    })
    if(response.ok) {
        navigate("/");
    }
}

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Profile</h2>
                {profile.username ? (
                    <>
                        <div className="profileRow">
                            <span className="profileLabel">Username</span>
                            <span className="profileValue">{profile.username}</span>
                        </div>
                        <div className="profileRow">
                            <span className="profileLabel">Email</span>
                            <span className="profileValue">{profile.email}</span>
                        </div>
                         <div className="profileRow actionButtons">
                            <button className="button secondary" onClick={logOut}>Logout</button>
                            <button className="button danger" onClick={deleteUser}>Delete Account</button>
                        </div>
                    </>
                ) : (
                    <p className="text">Loading profile…</p>
                )}
            </div>
        </div>
    );
}
export default Profile;