<template>
  <div class="map-mark-location" :style="position">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { parseCoords } from '@/utils/parseCoords'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    location: string
    mapHeight: number
    mapWidth: number
  }>(),
  {
    mapHeight: 1080,
    mapWidth: 1920,
  },
)

const position = computed(() => {
  const [x, y] = parseCoords(props.location)
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
}
</style>
