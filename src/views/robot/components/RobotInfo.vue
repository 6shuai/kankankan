<!--
 * @Author: liushuai
 * @Date: 2021-12-16 11:34:23
 * @LastEditors: liushuai
 * @LastEditTime: 2021-12-23 11:17:56
 * @Description: file content
 * @FilePath: \kankankan\src\views\robot\components\RobotInfo.vue
-->
<script setup>
    import { onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import { robotData, robotDataUpdate } from '@/api/robot'
    import { BlurText } from '@/utils/index'
    
    //获取机器人数据
    let robotResData = $ref([])
    let robotDataLabel = $ref([])
    const getRobotData = () => {
        robotData().then(res => {
            robotResData = res.obj
            robotResData[1].forEach(v => {
                robotDataLabel.push(v.robotConfig.displayName)
            })
        })
    }

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

    onMounted(() => {
        getRobotData()  
    })

</script>

<template>
    <div class="robot_info_wrap">
        <h3>机器人数值</h3>

        <div class="robot_value">
            <div class="item head">
                <span></span>
                <span>初级</span>
                <span>中级</span>
                <span>高级</span>
            </div>
            <!-- {{robotDataLabel}} -->
            <div 
                class="item"
                v-for="(item, index) in robotDataLabel"
            >
                <span>{{ item }}</span>
                <span 
                    v-for="(sub, sIndex) in robotResData"
                    :key="sIndex"
                >
                    <el-input
                        v-model="sub[index].dataValue"
                        @blur="BlurText($event, sub[index].robotConfig.valueType)"
                        :placeholder="sub[index].robotConfig.displayName"
                    >
                        <template 
                            #append 
                            v-if="sub[index].robotConfig.displayName.indexOf('概率') < 0"
                        >
                            <el-button>ms</el-button>
                        </template>
                    </el-input>
                </span>
            </div>

            <el-button 
                type="primary"
                class="save_btn"
                :loading="btnLoading"
                @click="handleSave"
            >
                提 交
            </el-button>
        </div>

    </div>
</template>

<style lang="less" scoped>
    .robot_info_wrap{

        h3{
            padding-top: 30px;
        }
        .el-input{
            width: 150px;
        }
    }

    .robot_value{
        .item{
            display: flex;
            padding: 10px 0;

            span{
                width: 200px;
                line-height: 40px;
                text-align: center;

                &:first-child{
                    text-align: right;
                }
            }
        }

        .save_btn{
            margin-top: 10px;
            margin-left: 700px;
        }
    }
</style>