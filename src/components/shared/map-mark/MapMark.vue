<template>
  <div class="map-mark-inner">
    <span class="map-mark-text">
      <slot></slot>
    </span>
    <component :is="iconComponent" class="map-mark-icon"></component>
  </div>
</template>

<script setup lang="ts">
import MapMarkCurrentIcon from '@/assets/icons/MapMarkCurrentIcon.vue'
import MapMarkDefaultIcon from '@/assets/icons/MapMarkDefaultIcon.vue'
import MapMarkNumericIcon from '@/assets/icons/MapMarkNumericIcon.vue'
import { computed } from 'vue'
import type { MapMarkVariant } from './types'

const props = defineProps<{
  variant: MapMarkVariant
}>()
const variantToIconComponent = {
  current: MapMarkCurrentIcon,
  numeric: MapMarkNumericIcon,
  default: MapMarkDefaultIcon,
}
const iconComponent = computed(() => variantToIconComponent[props.variant])

</script>

<style scoped lang="scss">
.map-mark {
  &-inner {
    position: relative;
  }

  &-text {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    text-shadow:
      -2px -2px 0 #d65d89,
      2px -2px 0 #d65d89,
      -2px 2px 0 #d65d89,
      2px 2px 0 #d65d89;
    font-size: 22px;
    font-weight: 900;
    line-height: 100%;
    color: #fff;
  }

  &-icon {
  }
}
</style>
