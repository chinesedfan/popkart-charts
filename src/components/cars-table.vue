<template>
    <div>
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
    props: ['cars', 'selected', 'selected2', 'onSelect'],
    data() {
        return {
            groupNames: CarFilters,
        };
    },
};
</script>
<style lang="less" scoped>
.car-group {
    display: flex;
    flex-wrap: wrap;
}
.car-item {
    width: 100px;
    height: 90px;
    border: 1px solid #000;

    margin-right: 20px;
    margin-bottom: 20px;

    &.selected {
        border-color: blue;
    }
    &.selected2 {
        border-color: red;
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
