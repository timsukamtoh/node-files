"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

/**
 * Reads the contents of the file or URL referred to by
 * source and writes it to the file at path 'writeFile', or if
 * writeFile is null, prints the contents to the console.
 *
 * @param {string} source a file path or a URL
 * @param {string?} writeFile optional file path
 */
async function bigCat(source, writeFile) {
    let content;
    try {
        content = isURL(source) ? (await axios.get(source)).data
            : await fsP.readFile(source, "utf8");
    } catch (err) {
        console.log(`Error reading ${source}`);
        console.log(err);
        process.exit(1);
    }

    writeOrPrint(content, writeFile);
}

/**
 * if writeFile is not null, writes content to that file.
 * Otherwise, prints content to the console
 * @param {string} content
 * @param {string?} writeFile
 */
function writeOrPrint(content, writeFile) {
    if (writeFile != null) {
        fsP.writeFile(writeFile, content, "utf8");
    } else {
        console.log(`Content: ${content}`);
    }
}

/**
 *
 * @param {string} text
 * @returns true iff text is a URL
 */
function isURL(text) {
    try {
        new URL(text);
        return true;
    } catch (e) {
        return false;
    }
}


const args = process.argv;

let sourceFileOrURL;
let writeFile = null;

if (args[2] == "--out") {
    sourceFileOrURL = args[4];
    writeFile = args[3];
} else {
    sourceFileOrURL = args[2];
}

bigCat(sourceFileOrURL, writeFile);