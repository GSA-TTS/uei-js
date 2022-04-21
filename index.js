const uei = require("./uei.js");

const UEI_ARG = process.argv.slice(2)[0];
console.log(`${UEI_ARG} is a valid UEI: ${uei.validUEI(UEI_ARG)}`);
