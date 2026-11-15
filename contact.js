// each contact is a string: name|email|phone
const contacts = [
    "Anne Jones|ajones@example.com|555-555-1234",
    "Mike Smith|msmith@example.com|555-555-5678",
    "Sara Lee|slee@example.com|555-555-9012",
    "Carlos Diaz|cdiaz@example.com|555-555-3456",
    "Tina Brown|tbrown@example.com|555-555-7890"
];

const MENU = "COMMAND MENU\n" +
    "list - Display all contacts\n" +
    "get # - Display one contact by its number\n" +
    "exit - Exit the program";

const startBtn = document.getElementById("startBtn");
const menuBox = document.getElementById("menu");
const logBox = document.getElementById("log");

menuBox.textContent = MENU;

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
        message += "\n" + (i + 1) + ". " + fields[0];
    }
    return message;
}

// build the text for the get command
function getContact(number) {
    const index = number - 1;
    if (isNaN(index) || index < 0 || index >= contacts.length) {
        return "Contact not found. Please enter a number from 1 to " + contacts.length + ".";
    }
    const fields = contacts[index].split("|");
    return "CONTACT " + number + "\nName: " + fields[0] +
        "\nEmail: " + fields[1] + "\nPhone: " + fields[2];
}

function runViewer() {
    while (true) {
        const input = prompt(MENU + "\n\nEnter a command:");

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

startBtn.addEventListener("click", runViewer);
