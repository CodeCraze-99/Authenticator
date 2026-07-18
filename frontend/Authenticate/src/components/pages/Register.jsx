import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const response = await fetch("http://localhost:8080/home/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                email,
                password,
            })
        });
        const data = response.json();
        if (response.ok) {
            navigate("/profile");
        }
        else {
            setError(data.message);
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Sign in</h2>
                {error && <p className="error">{error}</p>}
                <form className="form" onSubmit={onSubmit}>
                    <input
                        className="input"
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        type="text"
                        placeholder="Enter username"
                    />

                    <input
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="text"
                        placeholder="Enter email"
                    />

                    <input
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                    />

                    <button className="button" type="submit">Create account</button>
                </form>
            </div>
        </div>
    );
}

export default Register;