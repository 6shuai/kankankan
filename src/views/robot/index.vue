<script setup>
    import RobotLevel from './components/RobotLevel.vue'
    import RobotInfo from './components/RobotInfo.vue'
</script>

<template>
    <el-card>
        <template #header>机器人配置</template>
        
        <robot-level></robot-level>

        <robot-info></robot-info>

    </el-card>
</template>