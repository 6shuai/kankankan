<script setup>
    import { getJsonValue } from '@/utils/index'
    import { useStore } from 'vuex'
    import { computed, watch } from 'vue'
    import InputNumber from './InputNumber.vue'
 
    const prop = defineProps({
        logicDatas: Object,
        tool: Object
    })
    const store = useStore()
    let logicDatas = prop.logicDatas
    let { multiply, subtract, equal, divide, bracketLeft, bracketRight} = prop.tool

    //本场得分
    let roundScore = computed(() => store.state.logic.roundScore)

    // const 连击计时时⻓ = 连击计时初始系数 * (连击计时难度系数A - 本次得分) / 连击计时难度系数B
    let data = $ref(
        [
            logicDatas['comboBaseRatio'],
            subtract,
            bracketLeft,
            logicDatas['comboDifficulty1'],
            multiply,
            { displayName: '本次得分', name: null, tag: true },
            bracketRight,
            divide,
            logicDatas['comboDifficulty2'],
            equal,
            { displayName: '连击计时时⻓', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = getJsonValue(logicDatas['comboBaseRatio']) * (getJsonValue(logicDatas['comboDifficulty1']) - roundScore.value) / getJsonValue(logicDatas['comboDifficulty2'])
        data[data.length-1].name = result.toFixed(2)
    }

    watch(roundScore, (n) => {
        data[5].name = n
        handleInputchange()
    })


</script>
<template>
    <el-card>
        <template #header>连击计时时⻓</template>
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
                    :inputValue="doubleHitCount"
                    @inputChange="doubleHitCount= $event; handleInputchange()"
                >
                </input-number>

                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>