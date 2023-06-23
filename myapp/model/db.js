var mysql = require("mysql");
var pool = mysql.createPool({
connectionLimit : 100,
host: "tuxa.sme.utc", //ou localhost
user: "sr10p012",
password: "oWsaM12KJvl7",
database: "sr10p012"
});
module.exports = pool;
