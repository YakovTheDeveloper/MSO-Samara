<template>
    <div :class='["map-battle-point", props.isActive && "map-battle-point_active"]'>
        <div class="map-battle-point-icon">
            <component :is="BattleIcon" :style="iconStyles" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BattleIcon from '@/assets/icons/BattleIcon.vue';
import BattleIconActive from '@/assets/icons/BattleIconActive.vue';
import { computed } from 'vue';

const props = defineProps<{
    isActive: boolean
}>()

const iconStyles = computed(() => {
    if (props.isActive) return { width: '192px', height: '192px' }
    return { width: '128px', height: '128px' }
})

const IconComponent = computed(() => props.isActive ? BattleIconActive : BattleIcon)

</script>

<style scoped lang="scss">
.map-battle-point {

    $duration: 2.5s;

    position: relative;


    &_active &-icon {
        position: relative;
        animation: up-and-down $duration infinite ease-in-out;

        &:after {
            position: absolute;
            content: '';
            width: 160px;
            aspect-ratio: 1;
            z-index: 1;
            bottom: 60%;
            right: 50%;
            transform: translate(50%, 50%);
            border-radius: 50%;
            box-shadow: 0px 0px 60px rgba(180, 32, 36, 0.8);
        }
    }

    &_active {
        &:after {
            position: absolute;
            content: '';
            width: 52px;
            height: 12px;
            background: #000;
            opacity: 0.4;
            bottom: 0;
            right: 50%;
            transform: translateX(50%);
            border-radius: 50%;
            animation: shadow-pulse $duration infinite ease-in-out;
        }
    }

    @keyframes shadow-pulse {

        0%,
        100% {
            transform: translateX(50%) scale(1.2, 1.5);
            opacity: 0.7;
        }

        50% {
            transform: translateX(50%) scale(1);
            opacity: 0.2;
        }
    }

    @keyframes up-and-down {

        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-10%);
        }
    }
}
</style>
