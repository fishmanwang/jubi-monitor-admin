$(function() {

    bindBtnEvent()

});

function bindBtnEvent() {

    $("#okBtn").off("click").on("click", login);

    $("#username").off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
            login();
        }
    });

    $("#password").off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
            login();
        }
    });

}

function login() {
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    if (username == '') {
        alert("请输入用户名");
        return;
    }
    if (password == '') {
        alert("请输入密码")
        return;
    }
    var data = {username: username, password: password};
    $.post("/auth/login", data, function (json) {
        if (json.status == 200) {
            window.location.href = "/"
        } else {
            alert(json.message)
        }
    })
}