function Login() {
     const onSubmit = async (event) => {
        event.preventDefault();

        await fetch("http://localhost:8080/home/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email,
                isLogged,
            })
        });
    };
    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Login</h2>
                <form  onSubmit={onSubmit}  className="form">
                    <input className="input" name="username" type="text" placeholder="Enter username" />
                    <input className="input" name="email" type="text" placeholder="Enter email" />
                    <input className="input" name="password" type="password" placeholder="Enter password" />
                    <button className="button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
// add oonsbumit post request here