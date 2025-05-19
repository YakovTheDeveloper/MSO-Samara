<template>
  <div v-if="props.location?.length !== 0" class="map-mark-location" :style="position">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Point } from '@/entities'
import { parseCoords } from '@/utils/parseCoords'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    location: string | Point | null
    mapHeight?: number
    mapWidth?: number
  }>(),
  {
    mapHeight: 1080,
    mapWidth: 1920,
  },
)

const position = computed(() => {
  console.log(`output->location`, props.location)
  console.log(`output->props.mapWidth`,props.mapWidth)
  let finalCoords = props.location
  if (typeof finalCoords === 'object') {
    finalCoords = `${finalCoords?.x}, ${finalCoords?.y}`
  }
  const [x, y] = parseCoords(finalCoords)
  const percentLeft = (x / props.mapWidth) * 100
  const percentTop = (y / props.mapHeight) * 100

  return {
    left: `${percentLeft}%`,
    top: `${percentTop}%`,
  }
})
</script>

<style scoped lang="scss">
.map-mark-location {
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: var(--z-index-marks);
}
</style>
