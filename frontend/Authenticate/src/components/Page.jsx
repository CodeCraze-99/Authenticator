import Signin from "./Signin.jsx";
import Login from "./Login.jsx";

function Page() {
    preventDefault();
    let isLogged = false;
    if(islogged) {
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