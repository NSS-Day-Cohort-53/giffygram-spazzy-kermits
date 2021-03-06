import {
	fetchLikes,
	fetchMessages,
	fetchPosts,
	fetchUsers,
    setCurrentUser,
    getUsers
} from "./dataAccess.js";
import { Beta } from "./Beta.js";
import { Auth } from "./auth/Auth.js"

const mainContainer = document.querySelector(".beta");

export const renderApp = () => {
	Promise.all([
		fetchUsers(),
		fetchPosts(),
		fetchLikes(),
		fetchMessages()
	]).then(() => {
		const user = parseInt(localStorage.getItem("beta_user"));
		if (user) {
            //set the current user in our applicationState
            const users = getUsers();
            setCurrentUser(users.find(x => x.id === user));
			mainContainer.innerHTML = Beta();
		} else {
			mainContainer.innerHTML = Auth();
		}
	});
};

mainContainer.addEventListener("stateChanged", (event) => {
	renderApp();
});

renderApp();
