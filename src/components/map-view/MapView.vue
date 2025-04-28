<template>
  <div :style="sizes" class="map">
    <img :src="props.imgSrc" draggable="false" class="map-img" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sizeCoefficient: number
  imgSrc: string
}>()

const sizes = computed(() => {
  return {
    transform: `scale(${1 * props.sizeCoefficient})`,
  }
})
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  transition: all 0.3s ease-in-out;

  &-img {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &-battle {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);
  }
}
</style>
