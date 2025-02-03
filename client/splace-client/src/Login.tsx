import * as React from "react";
import { useState } from "react";
import { checkUserPassword } from "./APIHandler.tsx"

function Login({ setPointsDB, loadLocations, setUserId, setLoginStatus, setShowLoginFailed}) {

    async function loginUser() {
        const login = await checkUserPassword(username, password);
        if (login.status == 1) {
            setUserId(login.id);
            setLoginStatus(1);
            return;
        }
        console.log("Login failed");
        setShowLoginFailed(1);
        setLoginStatus(0);
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
                <a href="http://" className="forget-pass">忘記密碼</a>
                <button type="button" onClick={() => {
                    loginUser();
                }}>登入</button>
            </form>
        </>
    )
}

export default Login;