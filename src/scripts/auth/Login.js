import { getUsers } from "../dataAccess.js";
import { setAuthStateLogin, setAuthStateReg } from "./Auth.js";

document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null;
        const userState = getUsers();

        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user;
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("beta_user", foundUser.id);
            document.querySelector(".beta").dispatchEvent(new CustomEvent("stateChanged"));
        }
    }
});

//When register button is clicked, change authState to register and send out stateChanged event so main will rerender the whole app with register being returned for Auth()
document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "registerButton") {
        setAuthStateReg();
        document.querySelector(".beta").dispatchEvent(new CustomEvent("stateChanged"));
    }
});

export const LoginForm = () => {
    return `
        <div class="loginForm">
            <form>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            <button id="registerButton">Register</button>
        </div>
    `;
};
