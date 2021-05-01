const crypto = require('crypto');

const genSaltAndHash = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64,'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    }
}

const validatePassword = (password, salt, hash) => {
    const genHashtoVaidate = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return (hash === genHashtoVaidate);
}

module.exports.genSaltAndHash = genSaltAndHash;
module.exports.validatePassword = validatePassword;
