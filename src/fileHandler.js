// Class for file handling
class fileHandler {
    constructor() {};
    #filePaths = new Array();

    get nummberOfFiles() {
        return this.#filePaths.length;
    }

    get filePathsSaved() {
        return this.#filePaths;
    }

    addFilePath(path) {
        this.#filePaths.push(path);
    }

    // Removes at fileIndex, starts at 0
    removeFile(fileIndex) {
        this.#filePaths.splice(fileIndex, 1);
    }

    // Goes through current list of saved files and determines if path is in filePaths array
    isDuplicate(path) {
        for (let i = 0; i < this.nummberOfFiles; i++) {
            console.log("Comparing: ", path, " and ", this.#filePaths[i]);
            if (path == this.#filePaths[i]) {
                console.log("Found duplicate: ", require("path").basename(path));
                return true;
            }
        }
        return false;
    }
}

var handler = new fileHandler();
var erroredFiles = new fileHandler();
// Takes in a filelist and calls convert on files that are of the right type (word docs)
// TODO: This function needs to be changed to save all file names given, remove duplicates
//      and a new convert button needs to be added to convert all the saved file names
function handleFiles(myFiles) {
    document.getElementById("info").style.display = "none";
    document.getElementById("afterUpload").style.display = "flex";

    for (let i = 0; i < myFiles.length; i++) {
        let curFile = myFiles.item(i);
        let ext;
        try {
            ext = grabExtension(curFile.name);
        }
        catch (err) { // TODO: add error messages in new dialog or some sort of prompt
            console.log("Error: ", err);
            if (!erroredFiles.isDuplicate(curFile.path)) {
                erroredFiles.addFilePath(curFile.path);
            }
            continue;
        }

        // If word file, convert to pdf
        if ((ext == "docx" || ext == "doc") && !handler.isDuplicate(curFile.path)) {
            handler.addFilePath(curFile.path);
        }
    }
}

function convertFiles() {
    pathList = handler.filePathsSaved;
    console.log("number of files given: ", handler.nummberOfFiles)
    for (let i = 0; i < handler.nummberOfFiles; i++) {
        if (erroredFiles.nummberOfFiles != 0) {
            // TODO: Give warning based on any files that were added and had errored out
        }
        console.log("converting - ", i, ": ", pathList[i]);
        convertFile(pathList[i]);
    }
}