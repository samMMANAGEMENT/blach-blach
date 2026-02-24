const crypto = require('crypto');
const reference = "cmlzj39w30000t0obr7zwhigl";
const amountInCents = 2900000;
const currency = "COP";
const secret = "test_integrity_wDm95UnCywxX4jDz2Gz2CV59RF42nEi2";

const chain = `${reference}${amountInCents}${currency}${secret}`;
const hash = crypto.createHash('sha256').update(chain).digest('hex');

console.log("Chain:", chain);
console.log("Hash:", hash);
