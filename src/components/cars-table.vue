<template>
    <div>
        <div class="table-top">
            <div style="flex: 1; vertical-align: middle;">
                <span class="car-text">{{ selected.name }}</span>
                &nbsp;vs&nbsp;
                <span class="car-text other">{{ selected2 ? selected2.name : '-' }}</span>
            </div>
            <el-tooltip style="margin-right: 20px;" effect="dark" :content="tips" placement="top-end">
                <i class="el-icon-question"></i>
            </el-tooltip>
            <el-button type="primary" plain @click="onBtnReset">重置</el-button>
            <el-button type="primary" plain @click="onBtnSwap">交换</el-button>
        </div>
        <el-tabs tab-position="left" style="height: 240px;">
            <el-tab-pane v-for="(group, index) in groupNames" :label="group" :key="group">
                <ul class="car-group">
                    <li v-for="car in cars[index]" :key="car.name" @click="onSelect(car)"
                        :class="{selected: selected && selected.name === car.name, selected2: selected2 && selected2.name === car.name}"
                        class="car-item">{{ car.name }}</li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { Cars, CarFilters } from '../constants/game';

export default {
    props: ['cars', 'selected', 'selected2', 'onBtnReset', 'onBtnSwap', 'onSelect'],
    data() {
        return {
            tips: '单击选中车辆，再次点击锁定，锁定后点击解锁',
            groupNames: CarFilters,
        };
    },
};
</script>
<style lang="less" scoped>
@color1: #1f77b4;
@color2: #ff7f0e;

.table-top {
   padding-bottom: 10px;
   margin-bottom: 10px;
   border-bottom: 1px solid #d7d7d7;
   display: flex;
   align-items: center; 
}
.car-text {
    font-weight: bold;
    color: @color1;

    &.other {
        color: @color2;
    }
}
.car-group {
    display: flex;
    flex-wrap: wrap;
}
.car-item {
    width: 100px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border: 1px solid #000;
    box-sizing: border-box;
    cursor: pointer;

    margin-right: 20px;
    margin-bottom: 20px;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    &.selected, &.selected2 {
        font-weight: bold;
        border-width: 2px;
        color: @color1;
        border-color: @color1;
    }
    &.selected2 {
        color: @color2;
        border-color: @color2;
    }
}
@media only screen and (min-width: 375px) and (max-width: 449px) {
    .car-item {
        width: 80px;
        height: 80px;
        line-height: 80px;

        margin-right: 10px;
    }
}
.el-tab-pane {
    height: 240px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
