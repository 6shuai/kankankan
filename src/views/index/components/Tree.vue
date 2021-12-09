<script setup>
    import { getJsonValue } from '@/utils/index'
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import InputNumber from './InputNumber.vue'

    const store = useStore()
    const props = defineProps({
        logicDatas: Object,
        playerStates: Object,
        tool: Object  
    })
    let logicDatas = props.logicDatas
    let playerStates = props.playerStates
    let { bracketLeft, bracketRight, divide, add, equal } = props.tool

    // ⽣成对象总数量
    const generateTreeCount = computed(() => store.state.logic.generateTreeCount)

    //主游戏时⻓
    let gameTime = $ref(null)

    // const ⽣成对象总数量 = 主游戏时⻓ / (后摇时⻓ + 闪避时⻓) + ⽣成对象溢出
    let treeTotal = $ref(
        [
            { displayName: '主游戏时⻓', type: 'custom'},
            divide, 
            bracketLeft, 
            playerStates['server.state_machine.player_state.WindDownState'], 
            add, 
            playerStates['server.state_machine.player_state.EvasionState'], 
            bracketRight, 
            add, 
            logicDatas['redundantTreeNode'],
            equal,
        ]     
    )

    const handleInputchange = () => {
        let result = gameTime / (getJsonValue(playerStates['server.state_machine.player_state.WindDownState']) + getJsonValue(playerStates['server.state_machine.player_state.EvasionState'])) + getJsonValue(logicDatas['redundantTreeNode'])
        store.state.logic.generateTreeCount = result.toFixed(0)
    }


</script>
<template>
    <el-card>
        <template #header>⽣成对象总数量</template>
        <div class="formula">
            <div 
                class="item" 
                v-for="(item, index) in treeTotal"
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
                    :inputValue="gameTime"
                    @inputChange="gameTime= $event; handleInputchange()"
                >
                </input-number>


                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant || item.className }}</div>
            </div>
            <div class="item">
                <div class="desc">⽣成对象总数量</div>
                <el-tag class="symbol">{{generateTreeCount }}</el-tag>
            </div>
        </div>
    </el-card>
</template>