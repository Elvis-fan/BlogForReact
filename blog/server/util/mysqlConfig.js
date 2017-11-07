const
    app = require('./../app'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection');
const devConfig = {
    host: '106.14.150.87',
    user: 'root',
    password: 'ger.170728##',
    port: 3306,
    database: 'blog'
};
const protConfig= {
    host: 'localhost',
    user: 'root',
    password: 'ger.170728##',
    port: 3306,
    database: 'blog'
};
module.exports= myConnection(mysql, devConfig, 'pool');