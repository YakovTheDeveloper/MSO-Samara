<template>
    <div :style="sizes" class="map">
        <MapLogo />
        <img src="/map.png" draggable="false" class="map-img" />
        <span v-for="(battle, index) in battleStore.battles.value" :key="index" @click="chooseBattleHandler(battle)"
            class="map-battle" :style="getBattlePositionStyle(battle.location)">
            <MapBattlePoint :is-active="battle.id === battleStore.currentBattle.value?.id" />
        </span>
    </div>
</template>

<script setup lang="ts">

import { useBattlesStore, useCounterStore, useFlowsStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import MapLogo from './ui/MapLogo.vue';
import MapBattlePoint from './ui/MapBattlePoint.vue';
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

    &:after {
        content: '';
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        display: block;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(59.32% 81.16% at 50% 50%, rgba(246, 233, 216, 0) 69.23%, rgba(255, 255, 255, 0.6) 91.35%);
        z-index: 2;
    }

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