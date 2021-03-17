$(function () {
    // 1 自定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "原密码和旧密码不能一样"
            }
        },
        // 两次新密码必须相同
        rePwd: function (value) {
            if (value !== $("[name =newPwd]").val()) {
                return "两次新密码输入不一致！"
            }
        },
    });

    // 2,表单提交
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                layer.msg(res.message)
                $(".layui-form")[0].reset();
            }
        })
    })
})