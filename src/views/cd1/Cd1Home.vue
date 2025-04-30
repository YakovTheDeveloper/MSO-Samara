<template>
  <div class="cd1home">
    <MapView :img-src="currentMap" :size-coefficient="sizeCoefficient">
      <MapAreas :areas="[]"/>
    </MapView>
    <Search :data="store.marksData.value" />
    <MapScaleControls @decrement="decrement" @increment="increment" />
    <Cd1Stages :current="currentStage" @on-stage-change="onStageChange" />
    <Modal :isOpen="Boolean(store.currentMark.value)" @close="store.resetCurrentMark">
      <ModalContent
        :gallery="store.currentMark?.gallery"
        :title="store.currentMark?.title"
        :desc="store.currentMark?.desc"
        @close="store.resetCurrentMark"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import MapView from '@/components/map-view/MapView.vue'
import { useMapScale } from '@/composables/useMapScale'
import MapScaleControls from '@/MapScaleControls.vue'
import Cd1Stages from './Cd1Stages.vue'
import { computed, ref } from 'vue'
import { useMapMark } from '@/composables/useMapMark'
import Search from '@/components/shared/search/Search.vue'
import ModalContent from '@/components/shared/modal-content/ModalContent.vue'
import Modal from '@/components/shared/modal/Modal.vue'
import MapAreas from '@/components/shared/map-areas/map-areas.vue'

const maps = [
  { imgSrc: '/cd1/map-stage-1.png' },
  { imgSrc: '/cd1/map-stage-2.png' },
  { imgSrc: '/cd1/map-stage-3.png' },
  { imgSrc: '/cd1/map-stage-4.png' },
]

const store = useMapMark()

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
