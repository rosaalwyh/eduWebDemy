const bcrypt = require("bcryptjs");

module.exports = {
    encrypt: (password) => {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    compare: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword);
    }
}