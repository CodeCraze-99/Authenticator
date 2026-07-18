import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/home/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                password,
                email,
            })
        });
        if (response.ok) {
            navigate("/profile");
        }
    };

    const isLogged = async ()=> {
        const response = await fetch("http://localhost:8080/home/profile", {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) { 
            navigate("/profile");
        }
        else {
          navigate("/login");
        }
    }
     
     useEffect(() => {
            isLogged();
        }, []);
    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Login</h2>
                <form onSubmit={onSubmit} className="form">
                    <input
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        type="text"
                        placeholder="Enter username"
                    />
                    <input
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="text"
                        placeholder="Enter email"
                    />
                    <input
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                    />
                    <button className="button">Login</button>
                </form>
                <Link className="linkButton" to="/register">
                    Don't have an account? Create one
                </Link>
            </div>
        </div>
    );
}

export default Login;