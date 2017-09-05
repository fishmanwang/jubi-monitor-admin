$(function() {

    query();

});

function query() {
    $.getJSON("/users/query", function(json) {
        console.log(json)
        if (!json.success) {
            alert(json.msg);
            return;
        }
        render(json.data)
    });
}

function render(ds) {
    var c = '';
    ds.forEach(function(item) {
        c += '<tr>'
            + '<td>' + item.username + '</td>'
            + '<td>' + item.nickname + '</td>'
            + '<td>' + item.phone + '</td>'
            + '<td>' + item.email + '</td>'
            + '<td>' + new Date().format('yyyy-MM-dd HH:mm:ss') + '</td>'
            + '</tr>';
        console.log(typeof(item.lastLoginTime));
    });
    console.log(c)
    $("#userTable").append(c)

}

