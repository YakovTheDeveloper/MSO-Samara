<template>
    <MapMark v-for="mark in props.marks" :location="mark.location" :variant="mark.variant" @click="emit('click', mark.id)">
        {{ mark.variant === 'numeric' ? mark.value : null }}
    </MapMark>
</template>

<script setup lang="ts">
import MapMark from '@/components/shared/map-mark/MapMark.vue';
import type { InitMark } from './data';
const emit = defineEmits<{
    click: [id: number]
}>()
const props = defineProps<{
    marks: InitMark[]
}>()
</script>

<style scoped></style>