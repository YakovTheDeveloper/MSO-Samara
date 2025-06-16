<template>
  <div ref="box" class="map-scale-controls" id="scale-controls">
    <button @click="emitIncrement">
      <PlusIcon />
    </button>
    <slot></slot>
    <button @click="emitDecrement">
      <MinusIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import MinusIcon from './assets/icons/MinusIcon.vue'
import PlusIcon from './assets/icons/PlusIcon.vue'
import { useMapScaleStore } from './stores/zoomStore'

defineEmits(['increment', 'decrement'])

const scaleStore = useMapScaleStore()

const emitIncrement = () => {
  scaleStore.increment()
}
const emitDecrement = () => {
  scaleStore.decrement()
}

const emitZoomChange = () => {}
</script>

<style scoped>
.map-scale-controls {
  padding: var(--container-padding);
  right: 80px;
  bottom: 80px;
  position: fixed;
  /* transform-origin: bottom right; */
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* width: 60px;
  height: 130px; */

  button {
    background-color: #ececec;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
