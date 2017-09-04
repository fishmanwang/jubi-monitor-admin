var mysql = require('mysql');

var pool = mysql.createPool({
   host: 'localhost',
   port: 3306,
   user: 'root',
   //password: 'root',
    password: 'Pass1234',
   database: 'jubi'
});

var execute = function(sql, params, callback) {
  pool.getConnection(function(err, conn) {
     if (err) {
         callback(err);
         return;
     } else {
         conn.query(sql, params, function(err, result) {
             if (err) {
                 callback(err);
                 return;
             }
            conn.release();
            callback(err, rows)
         });
     }
  });
};

module.exports = {exec: execute}