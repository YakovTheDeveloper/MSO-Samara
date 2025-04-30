<template>
  <MapMarkLocation
    v-for="mark in props.marks"
    :location="mark"
    @click="emit('click', mark.objectId)"
  >
    <MapMark :variant="1212">
      {{ mark.variant === 'numeric' ? mark.value : null }}
    </MapMark>
  </MapMarkLocation>
</template>

<script setup lang="ts">
import MapMark from '@/components/shared/map-mark/MapMark.vue'
import type { InitMark } from './data'
import MapMarkLocation from '@/components/shared/map-mark-location/MapMarkLocation.vue'
import type { Map } from '@/entities'
const emit = defineEmits<{
  click: [id: string]
}>()
const props = defineProps<{
  marks: Map['points']
}>()
</script>

<style scoped></style>
