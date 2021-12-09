<script setup>
import { userRegister } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

let registerform = $ref({})
let registerFormRef = $ref(null)
let registerLoading = $ref(false)
const router = useRouter()

// 校验密码一致性
let validateConfirmPass = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请再次输入密码！"));
    } else if (value !== registerform.password) {
        callback(new Error("两次输入密码不一致！"));
    } else {
        callback();
    }
}

const registerRules = {
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
    confirmPassword: [
        {
            required: true,
            message: "请再次输入密码~",
            trigger: "blur",
        },
        {
            validator: validateConfirmPass,
            trigger: 'blur'
        }
    ],
}

//注册账号
const handleRegister = () => {
    registerFormRef.validate((valid) => {
        if(valid){
            registerLoading = true
            userRegister(registerform).then(res => {
                registerLoading = false  
                if(res.result){
                    ElMessage.success('注册成功~')
                    registerform = {}
                }
            })
        }
    })
}

</script>
<template>
    <div class="login_page">
        <el-card class="login_wrap">
            <h2>注册账号</h2>
            <el-form 
                ref="registerFormRef" 
                :model="registerform" 
                :rules="registerRules"
            >
                <el-form-item label prop="username">
                    <el-input 
                        v-model="registerform.username" 
                        placeholder="用户名"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label prop="password">
                    <el-input 
                        type="password"
                        v-model="registerform.password" 
                        placeholder="密码"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label prop="confirmPassword">
                    <el-input 
                        type="password"
                        v-model="registerform.confirmPassword" 
                        placeholder="确认密码"
                        @keyup.enter="handleRegister"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="login_btn">
                <el-button 
                    v-loading="registerLoading"
                    type="primary" 
                    @click="handleRegister"
                >
                    注册
                </el-button>
            </div>
            <div class="go_register">
                <el-link @click="router.push('/login')">登录</el-link>
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
