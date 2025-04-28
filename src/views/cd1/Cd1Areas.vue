<template>
  <svg ref="svg" class="areas" xmlns="http://www.w3.org/2000/svg">
    <polygon
      v-for="(rect, index) in rects"
      :key="index"
      :points="rect.map((p) => `${p.x},${p.y}`).join(' ')"
      stroke="rgba(214, 93, 137, 1)"
      fill="rgba(214, 93, 137, 0.2)"
      stroke-width="4"
      @click="onRectClick(index)"
      class="clickable"
    />
  </svg>
</template>

<script setup>
import { ref } from 'vue'

const rects = ref([
  [
    { x: 10, y: 10 },
    { x: 100, y: 10 },
    { x: 100, y: 100 },
    { x: 10, y: 100 },
  ],
  [
    { x: 150, y: 50 },
    { x: 250, y: 60 },
    { x: 240, y: 160 },
    { x: 140, y: 150 },
  ],
])

const svg = ref(null)

function onRectClick(index) {
  alert(`Clicked on rect #${index + 1}`)
}
</script>

<style scoped lang="scss">
.areas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}

/* Allow pointer events only on polygons */
svg {
  pointer-events: none;
}

polygon.clickable {
  pointer-events: auto;
  cursor: pointer;
}
</style>
