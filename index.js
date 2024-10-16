document.addEventListener("DOMContentLoaded", (event) => onLoaded());

let bishValue = 0, boshValue = 0, targetNumberValue = 0;
let dataSet = false;
let cleared = true;
//binds objects  to event listeners
function onLoaded() {
    document.getElementById("bish").addEventListener("change", (event) => processInput("bish"));
    document.getElementById("bosh").addEventListener("change", (event) => processInput("bosh"));
    document.getElementById("target").addEventListener("change", (event) => processInput("target"));;
    document.getElementById("bish").addEventListener("keyup", (event) => processInput("bish"));
    document.getElementById("bosh").addEventListener("keyup", (event) => processInput("bosh"));
    document.getElementById("target").addEventListener("keyup", (event) => processInput("target"));;
    document.getElementById("run").addEventListener("click", (event) => runBishBosh());;
    document.getElementById("clear").addEventListener("click", (event) => ClearOutput());;

}

//precesses data field inputs
function processInput(sender) {

    switch (sender) {
        case "bish":
            bishValue = +(document.getElementById("bish").value);
            break;
        case "bosh":
            boshValue = +(document.getElementById("bosh").value);
            break;
        case "target":
            targetNumberValue = +(document.getElementById("target").value);
            break;
        default:
            break;
    }
    checkData();

}

//checks if all data is set
function checkData() {
    if (bishValue > 0 && boshValue > 0 && targetNumberValue > 1)
        dataSet = true;
    else
        dataSet = false;
    RunButtonHandler();
}

//makes sure run button is in correct state
function RunButtonHandler() {
    let button = document.getElementById("run");
    let bState = button.classList.contains("disabled")
    if (dataSet && bState)
        button.classList.remove("disabled");
    else if (!dataSet && !bState)
        button.classList.add("disabled");

}

//runs bish bosh
function runBishBosh() {

    let state = ValiData();
    const data = [];
    if (state) {
        for (let i = 1; i < targetNumberValue; i++) {
            let tempval = i;
            let bishcheck = i % bishValue === 0;
            if (i % boshValue === 0)
                if (bishcheck)
                    tempval = "Bish-Bosh";
                else
                    tempval = "Bosh";
            else if (bishcheck)
                tempval = "Bish";
            tempval = ` ${tempval} `;
            data.push(tempval);
        }
        cleared = false;
        ClearButtonHandler();
    }
    else
        data.push("Target should be greater than 2 and neither bish nor bosh should be greater than target");

    document.getElementById("output").innerHTML = data;
}

//checks if values passes pre-condition check
function ValiData() {
    if (targetNumberValue < 2 || targetNumberValue < bishValue || targetNumberValue < boshValue)
        return false;
    else return true;
}

//Displays and adjusts state of clear button
function ClearButtonHandler() {
    let b = document.getElementById("clear");
    if (b.classList.contains("d-none"))
        b.classList.remove("d-none")
    if (cleared)
        b.classList.add("disabled")
    else
        b.classList.remove("disabled")

}

//removes output when clear button is pressed
function ClearOutput() {

    cleared = true;
    document.getElementById("output").innerHTML = "";
    ClearButtonHandler();
}