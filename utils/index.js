const path = require("path");
const fs = require("fs");

const getInput = (dirname) => {
    return fs.readFileSync(path.join(dirname, "input.txt"), "utf-8").trim().split("\n");
}


module.exports = {
  getInput,
};
