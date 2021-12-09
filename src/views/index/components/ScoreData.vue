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
    let { multiply, equal, divide, bracketRight} = prop.tool

    //连击数
    let doubleHitCount  = $ref(null)

    // const 本次得分 = Math.min(Math.max(Math.floor((连击数 - 连击效果阈值) / 晋级连击数) + 2, 1), 最⼤连击加成)
    let data = $ref(
        [
            { name: 'Math.min(Math.max(Math.floor((' },
            { displayName: '连击数', type: 'custom' },
            multiply,
            logicDatas['comboThreshold'],
            bracketRight,
            divide,
            logicDatas['levelUpComboHit'],
            { name: ') + 2, 1 ),' },
            logicDatas['maxComboBonus'],
            bracketRight,
            equal,
            { displayName: '本次得分', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = Math.min(Math.max(Math.floor((doubleHitCount - getJsonValue(logicDatas['comboThreshold'])) / getJsonValue(logicDatas['levelUpComboHit'])) + 2, 1), getJsonValue(logicDatas['maxComboBonus']))
        data[data.length-1].name = result.toFixed(0)
        store.state.logic.roundScore = result.toFixed(0)
    }


</script>
<template>
    <el-card>
        <template #header>本次得分</template>
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