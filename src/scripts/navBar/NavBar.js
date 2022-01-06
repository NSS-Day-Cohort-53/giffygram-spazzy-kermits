<<<<<<< HEAD
import { getCurrentUser, getMessages, getUsers } from "../dataAccess.js"
import { msgClose, msgOpen, getMsgCol, setMsgColFalse, setMsgColTrue } from "../messages/MessageSideBar.js";
=======
import { getCurrentUser, getLikes, getUsers, setChosenUser } from "../dataAccess.js";
import { msgClose, msgOpen, getMsgCol, setMsgColFalse, setMsgColTrue } from "../messages/MessageSideBar.js";
import { LoginForm } from "../auth/Login.js";
>>>>>>> main

export const Navbar = () => {
    const currentUser = getCurrentUser();
    const users = getUsers();
    const allMessages = getMessages();
    const userMessages = allMessages.filter(msg => msg.recipientId === currentUser.id);

    // we'll add specific images later
    return `
        <img class="navbarItem navColBtn" id="navColBtn" src="images/betaLogo.png" alt="AltText" width="50px" />
        <section class="navbarCollapse navbarItem">
<<<<<<< HEAD
            <div id="homeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Home</div>
            <div id="userBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />${currentUser.firstName} ${currentUser.lastName}</div>
            <div id="notification" class="navcolItem notification"><img id="notifImg" class="notification notifImg" src="${(userMessages.length > 0) ? "images/notification-bell-filled.png" : "images/notification-bell-empty.png"}" alt="AltText" width="30px" />${(userMessages.length > 0) ? `<div class="notifNumberContainer"><span class="notifNumber">${userMessages.length}</span></div>` : ""}</div>
            <div id="writeMessageBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Compose Message</div>
            <div id="postGifBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Post Gif</div>
            <div id="filterLikeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Filter By Likes</div>
=======
            <span id="homeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Home</span>
            <span id="userBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />${
                currentUser.firstName
            } ${currentUser.lastName}</span>
            <span id="notification" class="navcolItem notification"><img id="notifImg" class="notification notifImg" src="images/betaLogo.png" alt="AltText" width="50px" />Notifications</span>
            <span id="writeMessageBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Compose Message</span>
            <span id="postGifBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Post Gif</span>
>>>>>>> main
            <select id="filterDropDown" class="navcolItem">
                    <option value="0">Filter by name</option>
                    ${users
                        .map((user) => {
                            return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`;
                        })
                        .join("")}
            </select>
            <div id="logoutBtn" class="navcolItem"><img id="logoutImg" src="images/betaLogo.png" alt="AltText" width="50px" />Log Out</div>
        </section>
    `;
};

//grab items from dom
const mainContainer = document.querySelector(".beta");

//collapse functions
export const navOpen = () => {
    document.querySelector(".navbarCollapse").style.width = "10vw";
    document.querySelector(".postFeed").style.marginLeft = "10vw";
};

export const navClose = () => {
    document.querySelector(".navbarCollapse").style.width = "0";
    document.querySelector(".postFeed").style.marginLeft = "0";
};

//collapse event listener and variable
let navCollapsed = true;

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "navColBtn") {
        if (navCollapsed) {
            navOpen();
            navCollapsed = false;
        } else {
            navClose();
            navCollapsed = true;
        }
    }
});

//open messages window button event listener
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "notification" || clickEvent.target.id === "notifImg") {
        if (getMsgCol()) {
            msgOpen();
            setMsgColFalse();
        } else {
            msgClose();
            setMsgColTrue();
        }
    }
});
//sends user to login page when logout button is clicked
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "logoutBtn" || clickEvent.target.id === "logoutImg") {
        localStorage.removeItem("beta_user");
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "filterDropDown") {
        setChosenUser(parseInt(event.target.value));
        mainContainer.dispatchEvent(new CustomEvent("postListChanged"));
    }
});
