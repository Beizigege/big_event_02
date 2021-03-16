// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net"
$.ajaxPrefilter(function (options) {
    // 拼接对应环境地址
    options.url = baseURL + options.url;
    //身份认证
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 3. 拦截所有响应，判断身份认证信息
    options.complete = function (res) {
        // console.log(res);
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 1.清空本地token
            localStorage.removeItem("token")
            // 2.页面跳转
            location.href = "/login.html"
        }
    }
})