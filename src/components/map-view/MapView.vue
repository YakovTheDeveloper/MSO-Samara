<template>
    <div :style="sizes" class="map">
        <MapLogo />
        <img src="/map.png" draggable="false" class="map-img" />
        <span v-for="({ x, y }, index) in points" :key="index" class="map-battle"
            :style="{ left: `${x}%`, top: `${y}%` }">
            <BattleIcon />
        </span>
    </div>
</template>

<script setup>
import BattleIcon from '@/assets/icons/BattleIcon.vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import MapLogo from './ui/MapLogo.vue';

const store = storeToRefs(useCounterStore())


const points = [{
    x: 10,
    y: 10
}, {
    x: 70,
    y: 20
}]

const sizes = computed(() => {
    return {
        width: `${100 * store.sizeCoefficient.value}%`,
        height: `${100 * store.sizeCoefficient.value}%`
    };
});

</script>

<style lang="scss" scoped>
.map {
    position: relative;
    transition: all 0.5s ease-in-out;

    &:after {
        // content: '';
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
    }
}
</style>