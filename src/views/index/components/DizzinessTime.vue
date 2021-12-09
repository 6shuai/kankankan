<script setup>
    import { getJsonValue } from '@/utils/index'
    import InputNumber from './InputNumber.vue'
 
    const prop = defineProps({
        playerStates: Object,
        logicDatas: Object,
        tool: Object
    })

    let logicDatas = prop.logicDatas
    let playerStates = prop.playerStates
    let { subtract, add, equal } = prop.tool

    //角色眩晕次数
    let dizzinessCount = $ref(null)

    // const 本次眩晕时长 = 基础眩晕时⻓ + 眩晕时⻓加成 * 角色眩晕次数
    let dizzinessTime = $ref(
        [
            playerStates['server.state_machine.player_state.StunState'], 
            add, 
            logicDatas['stunDurationBoost'], 
            subtract,
            { displayName: '角色眩晕次数', type: 'custom' },
            equal,
            { displayName: '本次眩晕时长', name: null, tag: true },
        ]
    )

    const handleInputchange = () => {
        let result = getJsonValue(playerStates['server.state_machine.player_state.StunState']) + getJsonValue(logicDatas['stunDurationBoost']) * dizzinessCount
        dizzinessTime[dizzinessTime.length-1].name = result.toFixed(2)
    }


</script>
<template>
    <el-card>
        <template #header>本次眩晕时长</template>
        <div class="formula">
            <div 
                class="item" 
                v-for="(item, index) in dizzinessTime"
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
                    :inputValue="dizzinessCount"
                    @inputChange="dizzinessCount= $event; handleInputchange()"
                >
                </input-number>

                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>