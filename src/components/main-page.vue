<template>
    <div class="main-container">
        <el-row class="row-top">
            <el-col :xs="24" :md="12">
                <radar-chart :chart-data="radarData"></radar-chart>
            </el-col>
            <el-col :xs="24" :md="12">
                <bar-chart :car="barCar" :other-car="barOtherCar"></bar-chart>
            </el-col>
        </el-row>
        <el-row class="row-bottom">
            <cars-table :cars="tableCars" :selected="barCar" :selected2="barOtherCar"
                :on-btn-reset="onBtnReset" :on-btn-swap="onBtnSwap"
                :on-select="onCarItemSelect"></cars-table>
        </el-row>
    </div>
</template>
<script>
import RadarChart from './radar-chart';
import BarChart from './bar-chart';
import CarsTable from './cars-table';

import { CAR_MAX, Cars, CarProps, CarFilters } from '../constants/game';

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
            const cars = [this.barCar];
            if (this.barOtherCar) {
                cars.push(this.barOtherCar);
            }
            return cars.map(({name, properties}) => ({
                axes: properties.map((p, i) => ({
                    axis: CarProps[i],
                    value: p,
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
        onBtnReset() {
            this.barCar = CAR_MAX;
            this.barCarLocked = false;
            this.barOtherCar = null;
        },
        onBtnSwap() {
            const temp = this.barCar;
            this.barCar = this.barOtherCar;
            this.barOtherCar = temp;
        },
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
    overflow: hidden;
}
.row-top, .row-bottom {
    margin: 0 auto;
    width: 80%;
}
.row-top {
    padding: 40px 0;
}
@media only screen and (max-width: 767px) { // xs
    .row-top {
        width: 100%;
    }
}
@media only screen and (min-width: 992px) { // md
}
</style>
