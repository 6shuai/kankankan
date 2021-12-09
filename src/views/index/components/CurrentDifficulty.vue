<!--
 * @Author: liushuai
 * @Date: 2021-12-03 10:36:26
 * @LastEditors: liushuai
 * @LastEditTime: 2021-12-03 11:19:57
 * @Description: file content
 * @FilePath: \kankankan\src\views\index\components\CurrentDifficulty.vue
-->
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
    const generateTreeCount = computed(() => store.state.logic.generateTreeCount)


    let logicDatas = prop.logicDatas
    let { bracketLeft, bracketRight, multiply, subtract, divide, add, equal } = prop.tool

    //当前树干的index
    let treeIndex = $ref(null)

    // const 当前难度系数 = (最终难度系数 - 初始难度系数) * (index + 1) / 树⼲总数量 + 初始难度系数
    let currentDifficulty = $ref(
        [
            bracketLeft, 
            logicDatas['finalDifficulty'], 
            multiply, 
            logicDatas['initialDifficulty'], 
            bracketRight, 
            subtract, 
            bracketLeft,
            { displayName: '当前树干的index', type: 'custom'},
            { name: '+1)'},
            divide, 
            { displayName: '树干总数量', name: null, tag: true }, 
            add, 
            logicDatas['initialDifficulty'],
            equal,
            { displayName: '当前难度系数', name: null, tag: true},
        ]
    )

    const handleInputchange = () => {
        let result = (getJsonValue(logicDatas['finalDifficulty']) - getJsonValue(logicDatas['initialDifficulty'])) * ( treeIndex ? treeIndex : 0 + 1 ) / generateTreeCount.value + getJsonValue(logicDatas['initialDifficulty'])
        if(result) currentDifficulty[currentDifficulty.length-1].name = result.toFixed(2)
    }

    watch(generateTreeCount, (n) => {
        currentDifficulty[10].name = n
        handleInputchange()
    })

</script>
<template>
    <el-card>
        <template #header>当前难度系数</template>
        <div class="formula">
            <div 
                class="item" 
                v-for="(item, index) in currentDifficulty"
                :key="index"
            >
                <div class="desc">{{ item.displayName ? item.displayName : '' }}</div>
                <input-number
                    v-if="item.id"
                    :inputValue="item.value"
                    :valueType="item.valueType"
                    @inputChange="item.value = $event; handleInputchange()"
                >
                </input-number>
                <input-number
                    v-else-if="item.type=='custom'" 
                    :inputValue="treeIndex"
                    @inputChange="treeIndex= $event; handleInputchange()"
                >
                </input-number>

                <el-tag class="symbol" v-else-if="item.tag">{{ item.name }}</el-tag>
                <span class="symbol" v-else>{{ item.name }}</span>
                <div class="desc">{{ item.variant }}</div>
            </div>
        </div>
    </el-card>
</template>