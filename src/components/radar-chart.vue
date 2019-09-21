<template>
    <div id="radar-chart"></div>
</template>
<script>
export default {
    props: ['chartData'],
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
            RadarChart.draw('#radar-chart', this.chartData, {
                w: 300,
                h: 300,
                // factor: 0.7,
            });
        },
    },
};
</script>
<style lang="less">
/* no scoped */
#radar-chart {
    text-align: center;
    vertical-align: middle;
}
.radar-chart {
    display: inline-block;
}
</style>