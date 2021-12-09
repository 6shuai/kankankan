<!--
 * @Author: liushuai
 * @Date: 2021-12-02 14:03:57
 * @LastEditors: liushuai
 * @LastEditTime: 2021-12-02 15:23:24
 * @Description: file content
 * @FilePath: \kankankan\src\views\login\index.vue
-->
<script setup>
import { userLogin } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

let loginform = $ref({})
let loginFormRef = $ref(null)
let loginLoading = $ref(false)
const router = useRouter()
const store = useStore()

const loginRules = {
    username: [
        {
            required: true,
            message: "请输入用户名~",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "请输入密码~",
            trigger: "blur",
        },
    ],
}

//登录
const handleLogin = () => {
    router.push('/')
    loginFormRef.validate((valid) => {
        if(valid){
            loginLoading = true
            userLogin(loginform).then(res => {
                loginLoading = false  
                if(res.result){
                    localStorage.loginData = JSON.stringify(res.obj)
                    store.state.user.loginData = res.obj
                    router.push('/')
                }
            })
        }
    })
}

</script>
<template>
    <div class="login_page">
        <el-card class="login_wrap">
            <h2>登录</h2>
            <el-form 
                ref="loginFormRef" 
                :model="loginform" 
                :rules="loginRules"
            >
                <el-form-item label prop="username">
                    <el-input 
                        v-model="loginform.username" 
                        placeholder="用户名"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label prop="password">
                    <el-input 
                        type="password"
                        v-model="loginform.password" 
                        placeholder="密码"
                        @keyup.enter="handleLogin"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="login_btn">
                <el-button 
                    :loading="loginLoading"
                    type="primary" 
                    @click="handleLogin"
                >
                    登录
                </el-button>
            </div>
            <div class="go_register">
                <el-link @click="router.push('/register')">注册账号</el-link>
            </div>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.login_wrap {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login_btn {
        .el-button {
            width: 100%;
        }
    }

    .go_register {
        text-align: center;
        padding-top: 20px;
    }
}
</style>
