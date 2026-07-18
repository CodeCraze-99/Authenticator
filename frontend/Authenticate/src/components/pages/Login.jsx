import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

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
        const data = await response.json();
        if (response.ok) {
            navigate("/profile");
        }
           else {
          setError(data.message);
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
     
    }
     
     useEffect(() => {
            isLogged();
        }, []);
    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Login</h2>
                {error && <p className="error">{error}</p>}
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