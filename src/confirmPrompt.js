const { remote } = require("electron");

console.log("plz help[");

document.getElementById("closeButton").addEventListener("click", onCloseClicked);
function onCloseClicked() {
    console.log("hey");
    remote.getCurrentWindow().close();
}
