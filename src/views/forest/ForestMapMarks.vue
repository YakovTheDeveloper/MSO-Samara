<template>
  <MapMarkLocation
    v-for="mark in props.marks"
    :location="mark.location"
    @click="emit('click', mark.id)"
  >
    <MapMark :variant="mark.variant">
      {{ mark.variant === 'numeric' ? mark.value : null }}
    </MapMark>
  </MapMarkLocation>
</template>

<script setup lang="ts">
import MapMark from '@/components/shared/map-mark/MapMark.vue'
import type { InitMark } from './data'
import MapMarkLocation from '@/components/shared/map-mark-location/MapMarkLocation.vue'
const emit = defineEmits<{
  click: [id: number]
}>()
const props = defineProps<{
  marks: InitMark[]
}>()
</script>

<style scoped></style>
