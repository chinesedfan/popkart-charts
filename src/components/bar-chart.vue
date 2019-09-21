<template>
    <div id="bar-chart"></div>
</template>
<script>
import { CarProps } from '../constants/game';

export default {
    props: ['car', 'otherCar'],
    watch: {
        car() {
            this.draw();
        },
        otherCar() {
            this.draw();
        },
    },
    mounted() {
        this.draw();
    },
    methods: {
        draw() {
            const w = 570;
            const h = 300;

            const svg = d3.select('#bar-chart')
                .html('')
                .append('svg')
                .attr('transform', `translate(20,75)`)
                .attr('width', w)
                .attr('height', h);

            // labels
            const labelWidth = 70;
            svg.selectAll('text')
                .data(CarProps)
                .enter()
                .append('text')
                .attr('x', 0)
                .attr('y', (d, i) => i * 30 + 18)
                .text((d) => d);

            // bars
            const barWidth = 330;
            svg.selectAll('rect')
                .data((this.otherCar || this.car).properties)
                .enter()
                .append('rect')
                .attr('fill', 'blue')
                .attr('x', labelWidth + 20)
                .attr('y', (d, i) => i * 30)
                .attr('width', (d) => Math.floor(d * barWidth / 1000))
                .attr('height', 25);

            // diffs
            svg.append('g')
                .selectAll('text')
                .data(this.car.properties)
                .enter()
                .append('text')
                .attr('x', labelWidth + 20 + barWidth + 20)
                .attr('y', (d, i) => i * 30 + 18)
                .text((d, i) => {
                    if (!this.otherCar) return d;

                    const diff = this.otherCar.properties[i] - d;
                    return `${d} (${diff < 0 ? diff : '+' + diff})`;
                });
        }
    },
};
</script>
<style lang="less" scoped>
div {
    height: 300px;
}
</style>
