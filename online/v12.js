// input from command line

const fs = require('fs');
const input = process.argv;

    fs.writeFileSync(input[2],input[3]);

//     fs.unlinkSync(input[3]);
