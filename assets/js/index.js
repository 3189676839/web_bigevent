$(function() {
    // 调用 getUserInfo 函数获取用户信息
    getUserInfo()


    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // console.log('ok')
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清除本地存储的token
            localStorage.removeItem('token')
                // 2.重新跳转到登陆页面
            location.href = '../../login.html'

            // 关闭询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 请求头配置对象，获取token
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！', { icon: 5 })
            }
            // 调用 renderAvatar() 渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功还是失败都会，最终都会调用 complete 回调函数
        complete: function(res) {
            // console.log('执行了complete回调函数：');
            // console.log(res);
            // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据】
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清空本地token
                localStorage.removeItem('token')
                    // 2.强制跳转到登陆页面
                location.href = '../../login.html'
            }
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
        // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
            // 获取名字的第一个字符并转化为大写
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}