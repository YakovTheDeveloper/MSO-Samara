<template>
    <div class="map-scale-controls">
        <ControlButton @click="increment" size="big" variant="square">
            <PlusIcon />
        </ControlButton>
        <ControlButton @click="decrement" size="big" variant="square">
            <MinusIcon />
        </ControlButton>
    </div>
</template>

<script setup lang="ts">
import MinusIcon from './assets/icons/MinusIcon.vue';
import PlusIcon from './assets/icons/PlusIcon.vue';
import ControlButton from './components/ui/control-button/ControlButton.vue';
import { useCounterStore } from './stores/counter';


const { increment, decrement } = useCounterStore()

</script>

<style scoped>
.map-scale-controls {
    padding: var(--container-padding);
    left: 0;
    bottom: 50%;
    transform: translateY(50%);
    position: fixed;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 32px;
}
</style>