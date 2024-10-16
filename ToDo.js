document.addEventListener("DOMContentLoaded", (event) => onLoaded());

const elements = [];
function onLoaded() {
    document.getElementById("add").addEventListener("click", (event) => addItem());

}


//Adds item to the todo list if it is valid, if empty, do nothing, if duplicate, show warning
function addItem() {
    let input = document.getElementById("inputTask");
    let text = input.value;
    if (text !== "") {
        if (assertUnique(text)) {
            document.getElementById("alertItem").classList.add("d-none");
            input.value = "";
            addToHTML(createNewElement(text));
            document.getElementById(`${text}-btn-remove`).addEventListener("click", (event) => removeThis(text))
            elements.push(text);
        }
        else
            document.getElementById("alertItem").classList.remove("d-none");
    }

}

//Creates new template element, sets tid to text, sets innteHTML to item template
function createNewElement(text) {
    let template = document.createElement("div");
    template.id = text;
    template.innerHTML = `                        <li class="list-group-item" ">
                            <div class="row">
                                <button type="button" class="btn btn-task col-10 active" data-bs-toggle="button" aria-pressed="true">${text}</button>
                                <button type="button" class="btn btn-dark btn-remove col-1" id="${text}-btn-remove"><i class="bi bi-x-square"></i>
                                </button>
                            </div>
                        </li>`
    return template;
}

//adds item to the todo list
function addToHTML(item) {
    document.getElementById("taskGroup").appendChild(item);
}


//removes item from the todo list
function removeThis(name) {
    document.getElementById("taskGroup").removeChild(document.getElementById(name));
    elements.splice(elements.indexOf(name), 1);

}

// checks if the element to be added is unique
function assertUnique(name) {
    if (elements.indexOf(name) !== -1)
        return false;
    return true;
}