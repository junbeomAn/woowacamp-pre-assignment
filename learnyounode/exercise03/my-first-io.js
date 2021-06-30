const fs = require("fs");
const buffer = fs.readFileSync(process.argv[2]);
const str = buffer.toString();
const arr = str.split("\n");
console.log(arr.length - 1);
