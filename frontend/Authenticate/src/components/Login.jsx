function Login() {
    return(
        <div>
            <form>
                <input name="username" type="text" placeholder="enter username" />
                <br />
                <input name="email"  type="text" placeholder="enter email"/>
                <br />
                <input name="password"  type="text" placeholder="enter password" />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;