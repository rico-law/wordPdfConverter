const { exec } = require("child_process");
const fs = require("fs");

// TODO: Globals for now, may have to move converterPath when function for selecting
const converterPath = "C:\\Users\\Rico\\Documents\\Coding Stuff\\wordPdfConverter\\docto.exe";
const inputFileFlag = " -f ";
const outputFileFlag = " -O ";
const convertToPdfFlag = " -T wdFormatPDF";

// Function requires DocTo to run, couldn't find any JavaScript libraries that convert
// from word docs -> pdf files that don't require a separate install of libre or a third party
// program, this one requires an install of MS Word to work
// Can treat this like more of an engine doing the work?
// https://github.com/tobya/DocTo

// TODO: use tool to find someone's DocTo executable
function convertFile(filePath) {
    let pdfName = surroundQuotes(grabFileName(filePath) + ".pdf");
    console.log("pdfname: ", pdfName);

    const command = surroundQuotes(converterPath) + inputFileFlag + surroundQuotes(filePath) + outputFileFlag + pdfName + convertToPdfFlag;
    console.log("command to run: ", command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`Error with conversion (code: ${error.code}): ${error.message}`);
            return false;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return false;
        }
        // Assume didn't fail since error is NULL
        console.log(`stdout: ${stdout}`);
        return true;
    });
}