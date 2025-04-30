<template>
  <div class="areas">
    <svg class="areas-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <polygon
        v-for="{ id, points } in areas"
        :key="id"
        :points="(points || []).map((p) => `${p.x},${p.y}`).join(' ')"
        stroke="rgba(214, 93, 137, 1)"
        fill="rgba(214, 93, 137, 0.2)"
        stroke-width="4"
        @click="onPolygonClick(id)"
        class="clickable"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { MapArea } from '@/entities'

defineProps<{
  areas: {
    id: string
    points?: MapArea 
  }[]
}>()
const emit = defineEmits<{
  click: [id: string]
}>()

function onPolygonClick(id: string) {
  emit('click', id)
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
  z-index: var(--z-index-areas);

  &-svg {
    width: 100%;
    height: 100%;
  }
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
