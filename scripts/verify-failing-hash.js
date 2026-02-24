const crypto = require('crypto');
const reference = "cmm18ole400021oobh0d89oux_1771975873242";
const amountInCents = 2900000;
const currency = "COP";
const secret = "test_integrity_wDm95UnCywxX4jDz2Gz2CV59RF42nEi2";

const chain = `${reference}${amountInCents}${currency}${secret}`;
const hash = crypto.createHash('sha256').update(chain).digest('hex');

console.log("Chain:", chain);
console.log("Hash:", hash);
