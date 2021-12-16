<script setup>
    import { getJsonValue } from '@/utils/index'
    import { computed, watch } from 'vue'
    import { useStore } from 'vuex'
    import InputNumber from './InputNumber.vue'
 
    const prop = defineProps({
        logicDatas: Object,
        tool: Object
    })
    const store = useStore()
    let logicDatas = prop.logicDatas
    let { subtract, add, equal, divide , bracketLeft, bracketRight} = prop.tool

    //冲刺状态次数
    let sprintCount = computed(() => store.state.logic.sprintStateCount )

    // const 蓄力值加成 = 1 / (冲刺条初始加成系数 + 冲刺状态次数 * 冲刺条加成难度系数)
    let addition = $ref(
        [
            { name: '1' },
            divide,
            bracketLeft,
            logicDatas['rushBoostRatio'], 
            add, 
            { displayName: '冲刺状态次数', type: 'custom' },
            subtract,
            logicDatas['rushDifficultRatio'],
            bracketRight,
            equal,
            { displayName: '蓄力值加成', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = 1 / (getJsonValue(logicDatas['rushBoostRatio']) + sprintCount.value * getJsonValue(logicDatas['rushDifficultRatio']))
        addition[addition.length-1].name = result.toFixed(2)
        store.state.logic.accumulatorAddition = result.toFixed(2)
    }
    
    //监听冲刺状态次数修改
    watch(sprintCount, (n) => {
        handleInputchange()
    })

</script>
<template>
    <el-card>
        <template #header>蓄力值加成</template>
        <div class="formula">
            <div 
                class="item" 
                v-for="(item, index) in addition"
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
                    @inputChange="store.commit('logic/setSprintStateCount', $event)"
                >
                </input-number>


                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>