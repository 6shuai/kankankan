<script setup>
    import { watch } from 'vue'
    import { BlurText } from '@/utils/index'

    const props = defineProps({
        inputValue: Number | String,

        //valueType 1整形 2浮点  3字符串
        valueType:{
            type: Number,
            default: 2
        }
    })

    const emit = defineEmits(['inputChange'])

    //input value
    let inputValue = $ref(props.inputValue ? Number(props.inputValue) : null)

    //是否只能输入整数
    let isInteger = $ref(props.valueType)

    //修改input
    const handleInputchange = () => {
        emit('inputChange', inputValue)
    }

    //监听input 数据变化
    watch(() => props.inputValue, (n) => {
        inputValue = n
    })

</script>

<template>
    <el-input
        type="number" 
        :controls="false"
        v-model="inputValue" 
        @input="handleInputchange"
        @blur="BlurText($event, isInteger)"
    ></el-input>
</template>