"use strict";

// Stack used to store assignments
let assignmentStack = [];

// Get HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentInput = document.getElementById("assignmentInput");
const assignmentList = document.getElementById("assignmentList");
const totalCount = document.getElementById("totalCount");
const latestCount = document.getElementById("latestCount");
const peekBtn = document.getElementById("peekBtn");
const popBtn = document.getElementById("popBtn");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");

// Display messages
function showMessage(text, type = "success") {
    message.textContent = text;
    message.className = "message " + type;
}

// Update the assignment display
function renderAssignments() {
    assignmentList.replaceChildren();

    totalCount.textContent = assignmentStack.length;

    latestCount.textContent = assignmentStack.length > 0
        ? assignmentStack[assignmentStack.length - 1].title
        : "None";

    if (assignmentStack.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent =
            "No assignments yet. Add your first assignment!";

        assignmentList.appendChild(emptyMessage);
        return;
    }

    // Display the stack from top to bottom
    for (let i = assignmentStack.length - 1; i >= 0; i--) {
        const assignment = assignmentStack[i];

        const item = document.createElement("div");
        item.className = "assignment-item";

        if (i === assignmentStack.length - 1) {
            item.classList.add("top");
        }

        const number = document.createElement("div");
        number.className = "assignment-number";
        number.textContent = i + 1;

        const details = document.createElement("div");
        details.className = "assignment-details";

        const title = document.createElement("strong");
        title.textContent = assignment.title;

        const date = document.createElement("small");
        date.textContent = "Added: " + assignment.date;

        details.appendChild(title);
        details.appendChild(date);

        item.appendChild(number);
        item.appendChild(details);

        // Label the item at the top of the stack
        if (i === assignmentStack.length - 1) {
            const label = document.createElement("span");
            label.className = "top-label";
            label.textContent = "TOP";
            item.appendChild(label);
        }

        assignmentList.appendChild(item);
    }
}

// PUSH: Add an assignment to the stack
assignmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = assignmentInput.value.trim();

    if (title === "") {
        showMessage("Please enter an assignment name.", "error");
        return;
    }

    const assignment = {
        title: title,
        date: new Date().toLocaleString()
    };

    assignmentStack.push(assignment);

    renderAssignments();
    assignmentForm.reset();
    assignmentInput.focus();

    showMessage("Assignment added successfully!");
});

// PEEK: View the latest assignment
peekBtn.addEventListener("click", function() {
    if (assignmentStack.length === 0) {
        showMessage("The stack is empty.", "error");
        return;
    }

    const latest =
        assignmentStack[assignmentStack.length - 1];

    showMessage("Latest assignment: " + latest.title);
});

// POP: Remove the latest assignment
popBtn.addEventListener("click", function() {
    if (assignmentStack.length === 0) {
        showMessage("There are no assignments to remove.", "error");
        return;
    }

    const removed = assignmentStack.pop();

    renderAssignments();

    showMessage("Removed assignment: " + removed.title);
});

// Clear all assignments
clearBtn.addEventListener("click", function() {
    if (assignmentStack.length === 0) {
        showMessage("The stack is already empty.", "error");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to remove all assignments?"
    );

    if (confirmed) {
        assignmentStack = [];
        renderAssignments();
        showMessage("All assignments have been cleared.");
    }
});

// Initial display
renderAssignments();