<template>
  <div class="map-mark-location" :style="position">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Point } from '@/entities'
import { parseCoords } from '@/utils/parseCoords'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    location: string | Point
    mapHeight?: number
    mapWidth?: number
  }>(),
  {
    mapHeight: 1080,
    mapWidth: 1920,
  },
)

const position = computed(() => {
  let finalCoords = props.location
  if (typeof finalCoords === 'object') {
    finalCoords = `${finalCoords?.x}, ${finalCoords?.y}`
  }
  const [x, y] = parseCoords(finalCoords)
  const percentTop = (x / props.mapHeight) * 100
  const percentLeft = (y / props.mapWidth) * 100

  return {
    left: `${percentLeft}%`,
    top: `${percentTop}%`,
  }
})
</script>

<style scoped lang="scss">
.map-mark-location {
  position: absolute;
  z-index: var(--z-index-marks);
}
</style>
