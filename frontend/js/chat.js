const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    message.innerHTML = `
        <div class="message-content">
            <div class="markdown-body">
    ${marked.parse(text)}
</div>
            <span class="message-time">${time}</span>
        </div>
    `;

    chatBody.appendChild(message);

    chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", async () => {

    const text = chatInput.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    chatInput.value = "";
    const typing = document.createElement("div");

    typing.className = "message ai";
    typing.id = "typing";

    typing.innerHTML = `
<div class="message-content">
    <div class="typing">
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
`;

    chatBody.appendChild(typing);

    chatBody.scrollTop = chatBody.scrollHeight;

    // const token = localStorage.getItem("token");

    try {

        const response = await fetch("http://localhost:8080/ai/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();
        document.getElementById("typing")?.remove();

        addMessage(data.reply, "ai");

    } catch (error) {

        document.getElementById("typing")?.remove();

        console.error(error);

        addMessage("Unable to contact AI Server.", "ai");
    }

});