<template>
    <div>
        <el-row>
            <el-col :span="12">
                <radar-chart :axis-data="axisData"></radar-chart>
            </el-col>
            <el-col :span="12">
                <bar-chart></bar-chart>
            </el-col>
        </el-row>
        <el-row>
            <cars-table :cars="cars"></cars-table>
        </el-row>
    </div>
</template>
<script>
import RadarChart from './radar-chart';
import BarChart from './bar-chart';
import CarsTable from './cars-table';

import { Cars, CarProps } from '../constants/game';

export default {
    components: {
        RadarChart,
        BarChart,
        CarsTable,
    },
    data() {
        return {
            cars: Cars,
        };
    },
    computed: {
        axisData() {
            return this.cars.map(({name, properties}) => ({
                axes: properties.map((p, i) => ({
                    axis: CarProps[i],
                    value: p,
                }))
            }))
        },
    },
};
</script>
<style lang="less" scoped>
</style>
