$(function () {
    $(".link_reg").on("click", function () {
        $(".login_box").hide();
        $(".reg_box").show()
    })
    $(".link_login").on("click", function () {
        $(".reg_box").hide()
        $(".login_box").show();
    })

    // 自定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (item, value) {
            // console.log(item, value);
            // console.log($(".reg_box input[name=password]").val());
            if (item != $(".reg_box input[name=password]").val()) return "两次密码输入不一致"
        }
    })

    // 注册
    let layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // console.log($(".reg_box [name=username]").val());
        e.preventDefault();
        // 发送ajax
        // ajax 三板斧 1. console 2. 请求type，url，data 3.响应体
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $(".reg_box [name=username]").val(),
                password: $(".reg_box [name=password]").val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg(res.message, { icon: 6 })
                $(".link_login").click();
                $("#form_reg")[0].reset();
                console.log($("#link_reg"));
            }
        })
    })

    // 登录
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message, { icon: 5 })
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })

    })
})