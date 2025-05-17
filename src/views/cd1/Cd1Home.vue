<template>
  <div class="cd1home">
    <MapView :img-src="store.currentMapImage.value" :size-coefficient="sizeCoefficient">
      <MapAreas :areas="store.mapAreas.value" @click="(id) => store.chooseMark(id)" />
      <MapMarkLocation v-if="store.youAreHerePoint.value" :location="store.youAreHerePoint.value">
        <MapMark variant="current" />
      </MapMarkLocation>
    </MapView>
    <Search :data="store.marksData.value" @list-item-click="store.chooseMark" />
    <MapScaleControls @decrement="decrement" @increment="increment" />
    <Cd1Stages :current="store.currentStage.value" @on-stage-change="store.onStageChange" />
    <Modal :isOpen="Boolean(store.currentMark.value)" @close="store.resetCurrentMark">
      <ModalContent :gallery="store.currentGallery.value" :title="store.currentMark?.value?.title"
        :desc="store.currentMark?.desc" @close="store.resetCurrentMark" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import MapView from '@/components/map-view/MapView.vue'
import { useMapScale } from '@/composables/useMapScale'
import MapScaleControls from '@/MapScaleControls.vue'
import Cd1Stages from './Cd1Stages.vue'
import { computed, ref, watchEffect } from 'vue'
import { useMapMark } from '@/composables/useMapMark'
import Search from '@/components/shared/search/Search.vue'
import ModalContent from '@/components/shared/modal-content/ModalContent.vue'
import Modal from '@/components/shared/modal/Modal.vue'
import MapAreas from '@/components/shared/map-areas/map-areas.vue'
import { getCd1MapMarks, getCd1Maps } from '@/views/cd1/api'
import { useState } from '@/views/cd1/state'
import MapMarkLocation from '@/components/shared/map-mark-location/MapMarkLocation.vue'
import MapMark from '@/components/shared/map-mark/MapMark.vue'

const store = useState()

watchEffect(() => {
  console.log(store.youAreHerePoint.value)
})


const { decrement, increment, sizeCoefficient } = useMapScale()
</script>

<style scoped lang="scss">
.cd1home {
  position: relative;
}
</style>
