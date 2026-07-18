import { Link } from "react-router-dom";
import Register from "./Register.jsx";

function Home() {
  
    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Welcome</h2>
                <Register />
                <Link className="linkButton" to="/login">
                    Already have an account? Login here
                </Link>
            </div>
        </div>
    );
}

export default Home;