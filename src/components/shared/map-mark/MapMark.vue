<template>
  <div class="map-mark-inner">
    <span class="map-mark-text">
      <slot></slot>
    </span>
    <component :is="iconComponent" class="map-mark-icon"></component>
    <span
      v-if="props.label"
      :class="['map-mark-label', 'map-mark-text-style', `map-mark-label_${props.variant}`]"
      >{{ props.label }}</span
    >
  </div>
</template>

<script setup lang="ts">
import MapMarkCurrentIcon from '@/assets/icons/MapMarkCurrentIcon.vue'
import MapMarkDefaultIcon from '@/assets/icons/MapMarkDefaultIcon.vue'
import MapMarkNumericIcon from '@/assets/icons/MapMarkNumericIcon.vue'
import { computed } from 'vue'
import type { MapMarkForest } from '@/entities'

const props = defineProps<{
  variant: MapMarkForest['mapTitleType'] | 'current'
  label?: string
}>()
const variantToIconComponent = {
  current: MapMarkCurrentIcon,
  number: MapMarkNumericIcon,
  text: MapMarkDefaultIcon,
}
// const variantToIconSizeStyle = {
//   current: { width: '42px', height: '62px' },
//   number: { width: '42px', height: '42px' },
//   text: { width: '42px', height: '42px' },
// }
// const iconSizes = computed(() => variantToIconComponent[props.variant])
const iconComponent = computed(() => variantToIconComponent[props.variant])
</script>

<style scoped lang="scss">
.map-mark {
  &-inner {
    position: relative;

    // width: 50px;
    // height: 50px;
    // background-color: rgb(55, 0, 255);
    border-radius: 50%;
  }

  &-text-style {
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

  &-text {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
  }

  &-label {
    position: absolute;
    right: 50%;

    &_number {
      bottom: 50%;
      transform: translateX(50%) translateY(50%);
    }

    &_text {
      bottom: -40px;
      transform: translateX(50%);
    }
  }
}
</style>
