import { useState } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/home/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        });
        // window.location.reload();

    console.log(response.status);
    console.log(await response.text());
    };

    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Sign in</h2>
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