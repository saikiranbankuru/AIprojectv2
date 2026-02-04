function addMessage(text, sender) {

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-bubble ${sender === 'user' ? 'user-msg' : 'ai-msg'}`;

    // User Name & Bot Name
    const userName = "Sai Kiran";
    const botName = "Nexus AI";

    // Random bot image (Replace later)
    const botImg = "https://i.pravatar.cc/100?img=33";

    // Header (inside bubble)
    const headerDiv = document.createElement("div");
    headerDiv.className = "msg-header";

    if (sender === "user") {
        headerDiv.innerHTML = `<span>${userName}</span>`;
    } else {
        headerDiv.innerHTML = `
            <img src="${botImg}" class="bot-avatar" alt="Bot">
            <span>${botName}</span>
        `;
    }

    // Message Text
    const textDiv = document.createElement("div");
    textDiv.className = "msg-text";
    textDiv.innerText = text;

    msgDiv.appendChild(headerDiv);
    msgDiv.appendChild(textDiv);

    // ✅ AI Footer (references + icons)
    if (sender === "ai") {

        const footerDiv = document.createElement("div");
        footerDiv.className = "ai-footer";

        const refDiv = document.createElement("div");
        refDiv.className = "ai-references";
        refDiv.innerHTML = `
            <a href="https://example.com" target="_blank"><i class="bi bi-link-45deg me-1"></i>Reference 1</a>
            <a href="https://example.com" target="_blank"><i class="bi bi-link-45deg me-1"></i>Reference 2</a>
            <a href="https://example.com" target="_blank"><i class="bi bi-link-45deg me-1"></i>Reference 3</a>
        `;

        const actionDiv = document.createElement("div");
        actionDiv.className = "ai-actions";
        actionDiv.innerHTML = `
            <i class="bi bi-clipboard" title="Copy"></i>
            <i class="bi bi-hand-thumbs-up" title="Like"></i>
            <i class="bi bi-hand-thumbs-down" title="Dislike"></i>
        `;

        // Copy Function
        actionDiv.querySelector(".bi-clipboard").addEventListener("click", () => {
            navigator.clipboard.writeText(text);
        });

        footerDiv.appendChild(refDiv);
        footerDiv.appendChild(actionDiv);

        msgDiv.appendChild(footerDiv);
    }

    document.getElementById('message-list').appendChild(msgDiv);

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}




/* --- Bubble Header --- */
.msg-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
    opacity: 0.9;
}

.msg-header .bot-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.12);
}

.msg-text {
    font-size: 15px;
    line-height: 1.5;
}

/* AI Footer */
.ai-footer {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13px;
}

.ai-references {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.ai-references a {
    text-decoration: none;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #f2c94c;
    transition: 0.2s;
}

.ai-references a:hover {
    background: rgba(242, 153, 74, 0.15);
    color: #f2994a;
}

.ai-actions {
    display: flex;
    gap: 15px;
    align-items: center;
    color: var(--bs-secondary-color);
}

.ai-actions i {
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
}

.ai-actions i:hover {
    color: #f2994a;
}
