<template>
    <div>
        <el-row>
            <el-col :span="12">
                <radar-chart></radar-chart>
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

import Cars from '../constants/cars';

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
};
</script>
<style lang="less" scoped>
</style>
