<template>
    <div class="map-mark" :style="position">
        <div class="map-mark-inner">
            <span class="map-mark-text">
                <slot></slot>
            </span>
            <component :is="iconComponent" class="map-mark-icon"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import MapMarkCurrentIcon from '@/assets/icons/MapMarkCurrentIcon.vue';
import MapMarkDefaultIcon from '@/assets/icons/MapMarkDefaultIcon.vue';
import MapMarkNumericIcon from '@/assets/icons/MapMarkNumericIcon.vue';
import { parseCoords } from '@/utils/parseCoords';
import { computed } from 'vue';
import type { MapMarkVariant } from './types';
const MAP_HEIGHT = 1080
const MAP_WIDTH = 1920

const props = defineProps<{
    variant: MapMarkVariant
    location: string
}>()
const variantToIconComponent = {
    current: MapMarkCurrentIcon,
    numeric: MapMarkNumericIcon,
    default: MapMarkDefaultIcon,
}
const iconComponent = computed(() => variantToIconComponent[props.variant])

const position = computed(() => {
    const [x, y] = parseCoords(props.location);
    const percentTop = (x / MAP_HEIGHT) * 100
    const percentLeft = (y / MAP_WIDTH) * 100

    return {
        left: `${percentLeft}%`,
        top: `${percentTop}%`
    };
})
</script>

<style scoped lang="scss">
.map-mark {
    position: absolute;
    width: 42px;
    height: 42px;

    &-inner {
        position: relative;
    }

    &-text {
        position: absolute;
        bottom: 50%;
        right: 50%;
        transform: translate(50%, 50%);
        text-shadow: 
            -2px -2px 0 #D65D89, 
            2px -2px 0 #D65D89, 
            -2px 2px 0 #D65D89, 
            2px 2px 0 #D65D89;
        font-size: 22px;
        font-weight: 900;
        line-height: 100%;
        color: #fff;
    }

    &-icon {}
}
</style>