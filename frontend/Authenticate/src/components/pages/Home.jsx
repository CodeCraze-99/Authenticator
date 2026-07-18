import Register from "./Register.jsx";
import Login from "./Login.jsx";

function Home() {
    let isLogged = false;

    if (isLogged) {
        return <Login />;
    }

    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Welcome</h2>
                <Register />
                <p className="text">Already have an account? Login here</p>
            </div>
        </div>
    );
}

export default Home;