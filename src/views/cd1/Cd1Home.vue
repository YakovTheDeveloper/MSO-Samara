<template>
  <div class="cd1home">
    <MapView :img-src="currentMap" :size-coefficient="sizeCoefficient">
      <Cd1Areas />
    </MapView>
    <MapScaleControls @decrement="decrement" @increment="increment" />
    <Cd1Stages :current="currentStage" @on-stage-change="onStageChange" />
  </div>
</template>

<script setup lang="ts">
import MapView from '@/components/map-view/MapView.vue'
import { useMapScale } from '@/composables/useMapScale'
import MapScaleControls from '@/MapScaleControls.vue'
import Cd1Areas from './Cd1Areas.vue'
import Cd1Stages from './Cd1Stages.vue'
import { computed, ref } from 'vue'

const maps = [
  { imgSrc: '/cd1/map-stage-1.png' },
  { imgSrc: '/cd1/map-stage-2.png' },
  { imgSrc: '/cd1/map-stage-3.png' },
  { imgSrc: '/cd1/map-stage-4.png' },
]

const currentStage = ref(1)
const onStageChange = (value: number) => (currentStage.value = value)
const currentMap = computed(() => maps[currentStage.value - 1].imgSrc)

const { decrement, increment, sizeCoefficient } = useMapScale()
</script>

<style scoped lang="scss">
.cd1home {
  position: relative;
}
</style>
