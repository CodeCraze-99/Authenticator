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

        // Optional:
        // window.location.reload();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    type="text"
                    placeholder="Enter username"
                />
                <br />

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="text"
                    placeholder="Enter email"
                />
                <br />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                />
                <br />

                <button type="submit">Create account</button>
            </form>
        </div>
    );
}

export default Register;