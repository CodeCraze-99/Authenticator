function SignIn() {
    const onSubmit = ()=> {
        const response = await fetch("http://localhost:8080/home/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password,
        })
    })
    return(
        <div>
            <form>
                <input name="username" type="text" placeholder="enter username" />
                <br />
                <input name="email"  type="text" placeholder="enter email"/>
                <br />
                <input name="password"  type="text" placeholder="enter password" />
                <br />
                <button>Create account</button>
                <br />
            </form>
        </div>
    );
}}

export default SignIn;