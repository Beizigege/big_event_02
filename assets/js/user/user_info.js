$(function () {
    // 1 自定义验证规则
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6之间！"
            }
        }
    });

    // 2.用户渲染
    initUserInfo();
    // 导出layer
    let layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layer.mag(res.message)
                // 成功 ，后渲染
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 3. 表单重置
    $("#btnReset").on("click", function (e) {
        // 阻止重置
        e.preventDefault();
        //重新用户渲染
        initUserInfo();
    });

    // 4.修改用户信息
    $(".layui-form").on("submit", function (e) {
        // 阻止浏览器默认行为，form表单的提交
        e.preventDefault();
        // 发送ajax ，修改用户信息
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // getUserInfo
                if (res.status != 0) return layer.mag(res.message)
                layer.msg("用户信息修改成功")
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo();
            }
        })
    })
})