import * as React from "react";
import { useState } from "react";
import { checkUserPassword } from "./APIHandler.tsx"

function Login({ setPointsDB, loadLocations, setUserId, setLoginStatus }) {

    async function loginUser() {
        const login = await checkUserPassword(username, password);
        if (login.status) {
            setUserId(login.id);

            setLoginStatus(1);

            return;
        }
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
                <button type="button" onClick={() => {
                    loginUser();
                }}>登入</button>
            </form>
        </>
    )
}

export default Login;