$(function () {
    getUserInfo();

    // 退出 
    let layer = layui.layer;
    $("#btnLogout").on("click", function () {
        //  框架提供的询问框
        layer.confirm("是否确认退出?", { icon: 3, title: '提示' }, function (index) {
            // 1. 清空本地token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = "/login.html";
            // 关闭询问框
            layer.close(index);
        })
    })
})
// 必须保证这个函数是全局的，后面其他功能要用
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // 配置头信息，设置token，身份识别认证
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        // data: {},
        success: (res) => {
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            // 头像和文字渲染
            renderAvatar(res.data)
        }
    });
}
function renderAvatar(user) {
    // 1.渲染用户名，如果有昵称以昵称为准
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎" + name);
    // 2.渲染头像; 判断图片头像是否存在
    if (user.user_pic == null) {
        // 隐藏图片头像, 渲染文字头像
        $(".layui-nav-img").hide();
        $(".text-avatar").show().html(name[0].toUpperCase())
    } else {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    }
}

