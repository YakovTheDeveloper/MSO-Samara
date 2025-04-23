<template>
    <div :style="sizes" class="map">
        <img src="/forest/forest-map.png" draggable="false" class="map-img" />
        <span v-for="(battle, index) in battleStore.battles.value" :key="index" @click="chooseBattleHandler(battle)"
            class="map-battle" :style="getBattlePositionStyle(battle.location)">
            <!-- <MapBattlePoint :is-active="battle.id === battleStore.currentBattle.value?.id" /> -->
        </span>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

import { useBattlesStore, useCounterStore, useFlowsStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { parseCoords } from '@/utils/parseCoords';
import { MAP_HEIGHT, MAP_WIDTH } from '@/constants';


const store = storeToRefs(useCounterStore())
const battleStore = storeToRefs(useBattlesStore())
const { chooseBattleHandler } = useFlowsStore()

const getBattlePositionStyle = (location: string) => {
    const [x, y] = parseCoords(location);
    const percentTop = (x / MAP_HEIGHT) * 100
    const percentLeft = (y / MAP_WIDTH) * 100

    return {
        left: `${percentLeft}%`,
        top: `${percentTop}%`
    };
};


const sizes = computed(() => {
    return {
        transform: `scale(${1 * store.sizeCoefficient.value})`
    }
});

</script>

<style lang="scss" scoped>
.map {
    position: relative;
    transition: all 0.3s ease-in-out;

    &-img {
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &-battle {
        position: absolute;
        z-index: 3;
        transform: translate(-50%, -50%);
    }
}
</style>