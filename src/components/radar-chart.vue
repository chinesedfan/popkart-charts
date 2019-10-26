<template>
    <div id="radar-chart"></div>
</template>
<script>
import { CAR_MAX, CAR_MIN } from '../constants/game';

export default {
    props: ['chartData'],
    watch: {
        chartData() {
            this.draw();
        },
    },
    mounted() {
        this.draw();
    },
    methods: {
        draw() {
            const w = 400;
            const screenWidth = window.screen.width;
            const scale = screenWidth >= w ? 1 : screenWidth / w;

            const maxValue = CAR_MAX.properties[0];
            const minValue = CAR_MIN.properties[0];
            // avoid the differences too close
            const chartData = this.chartData.map(({axes}) => {
                axes = axes.map(({axis, value}) => ({axis, value: value - minValue}))
                // expect to be clockwise
                return [axes[0]].concat(axes.slice(1).reverse());
            });

            const chart = RadarChart.chart();
            RadarChart.draw('#radar-chart', chartData, {
                w: 400 * scale,
                h: 300 * scale,
                factor: 0.9,
                maxValue: maxValue - minValue,
                minValue: 0,
                radius: 3,
                tooltipFormatValue: d => d + minValue,
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