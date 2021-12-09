<script setup>
    import { logicData, logicDataEdit } from '@/api/content'
    import { DocumentChecked } from '@element-plus/icons'
    import { ElMessage } from 'element-plus'
    import tree from './components/Tree.vue'
    import CurrentDifficulty from './components/CurrentDifficulty.vue'
    import DizzinessTime from './components/DizzinessTime.vue'
    import Addition from './components/Addition.vue'
    import AttenuationValue from './components/AttenuationValue.vue'
    import AutoInteractionTotal from './components/AutoInteractionTotal.vue'
    import ScoreData from './components/ScoreData.vue'
    import DoubleHitTime from './components/DoubleHitTime.vue'
    import AutoInteractionWaitTime from './components/AutoInteractionWaitTime.vue'

    let logicDatas = $ref('')
    let playerStates = $ref('')


    let tool = {
        add: { name: '+' },
        multiply: { name: '-' },
        subtract: { name: '*' },
        divide: { name: '/' },
        equal: { name: '=' },
        bracketLeft: { name: '(' },
        bracketRight: { name: ')' },
        comma: { name: ',' },
    }


    logicData().then(res => {
        logicDatas = {}
        playerStates = {}

        res.obj.playerStates.forEach(item => {
            playerStates[item.className] = item
        })

        res.obj.logicDatas.forEach(item => {
            logicDatas[item.variant] = item
        })
    })


    //保存
    let btnLoading = $ref(false)
    const handleSave = () => {
        let data = {}
        let arr = Object.getOwnPropertyNames(logicDatas)
        data.logicDatas = arr.map(function(i){return logicDatas[i]})

        let arr1 = Object.getOwnPropertyNames(playerStates)
        data.playerStates = arr1.map(function(i){return playerStates[i]})

        btnLoading = true
        logicDataEdit(data).then(res => {
            btnLoading = false
            if(res.result){
                ElMessage.success('保存成功~')
            }
        })
    }


</script>

<template>
    <el-button 
        :loading="btnLoading"
        type="primary" 
        class="logic_save_btn"
        @click="handleSave"
        :icon="DocumentChecked"
    >
        保 存
    </el-button>
    <div class="logic_wrap" v-if="logicDatas">
        <h2>生成树</h2>

        <!-- ⽣成对象总数量 -->
        <tree
            :logicDatas="logicDatas"
            :playerStates="playerStates"
            :tool="tool"
        ></tree>

        <!-- 当前难度系数 -->
        <current-difficulty
            :logicDatas="logicDatas"
            :tool="tool"
        ></current-difficulty>

        <h2>冲刺条</h2>

        <!-- 本次眩晕时⻓ -->
        <dizziness-time
            :logicDatas="logicDatas"
            :playerStates="playerStates"
            :tool="tool"
        ></dizziness-time>

        <!-- 蓄力值加成 -->
        <addition
            :logicDatas="logicDatas"
            :tool="tool"
        ></addition>
        

        <!-- 蓄⼒值每秒衰减值 -->
        <attenuation-value
            :logicDatas="logicDatas"
            :tool="tool"
        ></attenuation-value>
        

        <!-- ⾃动交互对象总数 -->
        <auto-interaction-total
            :logicDatas="logicDatas"
            :tool="tool"
        ></auto-interaction-total>

        <!-- 自动交互等待时长 -->
        <auto-interaction-wait-time
            :logicDatas="logicDatas"
            :playerStates="playerStates"
            :tool="tool"
        ></auto-interaction-wait-time>

        <!-- 本次得分  -->
        <ScoreData
            :logicDatas="logicDatas"
            :tool="tool"
        >
        </ScoreData>

        <!-- 连击计时时⻓ -->
        <double-hit-time
            :logicDatas="logicDatas"
            :tool="tool"
        ></double-hit-time>

        <h2>玩家状态</h2>
        <el-form 
            label-width="120px"
            class="player_state"
        >
            <el-form-item 
                v-for="(item, index) in playerStates"
                :key="index"
                :label="item.displayName"
            >
                <el-input
                    v-model="item.duration"
                    :placeholder="item.displayName"
                >
                <template #append>
                    <el-button>秒</el-button>
                </template>
                </el-input>
            </el-form-item>
        </el-form>

    </div>
</template>

<style lang="less">
    .logic_save_btn{
        position: fixed;
        top: 100px;
        right: 30px;
        z-index: 99;

        &.el-button.is-loading{
            position: fixed;
        }
    }
    .logic_wrap{
        height: 100%;

        .el-card{
            margin-bottom: 20px;
        }

        h2{
            padding: 20px 0;
        }

        .formula{
            display: flex;
            .item{
                text-align: center;

                .desc{
                    text-align: center;
                    height: 18px;
                    padding: 5px 0;
                    overflow: hidden;
                    white-space: nowrap;
                    max-width: 200px;
                }

                input{
                    text-align: center;
                    min-width: 100px;
                    max-width: 200px;
                }

                .symbol{
                    line-height: 40px;
                    padding: 0 20px;
                    font-size: 20px;
                    max-width: 200px;
                }

                &:first-child .symbol{
                    font-size: 23px;
                }

                .el-tag{
                    line-height: 32px;
                    margin-top: 6px;
                }
            }
        }

        .player_state .el-input{
            width: 300px;
        }
    }
</style>