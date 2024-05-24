import * as React from "react";
import { useState } from "react";

function Login({ users, setLoginStatus }) {

    function loginUser() {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name === username && users[i].password === password) {
                setLoginStatus(1);
                console.log("hi")
            }
        }
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <form>
                <h1>歡迎回來</h1>
                <h2>賬戶名稱</h2>
                <input className="input-field" type="text" onChange={(e) => {
                    setUsername(e.target.value);
                }} value={username}></input>
                <h2>賬戶密碼</h2>
                <input className="input-field" type="password" onChange={(e) => {
                    setPassword(e.target.value);
                }} value={password}></input>
                <button type="button" onClick={() => {
                    loginUser();
                }}>登入</button>
            </form>
        </>
    )
}

export default Login;