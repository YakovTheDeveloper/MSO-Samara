<template>
  <div
    class="map-scalable"
    :style="mapStyle"
    @touchstart="map.onTouchStart"
    @touchmove="map.onTouchMove"
    @touchend="map.onTouchEnd"
    @mousedown="map.onMouseDown"
    @mousemove="map.onMouseMove"
    @mouseup="map.onMouseUp"
    @mouseleave="map.onMouseUp"
  >
    <img
      :src="props.imgSrc"
      draggable="false"
      class="map-img"
      :width="initImgSizes[0]"
      :height="initImgSizes[1]"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMap } from './composable/useMap'

const props = defineProps<{
  sizeCoefficient: number
  imgSrc: string
  initImgSizes?: [number, number]
}>()

const defaultInitImgSizes: [number, number] = [1920, 1080]
const initImgSizes = computed(() => props.initImgSizes || defaultInitImgSizes)

const containerWidth = ref(window.innerWidth)
const containerHeight = ref(window.innerHeight)

const map = useMap({
  containerWidth,
  containerHeight,
  mapWidth: computed(() => initImgSizes.value[0]),
  mapHeight: computed(() => initImgSizes.value[1]),
  sizeCoefficient: computed(() => props.sizeCoefficient),
})

onMounted(() => {
  window.addEventListener('resize', () => {
    containerWidth.value = window.innerWidth
    containerHeight.value = window.innerHeight
  })
})

const mapStyle = map.mapStyle
</script>

<style lang="scss" scoped>
.map-scalable {
  display: inline-block;
  transform-origin: top left; // Anchor scaling from top-left
  transition: transform 0.1s ease-in-out;
}

.map-img {
  display: block;
  max-width: none; // Prevent auto-resizing
  max-height: none;
  user-select: none;
  pointer-events: none;
}
</style>
