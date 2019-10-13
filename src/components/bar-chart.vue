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
            const w = 570;
            const h = 300;

            const svg = d3.select('#bar-chart')
                .html('')
                .append('svg')
                .attr('transform', `translate(20,75)`)
                .attr('width', w)
                .attr('height', h);

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

                    // label
                    const sLabel = g.append('text')
                        .attr('x', 0)
                        .attr('y', i * 30 + 18)
                        .text(d);
                    // bar
                    const sBar = g.append('rect')
                        .attr('fill', 'blue')
                        .attr('x', labelWidth + 20)
                        .attr('y', i * 30)
                        .attr('width', Math.floor(car.properties[i] * barWidth / 1000))
                        .attr('height', 25);
                    // value
                    const sValue = g.append('text')
                        .attr('x', labelWidth + 20 + barWidth + 20)
                        .attr('y', sLabel.attr('y'))
                        .text(Math.min(car.properties[i], self.car.properties[i]));

                    if (!self.otherCar) return;
                    // diff bar
                    const diffColor = diff < 0 ? 'green' : 'red';
                    g.append('rect')
                        .attr('fill', diffColor)
                        .attr('x', getNumberAttr(sBar, 'x') + getNumberAttr(sBar, 'width'))
                        .attr('y', i * 30)
                        .attr('width', Math.floor(Math.abs(diff) * barWidth / 1000))
                        .attr('height', 25);
                    // diff value
                    diff && g.append('text')
                        .attr('fill', diffColor)
                        .attr('x', getNumberAttr(sValue, 'x') + 30)
                        .attr('y', sValue.attr('y'))
                        .text(diff < 0 ? `(${diff})` : `(+${diff})`);
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
