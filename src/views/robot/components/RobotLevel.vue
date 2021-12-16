<script setup>
    import { robotLevelData, robotLevelUpdate } from '@/api/robot'
    import { ElMessage } from 'element-plus'

    //机器人数量 5
    const robotCount = 5 

    //机器人列表数据
    let robotRow = $ref([])

    //机器人等级
    const robotLevel = [
        {
            level: 1,
            name: '初级'
        },
        {
            level: 2,
            name: '中级'
        },
        {
            level: 3,
            name: '高级'
        },
    ]

    robotLevelData().then(res => {
        robotRow = res.obj
    })

    //修改机器人等级
    const handleChangeLevel = (data) => {
        robotLevelUpdate([data]).then(res => {
            if(res.result){
                ElMessage.success('操作成功~')
            }
        })
    }
    

</script>

<template>
    <div class="robot_wrap">
        <h3>机器人等级</h3>
        <div class="robot_level" v-if="robotRow.length">
            <span></span>
            <span 
                v-for="(item, index) in robotCount"
                :key="index"
            >
                <el-select 
                    v-model="robotRow[index].level"
                    @change="handleChangeLevel(robotRow[index])"
                >
                    <el-option
                        v-for="(level, lIndex) in robotLevel"
                        :label="level.name"
                        :value="level.level"
                    >
                    </el-option>
                </el-select>
            </span>
        </div>
        <div 
            class="robot_row" 
            v-for="(item, index) in robotCount"
            :key="index"
        >
            <span>{{ robotCount - index }}名机器人</span>
            <span 
                v-for="(sub, sIndex) in robotCount"
                :key="sIndex"
                :class="robotCount -1 - index < sIndex ? 'nothing' : 'active'"
            >
                {{ robotCount -1 - index < sIndex ? '无' : '有' }}
            </span>
        </div>
    </div>
</template>

<style lang="less">
    @borderColor: #999;

    .robot_wrap{
        width: 600px;

        .robot_level{
            border-top: 1px solid @borderColor;

            .el-select .el-input__inner{
                border: none;
                text-align: center;
            }
        }

        .robot_level, .robot_row{
            display: flex;
            border-bottom: 1px solid @borderColor;
            border-left: 1px solid @borderColor;
            &>span{
                width: 100px;
                text-align: center;
                line-height: 40px;
                border-right: 1px solid @borderColor;

                &.active{
                    background: rgb(142, 218, 165);
                }

                &.nothing{
                    background: rgb(230, 175, 165);
                }
            }
        }
    }
</style>