<script setup>
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()


    const handleSelect = (e) => {
        router.push(e)
    }

</script>

<template>
    <div class="menu_wrap">
        <div class="logo">
            砍砍砍
        </div>
        <el-menu
            :default-active="route.path"
            active-text-color="#ffd04b"
            background-color="#222831"
            text-color="#ffffff"
            class="el_menu_vertical_kkk"
            @select="handleSelect"
        >
            
            <el-menu-item index="/">
                <span>逻辑关系</span>
            </el-menu-item>
            <el-menu-item index="/config">
                <span>游戏配置</span>
            </el-menu-item>
            <el-menu-item index="/robot">
                <span>机器人配置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style lang="less" scoped>
    .menu_wrap{
        width: 220px;
        height: 100%;
        background: #222831;
        font-size: 16px;

        .logo{
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #999;
            background: #1a1f25;
        }

        .el_menu_vertical_kkk{
            border-right: none;
        }
    }
</style>