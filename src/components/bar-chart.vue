<template>
    <div id="bar-chart"></div>
</template>
<script>
export default {
    props: ['car', 'otherCar'],
    mounted() {
        this.draw();
    },
    methods: {
        draw() {
            const w = 500;
            const h = 400;
            const dataset = this.car.properties; // [val]

            const svg = d3.select('#bar-chart')
              .append('svg')
              .attr('width', w)
              .attr('height', h);

            svg.selectAll('rect')
               .data(dataset)
               .enter()
               .append('rect')
               .attr('y', (d, i) => i * 30)
               .attr('x', 0)
               .attr('height', 25)
               .attr('width', (d) => d % w);
        }
    },
};
</script>
<style lang="less" scoped>
div {
    height: 400px;
}
</style>
