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
            <cars-table :cars="tableCars" :selected="barCar" :selected2="barOtherCar" :on-select="onCarItemSelect"></cars-table>
        </el-row>
    </div>
</template>
<script>
import RadarChart from './radar-chart';
import BarChart from './bar-chart';
import CarsTable from './cars-table';

import { Cars, CarProps, CarFilters } from '../constants/game';

const CAR_MAX =
    { name: 'MAX', type: '竞速', rarity: '传说', properties: [1000, 1000, 1000, 1000, 1000] };

export default {
    components: {
        RadarChart,
        BarChart,
        CarsTable,
    },
    data() {
        return {
            cars: Cars,
            barCar: CAR_MAX,
            barCarLocked: false,
            barOtherCar: null,
        };
    },
    computed: {
        radarData() {
            return this.cars.map(({name, properties}) => ({
                axes: properties.map((p, i) => ({
                    axis: CarProps[i],
                    value: p,
                    // value: 1000,
                    // value: Math.random() * 1000,
                }))
            }));
        },
        tableCars() {
            const cars = Cars;
            return CarFilters.map((filter) => {
                switch (filter) {
                case '竞速':
                case '道具':
                    return cars.filter((car) => car.type === filter);
                case '传说':
                case '史诗':
                case '稀有':
                case '普通':
                    return cars.filter((car) => car.rarity === filter);
                case '全部':
                    return cars;
                default:
                    return [];
                }
            });
        },
    },
    methods: {
        onCarItemSelect(car) {
            const isSame = car.name === this.barCar.name;
            if (this.barCarLocked) {
                if (isSame) {
                    this.barCarLocked = false;
                } else {
                    this.barOtherCar = car;
                }
            } else {
                if (isSame) {
                    this.barCarLocked = true;
                } else {
                    this.barCar = car;
                }
            }
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
