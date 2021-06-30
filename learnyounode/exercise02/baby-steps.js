const sum = process.argv.slice(2).map(Number).reduce((acc, v) => acc + v, 0);
console.log(sum);
