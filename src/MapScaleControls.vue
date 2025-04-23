<template>
    <div class="map-scale-controls">
        <button @click="increment">
            <PlusIcon />
        </button>
        <button @click="decrement">
            <MinusIcon />
        </button>
    </div>
</template>

<script setup lang="ts">

import MinusIcon from './assets/icons/MinusIcon.vue';
import PlusIcon from './assets/icons/PlusIcon.vue';
import { useCounterStore } from './stores/counter';


const { increment, decrement } = useCounterStore()

</script>

<style scoped>
.map-scale-controls {
    padding: var(--container-padding);
    right: 80px;
    bottom: 80px;
    position: fixed;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
        background-color: #ECECEC;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>