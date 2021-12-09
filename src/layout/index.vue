<script setup>
    import PageHead from './head.vue'
    import PageMenu from './menu.vue'
</script>

<template>
    <page-head></page-head>
    
    <section class="main">
        <page-menu></page-menu>
        <div class="main_content">
            <el-scrollbar style="height: 100%;">
                <router-view></router-view>
            </el-scrollbar>
        </div>
    </section>

</template>


<style lang="less" scoped>
    .main{
        background: #f5f5f5;
        height: 100%;
        display: flex;

        &_content{
            margin-top: 50px;
            height: calc(100% - 90px);
            flex: 1;
            padding: 20px;
            overflow-x: auto;
        }
    }
</style>