<script setup>
    import { uploadImgAction } from '@/utils/index'
    import { Plus } from '@element-plus/icons'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { userDataUpdate } from '@/api/user'
    import { ElMessage } from 'element-plus'
    import UpdatePassword from './components/UpdatePassword.vue'

    const router = useRouter()
    const store = useStore()
    
    let { id, nickname, avatar } = store.state.user.loginData
    let userParams = $ref({
        id,
        nickname,
        avatar
    })

    //保存btn loading
    let btnLoading = $ref(false)

    //上传头像
    const handleAvatarSuccess = ({ obj }) => {
        userParams.avatar = obj.path
    }

    //保存
    const handleSave = () => {
        if(!userParams.nickname){
            ElMessage.error('请输入昵称~')
            return
        }
        btnLoading = true
        userDataUpdate(userParams).then(res => {
            if(res.result){
                btnLoading = false
                ElMessage.success('更新成功~')
                let { nickname, avatar } = res.obj
                store.state.user.loginData = {
                    ...store.state.user.loginData,
                    nickname,
                    avatar
                }
                localStorage.loginData = JSON.stringify(store.state.user.loginData)
            }
        })
    }

    //返回
    const goBack = () => {
        router.go(-1)
    }

    //显示修改密码窗口
    let updatePassword = $ref(null)
    const handleShowUpdatePw = () => {
        updatePassword.showUpdatePw(id)
    }

</script>

<template>
    <div class="user_wrap">
        <el-card class="user_card">
            <template #header>
                账号设置
            </template>
            <el-form 
                label-width="80px"
            >
                <el-form-item label="昵称">
                    <el-input
                        v-model="userParams.nickname"
                        placeholder="昵称"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="头像">
                     <el-upload
                        class="avatar-uploader"
                        :action="uploadImgAction"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                    >
                        <img v-if="userParams.avatar" :src="userParams.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="密码">
                    <a href="javascript:;" @click="handleShowUpdatePw()">修改密码</a>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button @click="router.go(-1)">取 消</el-button>
                <el-button 
                    type="primary"
                    :loading="btnLoading"
                    @click="handleSave"
                >
                    保 存
                </el-button>
            </div>
        </el-card>

        <!-- 修改密码 -->
        <update-password ref="updatePassword"></update-password>

    </div>
</template>

<style lang="less" scoped>
    .user_wrap{
        width: 100%;
        height: 100%;

        .user_card{
            width: 100%;
            height: 100%;
            position: absolute;

            .el-form{
                margin-top: 40px;

                .el-input{
                    width: 300px;
                }
            }

            .btn{
                padding-left: 40px;
                
                .el-button{
                    margin: 0 20px;
                }
            }
        }
    }
</style>