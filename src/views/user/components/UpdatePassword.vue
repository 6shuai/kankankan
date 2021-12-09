<script setup>
    import { userPasswordUpdate } from '@/api/user'
    import { ElMessage } from 'element-plus'
    let updatePwform = $ref({})
    let updatePwDialog = $ref(false)
    let btnLoading = $ref(false)

    //显示修改密码
    const showUpdatePw = (id) => {
        updatePwDialog = true
        updatePwform.id = id
    }

    //修改密码
    const handleUpdate = () => {
        if(!updatePwform.password){
            ElMessage.warning('请输入密码~')
            return
        }else if(!updatePwform.confirmPassword){
            ElMessage.warning('请输入确认密码~')
            return
        }else if(updatePwform.password != updatePwform.confirmPassword){
            ElMessage.warning('两次密码输入不一致~')
            return
        }
        btnLoading = true
        userPasswordUpdate(updatePwform).then(res => {
            btnLoading = false
            if(res.result){
                ElMessage.success('更新成功~')
                updatePwDialog = false
            }
        })
    }

    defineExpose({
        showUpdatePw
    })

</script>

<template>
    <el-dialog
		v-model="updatePwDialog"
		title="修改密码"
		width="520px"
	>
		<el-form 
            label-width="80px"
        >
            <el-form-item label="密码">
				<el-input 
                    type="password" 
                    :rows="3" 
                    v-model="updatePwform.password"
                ></el-input>
			</el-form-item>
            <el-form-item label="确认密码">
				<el-input 
                    type="password" 
                    :rows="3" 
                    v-model="updatePwform.confirmPassword"
                ></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button 
                    @click="updatePwDialog = false"
                >
                    取消
                </el-button>
				<el-button 
                    type="primary" 
                    :loading="btnLoading"
                    @click="handleUpdate"
                >
                    确定
                </el-button>
			</span>
		</template>
	</el-dialog>
</template>