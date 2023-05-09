"use strict";
const fsP = require("fs/promises");

/**Takes in a string that is a file path
 * Prints out the contents in the file
 * @param {String} path
 */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(`Error reading ${path}`);
    console.log(err);
    process.exit(1);
  }
  console.log("file contents", contents);
}

const filePath = process.argv[2];
cat(filePath);