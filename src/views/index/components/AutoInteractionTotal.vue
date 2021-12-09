<script setup>
    import { getJsonValue } from '@/utils/index'
    import { useStore } from 'vuex'
    import InputNumber from './InputNumber.vue'
 
    const prop = defineProps({
        logicDatas: Object,
        tool: Object
    })
    const store = useStore()
    let logicDatas = prop.logicDatas
    let { subtract, add, equal } = prop.tool

    //冲刺状态次数
    let sprintCount = $ref(null)

    // const ⾃动交互对象总数 = 冲刺⾃动交互基数 + 冲刺状态次数 * 冲刺⾃动交互系数
    let data = $ref(
        [
            logicDatas['rushBaseCount'],
            add,
            { displayName: '冲刺状态次数', type: 'custom' },
            subtract,
            logicDatas['rushCountRatio'],
            equal,
            { displayName: '⾃动交互对象总数', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = getJsonValue(logicDatas['rushBaseCount']) + sprintCount * getJsonValue(logicDatas['rushCountRatio'])
        data[data.length-1].name = result.toFixed(0)
        store.state.logic.autoInteractionTotal = result.toFixed(0)
    }


</script>
<template>
    <el-card>
        <template #header>⾃动交互对象总数</template>
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
                    :inputValue="sprintCount"
                    @inputChange="sprintCount= $event; handleInputchange()"
                >
                </input-number>

                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>