const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
    port : process.env.PORT || 3200,
    "database":"mongodb://localhost:27017/StackOverflowDB",
     secret: crypto, // Cryto-created secret
    db: 'StackOverflowDB', // Database name
    "securityKey":"rayyan@12345"
}