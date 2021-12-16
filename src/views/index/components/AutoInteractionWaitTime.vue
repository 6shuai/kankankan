<!--
 * @Author: liushuai
 * @Date: 2021-12-08 10:46:25
 * @LastEditors: liushuai
 * @LastEditTime: 2021-12-09 13:58:58
 * @Description: file content
 * @FilePath: \kankankan\src\views\index\components\AutoInteractionWaitTime.vue
-->
<script setup>
    import { getJsonValue } from '@/utils/index'
    import { computed, watch } from 'vue'
    import { useStore } from 'vuex'
    import InputNumber from './InputNumber.vue'
 
    const prop = defineProps({
        logicDatas: Object,
        playerStates: Object,
        tool: Object
    })
    const store = useStore()
    let logicDatas = prop.logicDatas
    let playerStates = prop.playerStates
    let { subtract, divide, equal, bracketLeft, bracketRight } = prop.tool

    //自动交互对象总数
    let autoInteractionTotal = computed(() => store.state.logic.autoInteractionTotal)

    //已完成⾃动交互数
    let doneCount = $ref(null)

    // const ⾃动交互等待时⻓ = 后摇时⻓ * 冲刺⾃动交互减速系数 * 已完成⾃动交互数  / ⾃动交互对象总数 
    let data = $ref(
        [
            playerStates['server.state_machine.player_state.WindDownState'],
            subtract,
            logicDatas['rushSlowDownRatio'],
            subtract,
            { displayName: '已完成自动交互数', type: 'custom' },
            divide,
            { displayName: '⾃动交互对象总数', name: null, tag: true },
            equal,
            { displayName: '⾃动交互等待时⻓', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = getJsonValue(playerStates['server.state_machine.player_state.WindDownState']) * getJsonValue(logicDatas['rushSlowDownRatio']) * doneCount  / autoInteractionTotal.value
        data[data.length-1].name = result.toFixed(2)
    }

    watch(autoInteractionTotal, (n) => {
        data[6].name = n
        handleInputchange()
    })


</script>
<template>
    <el-card>
        <template #header>⾃动交互等待时⻓</template>
        <div class="formula">
            <div 
                class="item" 
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="desc">{{ item.displayName ? item.displayName : '' }}</div>

                <input-number
                    v-if="item.stateId"
                    :inputValue="item.duration"
                    :valueType="item.valueType"
                    @inputChange="item.duration = $event; handleInputchange()"
                >
                </input-number>
                <input-number
                    v-else-if="item.id"
                    :inputValue="item.value"
                    :valueType="item.valueType"
                    @inputChange="item.value = $event; handleInputchange()"
                >
                </input-number>
                <input-number
                    v-else-if="item.type=='custom'" 
                    :inputValue="doneCount"
                    @inputChange="doneCount= $event; handleInputchange()"
                >
                </input-number>

                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>