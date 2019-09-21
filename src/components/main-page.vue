<template>
    <div class="main-container">
        <el-row style="padding: 40px 0; height: 400px;">
            <el-col :span="12">
                <radar-chart :chart-data="radarData"></radar-chart>
            </el-col>
            <el-col :span="12">
                <bar-chart :car="barCar" :other-car="barOtherCar"></bar-chart>
            </el-col>
        </el-row>
        <el-row>
            <cars-table :cars="cars" :on-select="onCarItemSelect"></cars-table>
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
        radarData() {
            return this.cars.map(({name, properties}) => ({
                axes: properties.map((p, i) => ({
                    axis: CarProps[i],
                    // value: p,
                    value: 1000,
                    // value: Math.random() * 1000,
                }))
            }));
        },
        barCar() {
            return this.cars[0];
        },
        barOtherCar() {
            return this.cars[1];
        },
    },
    methods: {
        onCarItemSelect(car) {

        },
    },
};
</script>
<style lang="less" scoped>
.main-container {
    margin: 0 auto;
    width: 80%;
}
</style>
