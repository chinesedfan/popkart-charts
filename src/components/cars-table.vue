<template>
    <div>
        <el-tabs tab-position="left" style="height: 400px;">
            <el-tab-pane v-for="(item, index) in cars" :label="item.name">{{ item.name }}</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    props: ['cars'],
};
</script>
<style lang="less" scoped>
</style>
