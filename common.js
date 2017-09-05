var common = {
    // 转换mysql数据
    transferData: function(rows) {
        var ds = [];
        if (!rows) {
            return ds;
        }

        rows.forEach(function(row) {
            var item = {};
            for (var key in row) {
                var val = row[key];
                if (val instanceof Date) {
                    val = val.getTime();
                }
                item[key] = val;
            }
            ds.push(item);
        });
        return ds;
    },
    ok: function(ds) {
        var r = {};
        r.success = true;
        r.data = ds;
        return r;
    },
    fail: function(msg) {
        var r = {};
        r.success = false;
        r.msg = msg;
        return r;
    },
    format: function (fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "H+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }
};

module.exports = common