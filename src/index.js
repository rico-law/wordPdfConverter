const electron = require("electron");
const { is } = require('electron-util');
const BrowserWindow = electron.remote.BrowserWindow;
let dropArea = document.getElementById('dropArea');

// Make sure default action is not applied on all events we want to handle
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle event dropping of file
dropArea.addEventListener('drop', handleDrop, false);
document.getElementById("chooseFile").addEventListener('click', onClickChooseFile);
document.getElementById("chooseFileAgain").addEventListener('click', onClickChooseFileAgain);
document.getElementById("convertFiles").addEventListener('click', onClickConvertClicked);

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    handleFiles(e.dataTransfer.files);
}

function resetColour(label) {
    label.style.color = "#000000";
}

// These functions change the color of the label when clicked and reverts the colours
// in case the user clicks cancel or exits out of the file explorer without choosing a file
function onClickChooseFile() {
    this.style.display = "none";
    document.getElementById("chooseFileClickedText").style.display = "flex";
    setTimeout(() => {
        this.style.display = "flex";
        document.getElementById("chooseFileClickedText").style.display = "none";
    }, 300);
}

function onClickChooseFileAgain() {
    this.style.display = "none";
    document.getElementById("chooseFileAgainClickedText").style.display = "flex";
    setTimeout(() => {
        this.style.display = "flex";
        document.getElementById("chooseFileAgainClickedText").style.display = "none";
    }, 300);
}


function onClickConvertClicked() {
    // Show reaction to label being pressed
    this.style.display = "none";
    document.getElementById("convertFilesClickedText").style.display = "flex";
    setTimeout(() => {
        this.style.display = "flex";
        document.getElementById("convertFilesClickedText").style.display = "none";
    }, 300);
    showModal(true);
    // convertFiles();
}

function showModal(toShow) {
    console.log("used fcn");
    let modal = document.getElementById("modalWrapper");
    modal.style.display = toShow ? "block" : "none";
}

document.getElementById("closeButton").addEventListener("click", () => {
    document.getElementById("modalWrapper").style.display = "none";
});

window.addEventListener("click", (e) => {
    // If you click anywhere in the darkened area hide the modal
    if (e.target == document.getElementById("modalWrapper")) {
        showModal(false);
    }
});