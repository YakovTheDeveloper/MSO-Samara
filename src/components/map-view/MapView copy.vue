<template>
  <div class="map-container">
    <div class="map-scalable" :style="mapStyle">
      <img
        :src="props.imgSrc"
        draggable="false"
        class="map-img"
        :width="initImgSizes[0]"
        :height="initImgSizes[1]"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sizeCoefficient: number
  imgSrc: string
  initImgSizes?: [number, number]
}>()

const defaultInitImgSizes: [number, number] = [1920, 1080]
const initImgSizes = computed(() => props.initImgSizes || defaultInitImgSizes)

const mapStyle = computed(() => ({
  transform: `scale(${props.sizeCoefficient})`,
}))
</script>

<style lang="scss" scoped>
.map-container {
  // width: 100%;
  // height: 100%;
  overflow: auto; // <== This is the ONLY scrollbar
  position: relative;
}

.map-scalable {
  display: inline-block;
  transform-origin: top left; // Anchor scaling from top-left
  transition: transform 0.4s ease-in-out;
}

.map-img {
  display: block;
  max-width: none; // Prevent auto-resizing
  max-height: none;
  user-select: none;
  pointer-events: none;
}
</style>
