
// GENIUS AI - NAVIGATION

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("pageTitle");

function openPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    const selectedButton = document.querySelector(
        `.nav-btn[data-page="${pageName}"]`
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    pageTitle.textContent =
        pageName.charAt(0).toUpperCase() + pageName.slice(1);
}

// Sidebar navigation
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        openPage(button.dataset.page);
    });
});

// Dashboard card navigation
document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        openPage(button.dataset.go);
    });
});

// GENIUS CHAT DEMO


// GENIUS CHAT - REAL AI CONNECTION

const AI_API_URL = "https://geniusaibrain.pranit4829.workers.dev/";

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

let chatHistory = [];

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = "message " + sender;
    message.textContent = text;

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;

    return message;
}

chatForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    chatHistory.push({
        role: "user",
        content: message
    });

    const loadingMessage = addMessage(
        "Genius AI is thinking...",
        "bot"
    );

    const submitButton = chatForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) submitButton.disabled = true;

    try {
        const response = await fetch(AI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: chatHistory
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "AI request failed");
        }

        if (!data.reply) {
            throw new Error("No AI response received");
        }

        loadingMessage.textContent = data.reply;

        chatHistory.push({
            role: "assistant",
            content: data.reply
        });

loadingMessage.textContent =
    "AI Error: " + error.message;

        console.error("Genius AI Error:", error);

        // Remove the failed question from conversation history
        chatHistory.pop();

    } finally {
        if (submitButton) submitButton.disabled = false;

        chatBox.scrollTop = chatBox.scrollHeight;
        userInput.focus();
    }
});


// GENIUS SMART NOTES

const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveNoteButton = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");

// Load previously saved notes
let savedNotes = JSON.parse(
    localStorage.getItem("geniusNotes") || "[]"
);

function displayNotes() {
    notesList.innerHTML = "";

    if (savedNotes.length === 0) {
        notesList.innerHTML = "<p>No notes saved yet.</p>";
        return;
    }

    savedNotes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "note-card";

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const content = document.createElement("p");
        content.textContent = note.content;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-note";
        deleteButton.textContent = "Delete Note";

        deleteButton.addEventListener("click", () => {
            savedNotes.splice(index, 1);

            localStorage.setItem(
                "geniusNotes",
                JSON.stringify(savedNotes)
            );

            displayNotes();
        });

        card.appendChild(heading);
        card.appendChild(content);
        card.appendChild(deleteButton);

        notesList.appendChild(card);
    });
}

// Save a new note
saveNoteButton.addEventListener("click", () => {

    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (title === "" || content === "") {
        alert("Please enter both a title and note content!");
        return;
    }

    savedNotes.push({
        title: title,
        content: content
    });

    localStorage.setItem(
        "geniusNotes",
        JSON.stringify(savedNotes)
    );

    noteTitle.value = "";
    noteContent.value = "";

    displayNotes();

    alert("Your note has been saved successfully!");
});

// Display saved notes when page opens
displayNotes();
