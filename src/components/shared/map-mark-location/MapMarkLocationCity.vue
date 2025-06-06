<template>
  <div
    v-if="props.location?.length !== 0"
    class="map-mark-location"
    :style="[position, bubbleStyle]"
  >
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
    positionType?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }>(),
  {
    mapHeight: 1080,
    mapWidth: 1920,
  },
)
const bubbleStyle = computed(() => {
  const radius = '24px'
  const unset = '0'

  switch (props.positionType) {
    case 'top-left':
      return {
        transform: 'translate(0%, 0%)',
        borderRadius: `${unset} ${radius} ${radius} ${radius}`,
      }
    case 'top-right':
      return {
        transform: 'translate(-100%, 0%)',
        borderRadius: `${radius} ${unset} ${radius} ${radius}`,
      }
    case 'bottom-left':
      return {
        transform: 'translate(0%, -100%)',
        borderRadius: `${radius} ${radius} ${radius} ${unset}`,
      }
    case 'bottom-right':
      return {
        transform: 'translate(-100%, -100%)',
        borderRadius: `${radius} ${radius} ${unset} ${radius}`,
      }
    default:
      return {
        transform: 'translate(-50%, -50%)',
        borderRadius: `${radius}`,
      }
  }
})

const position = computed(() => {
  console.log(`output->location`, props.location)
  console.log(`output->props.mapWidth`, props.mapWidth)
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
  position: absolute;
  z-index: var(--z-index-marks);
  background: white; // optional for bubble visibility
  border: 4px solid var(--color-blue);
  color: var(--color-blue);
  padding: 12px 24px;
  font-weight: 700;
  font-size: 22px;
  border-radius: 24px;
}
</style>
