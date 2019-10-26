<template>
    <div id="bar-chart"></div>
</template>
<script>
import { CarProps } from '../constants/game';

function getNumberAttr(selection, name) {
    return parseInt(selection.attr(name));
}

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
            const w = 540;
            const h = 220;
            const offsetX = 20;
            const offsetY = 75;

            const screenWidth = window.document.documentElement.clientWidth;
            const scale = screenWidth >= w ? 1 : screenWidth / w;

            const svg = d3.select('#bar-chart')
                .html('')
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .style('transform', `scale(${scale})`)
                .style('transform-origin', 'left center')
                // svg has no `transform` in Safari
                .append('g')
                .attr('transform', `translate(${offsetX},${offsetY})`);

            const self = this;
            svg.selectAll('g')
                .data(CarProps)
                .enter()
                .append('g')
                .each(function(d, i) {
                    const labelWidth = 70;
                    const barWidth = 330;
                    const g = d3.select(this);

                    const car = self.otherCar || self.car;
                    const diff = car.properties[i] - self.car.properties[i];
                    const min = Math.min(car.properties[i], self.car.properties[i]);

                    // label
                    const sLabel = g.append('text')
                        .attr('x', 0)
                        .attr('y', i * 30 + 18)
                        .text(d);
                    // bar
                    const sBar = g.append('rect')
                        .attr('fill', '#1f77b4')
                        .attr('x', labelWidth + 20)
                        .attr('y', i * 30)
                        .attr('width', Math.floor(self.car.properties[i] * barWidth / 1000))
                        .attr('height', 25);
                    // value
                    const sValue = g.append('text')
                        .attr('x', labelWidth + 20 + barWidth + 20)
                        .attr('y', sLabel.attr('y'))
                        .text(car.properties[i]);

                    if (!self.otherCar) return;
                    // diff bar
                    g.append('rect')
                        .attr('fill', diff < 0 ? '#ff7f0e' : '#ff7f0ea2')
                        .attr('x', sBar.attr('x'))
                        .attr('y', i * 30)
                        .attr('width', Math.floor(Math.abs(self.otherCar.properties[i]) * barWidth / 1000))
                        .attr('height', 25);
                    // diff value
                    const diffColor = diff < 0 ? 'green' : 'red';
                    diff && g.append('text')
                        .attr('fill', diffColor)
                        .attr('x', getNumberAttr(sValue, 'x') + 30)
                        .attr('y', sValue.attr('y'))
                        .text(diff < 0 ? `(${diff})` : `(+${diff})`);
                });
        },
    },
};
</script>
<style lang="less" scoped>
#bar-chart {
    height: 300px;
    text-align: center;
}
</style>
