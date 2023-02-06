<template>
    <div class="login-content">
        <div class="login-box">
            <h2>欢迎登录</h2>
            <form @submit.prevent>
                <div class="user-box">
                    <input type="text" v-model.trim="phone" required="请输入电话">
                    <label>手机号</label>
                </div>
                <div class="user-box">
                    <input type="password" v-model.trim="pwd" required="请输入密码">
                    <label>密码</label>
                </div>
                <button @click="loginByPhone">
                    登录
                </button>
            </form>
        </div>
    </div>
</template>
<script>
import { showDialog, showNotify } from 'vant';
import { getUserDetail } from '@/request/api/login'
export default {
    data() {
        return {
            phone: '',
            pwd: ''
        }
    },
    methods: {
        async loginByPhone() {
            if (this.phone.length != 0 && this.pwd.length != 0) {
                let res = await this.$store.dispatch("getPhoneLogin", { phone: this.phone, pwd: this.pwd })
                // console.log(res);
                if (res.data.code == 200) {
                    showNotify({ type: 'success', message: '登录成功，正在为您跳转' });
                    // 登录成功更改是否登录的标识
                    this.$store.commit('updateIslogin', true)
                    // 登录成功更改token值
                    this.$store.commit('updateToken', res.data.token)
                    // 放入localstorage里面
                    localStorage.setItem('token', res.data.token)
                    // 传入用户id，获取用户的详情信息
                    let result = await getUserDetail(res.data.account.id)
                    // 用户信息放入vuex中
                    this.$store.commit('updateUser', result.data.profile)
                    // 保存用户登录状态同时也要保留好用户的个人信息数据
                    localStorage.setItem("user", JSON.stringify(result.data.profile))
                    this.$router.push('/userinfo')
                }
                else {
                    showDialog({
                        title: '登录错误',
                        message: '请检查账号密码输入是否有误',
                    }).then(() => {
                        // on close
                        this.pwd = ''
                    });
                }

            }

        }
    }
}
</script>
<style lang="less" scoped>
.login-content {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: linear-gradient(#141e30, #243b55);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    .login-box {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // width: 100%;
        // height: 100%;
        padding: 40px;
        /* transform: translate(-50%, -50%); */
        background: rgba(0, 0, 0, .5);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
        border-radius: 10px;
    }
}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
}

.login-box form button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
    background: transparent;
    cursor: pointer;
    border: 1px solid #03e9f4;
    border-radius: .2rem;
}

.login-box button:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 50px #03e9f4,
        0 0 100px #03e9f4;
}

// .login-box a span {
//     position: absolute;
//     display: block;
// }

// .login-box a span:nth-child(1) {
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, #03e9f4);
//     animation: btn-anim1 1s linear infinite;
// }

// @keyframes btn-anim1 {
//     0% {
//         left: -100%;
//     }

//     50%,
//     100% {
//         left: 100%;
//     }
// }

// .login-box a span:nth-child(2) {
//     top: -100%;
//     right: 0;
//     width: 2px;
//     height: 100%;
//     background: linear-gradient(180deg, transparent, #03e9f4);
//     animation: btn-anim2 1s linear infinite;
//     animation-delay: .25s
// }

// @keyframes btn-anim2 {
//     0% {
//         top: -100%;
//     }

//     50%,
//     100% {
//         top: 100%;
//     }
// }

// .login-box a span:nth-child(3) {
//     bottom: 0;
//     right: -100%;
//     width: 100%;
//     height: 2px;
//     background: linear-gradient(270deg, transparent, #03e9f4);
//     animation: btn-anim3 1s linear infinite;
//     animation-delay: .5s
// }

// @keyframes btn-anim3 {
//     0% {
//         right: -100%;
//     }

//     50%,
//     100% {
//         right: 100%;
//     }
// }

// .login-box a span:nth-child(4) {
//     bottom: -100%;
//     left: 0;
//     width: 2px;
//     height: 100%;
//     background: linear-gradient(360deg, transparent, #03e9f4);
//     animation: btn-anim4 1s linear infinite;
//     animation-delay: .75s
// }

// @keyframes btn-anim4 {
//     0% {
//         bottom: -100%;
//     }

//     50%,
//     100% {
//         bottom: 100%;
//     }
// }
</style>