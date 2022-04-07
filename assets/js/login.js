$(function () {
    // 点击注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form对象
    var form = layui.form

    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到确认密码框中的内容，还要拿到密码框中的内容，进行一次等于的判断
            // 如果判断失败，return一个提示消息
            // 属性选择器
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 1.阻止表单的默认提交行为
        e.preventDefault()
        // 2.发起Ajax的POST请求
        var data = {
            username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    // return layer.msg('res.message', {icon: 5});
                    return layer.msg(res.message, {icon: 5});
                }
                layer.msg('注册成功，请登录！', {icon: 6});
                // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').on('submit',function (e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method: 'POST',
            // 快速获取表单数据
            data:$(this).serialize(),
            success:function (res){
                if(res.status!==0){
                    return layer.msg('登录失败',{icon:5});
                }
                layer.msg('登录成功！',{icon:6});
                // console.log(res.token)

// localStorage 和 sessionStorage 属性允许在浏览器中存储 key/value 对的数据。localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。

                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)

                //跳转到后台
                location.href='../../index.html'
            }
        })
    })
})
