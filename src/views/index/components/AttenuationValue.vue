<script setup>
    import { useStore } from 'vuex'
    import { computed, watch } from 'vue'
    import { getJsonValue } from '@/utils/index'
    import InputNumber from './InputNumber.vue'
 
    const prop = defineProps({
        logicDatas: Object,
        tool: Object
    })
    
    const store = useStore()

    let logicDatas = prop.logicDatas
    let { equal, divide , bracketLeft, bracketRight} = prop.tool

    //蓄力值加成
    let accumulatorAddition = computed(() => store.state.logic.accumulatorAddition)

    // const 蓄⼒值每秒衰减值 = 蓄⼒值加成 / (冲刺条初始衰减系数 / 冲刺条衰减难度系数)
    let attenuation = $ref(
        [
            { displayName: '蓄力值加成', name: null, tag: true },
            divide,
            bracketLeft,
            logicDatas['rushDiscountBaseRatio'], 
            divide, 
            logicDatas['rushDiscountDifficulty'],
            bracketRight,
            equal,
            { displayName: '蓄⼒值每秒衰减值', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = accumulatorAddition.value / (getJsonValue(logicDatas['rushDiscountBaseRatio']) / getJsonValue(logicDatas['rushDiscountDifficulty']))
        attenuation[attenuation.length-1].name = result.toFixed(4)
    }

    watch(accumulatorAddition, (n) => {
        attenuation[0].name = n
        handleInputchange()
    })

</script>
<template>
    <el-card>
        <template #header>蓄⼒值每秒衰减值</template>
        <div class="formula">
            <div 
                class="item" 
                v-for="(item, index) in attenuation"
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

                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>