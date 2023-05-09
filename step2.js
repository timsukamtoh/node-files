"use strict";
const fsP = require("fs/promises");
const axios = require("axios");

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

/**Takes in a string that is a URL
 * Prints out the HTML contents in the URL
 * @param {String} path
 */
async function webCat(url) {
  let response;
  try {
    response = await axios.get(url);
  } catch (err) {
    console.log(`Error fetching ${url}`);
    console.log(err);
    process.exit(1);
  }
  const contents = response.data
  console.log("file contents", contents);
}


const pathOrUrl = process.argv[2];
//Logic to determine if its a url or file path
if (pathOrUrl.startsWith("https://") || pathOrUrl.startsWith("http://")) {
  webCat(pathOrUrl);
} else {
  cat(pathOrUrl);
}

