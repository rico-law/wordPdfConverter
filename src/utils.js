// Grabs file extension given a file name, returns error no extension found
function grabExtension(fileName) {
    if( fileName.indexOf(".") == -1) {
        throw "noExtension";
    }
    return fileName.split('.').pop();
}

// Grabs current file name without extension
// eg. test.doc -> test
function grabFileName(fileName) {
    let ext;
    try {
        ext = grabExtension(fileName);
    }
    catch (err) { // No file extension is ok, just return file name
        if (err == "noExtension") {
            return fileName;
        }
    }
    let newName = fileName.slice(0, (ext.length + 1) * -1);
    // console.log("filename: ", newName);
    return newName;
}

// Surround string with quotations
function surroundQuotes(string) {
    return "\"" + string + "\"";
}