"use strict";

const contacts = [
    "1|Scott|scott@murach.com|1-559-555-5555",
    "2|Joel|joel@murach.com|1-409-555-5555",
    "3|Mike|mike@murach.com|1-363-555-5555"
];

const menuString = "COMMAND MENU\n" +
    "list - List all contacts\n" +
    "get # - Get contact with the specified number\n" +
    "exit - Exit program";

const menuBox = document.getElementById("menu");
const logBox = document.getElementById("log");

menuBox.textContent = menuString;

// show a message in an alert box and also add it to the history on the page
function show(message) {
    logBox.textContent += message + "\n\n";
    alert(message);
}

// build the text for the list command
function listContacts() {
    let message = "CONTACT LIST";
    for (let i = 0; i < contacts.length; i++) {
        const fields = contacts[i].split("|");
        message += "\n" + fields[0] + ". " + fields[1];
    }
    return message;
}

// build the text for the get command
function getContact(number) {
    for (let i = 0; i < contacts.length; i++) {
        const fields = contacts[i].split("|");
        if (Number(fields[0]) === number) {
            return "CONTACT " + fields[0] + "\nName: " + fields[1] +
                "\nEmail: " + fields[2] + "\nPhone: " + fields[3];
        }
    }
    return "Contact not found.";
}

function runViewer() {
    while (true) {
        const input = prompt(menuString + "\n\nEnter a command:");

        // clicking Cancel gives back null
        if (input === null) {
            logBox.textContent += "> (Cancel)\n";
            break;
        }

        const command = input.trim();
        logBox.textContent += "> " + command + "\n";

        // split the command into words, like "get 1" -> ["get", "1"]
        const parts = command.split(" ");
        const action = parts[0].toLowerCase();

        if (action === "exit") {
            break;
        } else if (action === "list") {
            show(listContacts());
        } else if (action === "get") {
            show(getContact(parseInt(parts[1])));
        } else {
            show("Invalid command. Please try again.");
        }
    }
    show("Goodbye!");
}

runViewer();
