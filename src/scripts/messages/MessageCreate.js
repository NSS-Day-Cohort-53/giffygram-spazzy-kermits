import { getUsers, sendMessage, getCurrentUser, setDisplayMessageCreateFalse } from "../dataAccess.js";

const mainContainer = document.querySelector(".beta");

export const MessageForm = () => {
	const users = getUsers();
	const currentUser = getCurrentUser();

	let html = `  
    <div class="messageForm">      
                <select id="msgRecList" class="messageFormItem recipientList">
                    <option value = "0">Choose Recipient</option>
                        ${users
							.map((user) => {
								if (currentUser.id === user.id) {
									return "";
								} else {
									return `
                                <option class="recipientListItem" value="${user.id}">${user.firstName} ${user.lastName}</option>
                            `;
								}
							})
							.join("")}
                </select>
                <textarea type="text" class="messageTextArea" name="messageCreate" placeholder="Write Message Here"></textarea>
            <button class="sendMessageBtn messageFormItem" id="sendMessage">Send</button>
    </div>`;
	return html;
};

mainContainer.addEventListener("click", (event) => {
	if (event.target.id === "sendMessage") {
		const author = getCurrentUser();
		const currentMessage = document.querySelector(
			"textarea[name='messageCreate']"
		).value;
		const recipientSelect = document.querySelector(
			"select[id='msgRecList']"
		);
		const currentRecipient = parseInt(
			recipientSelect.options[recipientSelect.selectedIndex].value
		);
		const timestamp = Date.now();
		const authorId = author.id;

		const dataToSendToAPI = {
			recipientId: currentRecipient,
			message: currentMessage,
			authorId: authorId,
			timestamp: timestamp,
			read: false
		};

		sendMessage(dataToSendToAPI).then(() => {
			window.alert("Message Successfuly Sent");
			msgWriteClose();
			setDisplayMessageCreateFalse();
			mainContainer.dispatchEvent(new CustomEvent("msgListChanged"));
		});
	}
});

//collaspe functions
export const msgWriteOpen = () => {
	document.querySelector(".msgCreate").style.height = "150px";
	document.querySelector(".msgCreate").style.overflowY = "auto";
	document.querySelector(".msgList").style.marginTop = "150px";
};

export const msgWriteClose = () => {
	document.querySelector(".msgCreate").style.height = "0";
	document.querySelector(".msgCreate").style.overflowY = "hidden";
	document.querySelector(".msgList").style.marginTop = "0";
};

