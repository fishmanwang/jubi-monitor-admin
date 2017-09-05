var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    //password: 'Pass1234',
    database: 'jubi',
    charset: 'utf8',
    connectionLimit: 10
});

var query = function (sql,params, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback([]);
            console.log("获取连接失败,%s", err);
            return;
        }
        conn.query(sql, params, function (err, rows, fields) {
            if (err) {
                callback([]);
                console.log("查询失败,%s", err);
                return;
            }
            callback(rows);
        });

        conn.release();
    });
};
var insert = function (sql, params, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(-1);
            console.log("获取连接失败,%s", err);
            return;
        }

        conn.query(sql, params, function (err, res) {
            if (err) {
                callback(-1);
                console.log("新增失败,%s", err);
                return;
            }
            callback(res.insertId);
        });

        conn.release();
    });
};
var update = function (sql, params, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(0);
            console.log("获取连接失败,%s", err);
            return;
        }

        conn.query(sql, function (err, res) {
            if (err) {
                callback(0);
                console.log("修改失败,%s", err);
                return;
            }
            callback(res.affectedRows)
        });

        conn.release();
    })
};

var del = function (sql, params, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(0);
            console.log("获取连接失败,%s", err);
            return;
        }

        conn.query(sql, params, function (err, res) {
            if (err) {
                callback(0);
                console.log("删除失败,%s", err);
                return;
            }
            callback(res.affectedRows);
        });

        conn.release();
    })
};

module.exports = {
    query: query,
    insert: insert,
    update: update,
    del: del
};