<script setup>
    import { gameStateList, gameConfigCreate, gameConfigDetail } from '@/api/gameConfig'
    import { ElMessage } from 'element-plus'

    let emit = defineEmits(['createdSuccess'])

    let dialogVisible = $ref(false)

    //创建 参数
    let configFormParams = $ref({})

    //表单 校验
    let configRule = $ref({
        displayName: [
            {
                required: true,
                message: '请输入配置名称',
                trigger: 'blur',
            }
        ]
    })

    let configFormRef = $ref(null)

    //游戏状态时长
    let gameStates = $ref([])

    //游戏状态默认时长
    let gameDefaultStates = $ref([])
    gameStateList().then(res => {
        if(res.result){
            res.obj.forEach((item) => {
                gameDefaultStates.push({
                    displayName: item.displayName,
                    duration: item.defaultDuration,
                    stateId: item.stateId
                })
            })
            gameStates = JSON.parse(JSON.stringify(gameDefaultStates))
        }
    })

    //显示创建窗口
    const showDialog = (id) => {
        dialogVisible = true
        configFormParams = {}
        gameStates = JSON.parse(JSON.stringify(gameDefaultStates))
        if(configFormRef) configFormRef.clearValidate()

        if(id){
            getConfigDetails(id)
        }
    }

    //获取配置详情
    const getConfigDetails = (id) => {
        gameConfigDetail({ id }).then(res => {
            if(res.result){
                configFormParams = res.obj
                getGameStateData(res.obj.stateDurations)
                console.log(gameStates)
            }
        })
    }

    //提交按钮 loading
    let btnLoading = $ref(false)

    //创建配置
    const handleCreated = () => {
        configFormRef.validate((valid) => {
            if(valid){
                let data = {
                    ...configFormParams,
                    stateDurations: gameStates
                }
                btnLoading = true
                gameConfigCreate(data).then(res => {
                    btnLoading = false
                    if(res.result){
                        ElMessage.success('操作成功~')
                        emit('createdSuccess')
                        dialogVisible = false
                    }   
                })
            }
        })
    }

    //游戏状态
    const getGameStateData = (data) => {
        gameStates.forEach((item, index) => {
            gameStates[index] = {
                ...item,
                duration: data[index].duration,
                id: data[index].id
            }
        })
    }

    defineExpose({
        showDialog
    })

</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="新建配置"
        width="600px"
    >
        <el-form 
            ref="configFormRef" 
            :rules="configRule"
            :model="configFormParams" 
            label-width="80px"
        >
            <el-form-item label="配置名称" prop="displayName">
                <el-input v-model="configFormParams.displayName"></el-input>
            </el-form-item>
            <el-form-item label="配置描述">
                <el-input 
                    type="textarea"
                    :rows="4"
                    v-model="configFormParams.description"
                ></el-input>
            </el-form-item>

            <el-form-item 
                v-for="(item, index) in gameStates"
                :key="index"
                :label="item.displayName"
            >
                <el-input
                    v-model="item.duration"
                    :placeholder="item.displayName"
                    type="number"
                >
                <template #append>
                    <el-button>秒</el-button>
                </template>
                </el-input>
            </el-form-item>

        </el-form>

        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button 
                type="primary" 
                :loading="btnLoading"
                @click="handleCreated"
            >
                确 定
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>