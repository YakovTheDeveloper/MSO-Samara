<template>
  <div class="areas">
    <svg class="areas-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <template v-for="{ id, points, number = null } in areas" :key="id">
        <polygon
          :points="(points || []).map((p) => `${p.x},${p.y}`).join(' ')"
          stroke="rgba(214, 93, 137, 1)"
          fill="rgba(214, 93, 137, 0.2)"
          stroke-width="4"
          @click="onPolygonClick(id)"
          class="clickable"
        />
        <foreignObject
          v-if="points?.length && number != null"
          :x="getCentroid(points).x - 50"
          :y="getCentroid(points).y - 50"
          width="100"
          height="100"
        >
          <div xmlns="http://www.w3.org/1999/xhtml" class="areas-number">
            {{ number }}
          </div>
        </foreignObject>
      </template>
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { MapArea } from '@/entities'

defineProps<{
  areas: {
    id: string
    points?: MapArea
    number?: number
  }[]
}>()
const emit = defineEmits<{
  click: [id: string]
}>()

function onPolygonClick(id: string) {
  emit('click', id)
}

function getCentroid(points: { x: number; y: number }[]) {
  const n = points.length
  let x = 0,
    y = 0
  let signedArea = 0

  for (let i = 0; i < n; i++) {
    const { x: x0, y: y0 } = points[i]
    const { x: x1, y: y1 } = points[(i + 1) % n]
    const a = x0 * y1 - x1 * y0
    signedArea += a
    x += (x0 + x1) * a
    y += (y0 + y1) * a
  }

  signedArea *= 0.5
  x /= 6.0 * signedArea
  y /= 6.0 * signedArea

  return { x, y }
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

  &-number {
    text-shadow:
      -2px -2px 0 #d65d89,
      2px -2px 0 #d65d89,
      -2px 2px 0 #d65d89,
      2px 2px 0 #d65d89;
    font-size: 22px;
    font-weight: 900;
    line-height: 120%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: #fff;
    color: #fff;
    font: fallback;
    position: relative;
    font-size: 22px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 50px;
      width: 50px;
      border-radius: 50%;
      border: 4px solid rgba(214, 93, 137, 1);
    }
  }

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
