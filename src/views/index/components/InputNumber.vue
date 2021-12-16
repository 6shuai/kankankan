<script setup>
    import { watch } from 'vue'
    import { ElMessage } from 'element-plus'

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

    const BlurText = (e) => {
        if(isInteger != 1) return
        let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value)
        if(!boolean) {
            ElMessage.error('请输入正整数')
            e.target.value = ''
        }
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
        @blur="BlurText($event)"
    ></el-input>
</template>