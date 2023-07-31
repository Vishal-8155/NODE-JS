// OS module in NodeJS

const os = require('os');
console.log(os.arch()); // show architecture of your system
console.log(os.freemem()/(1024*1024*1024)); // show free memory in your system
console.log(os.totalmem()/(1024*1024*1024)); // show total free memory in your system
console.log(os.hostname()); // show hostname of your system
console.log(os.platform()); // show plateform of your system
console.log(os.userInfo()); // show user info of your system