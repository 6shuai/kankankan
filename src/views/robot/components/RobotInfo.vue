<script setup>
    import { ElMessage } from 'element-plus'
    import { robotData, robotDataUpdate } from '@/api/robot'

    //tab name
    let activeIndex = $ref('1')

    //机器人数据
    let robotResData = $ref([])

    robotData().then(res => {
        robotResData = res.obj
    })

    //保存机器人数值
    let btnLoading = $ref(false)
    const handleSave = () => {
        btnLoading = true
        robotDataUpdate(robotResData).then(res => {
            btnLoading = false
            if(res.result){
                ElMessage.success('提交成功~')
            }
        })
    }

    const BlurText = (e, valueType) => {
        if(valueType != 1) return
        let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value)
        if(!boolean) {
            ElMessage.error('请输入正整数')
            e.target.value = ''
        }
    }

</script>

<template>
    <div class="robot_info_wrap">
        <h3>机器人数值</h3>
        <el-tabs v-model="activeIndex">
            <el-tab-pane label="初级" name="1"></el-tab-pane>
            <el-tab-pane label="中级" name="2"></el-tab-pane>
            <el-tab-pane label="高级" name="3"></el-tab-pane>
        </el-tabs>

        <el-form 
            label-width="160px"
            class="player_state"
        >   
            <el-form-item 
                v-for="(item, index) in robotResData[activeIndex]"
                :key="index"
                :label="item.robotConfig.displayName"
            >
                <el-input
                    v-model="item.dataValue"
                    @blur="BlurText($event, item.robotConfig.valueType)"
                    :placeholder="item.robotConfig.displayName"
                >
                <template #append>
                    <el-button>秒</el-button>
                </template>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button 
                    type="primary"
                    :loading="btnLoading"
                    @click="handleSave"
                >
                    提 交
                </el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<style lang="less" scoped>
    .robot_info_wrap{

        h3{
            padding-top: 30px;
        }
        .el-input{
            width: 300px;
        }
    }
</style>