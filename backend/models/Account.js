const Sequelize = require('sequelize');
const db = require('../config/database');

// creation of the User model
const Account = db.define('account', {

    type: {
        type: Sequelize.STRING,
    },
    ref: {
        type: Sequelize.STRING,
    }
   
});


module.exports = Account;