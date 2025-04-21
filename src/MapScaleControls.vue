<template>
    <div class="map-scale-controls">
        <button @click="increment">

        </button>
        <button @click="decrement">

        </button>
    </div>
</template>

<script setup lang="ts">

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