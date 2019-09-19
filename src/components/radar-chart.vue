<template>
    <div id="radar-chart"></div>
</template>
<script>
export default {
    props: ['axisData'],
    watch: {
        axisData() {
            this.draw();
        },
    },
    mounted() {
        this.draw();
    },
    methods: {
        draw() {
            const chart = RadarChart.chart();
            RadarChart.draw('#radar-chart', this.axisData, {
                w: 450,
                h: 450,
            });
        },
    },
};
</script>
<style lang="less" scoped>
</style>