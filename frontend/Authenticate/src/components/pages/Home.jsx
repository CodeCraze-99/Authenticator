import Register from "./Register.jsx";
import Login from "./Login.jsx";

function Home(event) {
    event.preventDefault();
    let isLogged = false;
    if(isLogged) {
        return(
            <Login></Login>
        );
    }
    else {
        return(
            <div>
            <Signin></Signin>
                <p>Already have an account? Login here</p>
            </div>

        );
    }
}

export default Home;