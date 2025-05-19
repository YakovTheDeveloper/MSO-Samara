<template>
  <div class="cd2home">
    <MapView
      img-src="/cd2/map.png"
      :size-coefficient="sizeCoefficient"
      class="cd2-map"
      :initImgSizes="[1080, 1080]"
    >
      <MapMarkLocation
        :key="mark.ulid"
        v-for="mark in store.marksData"
        :location="mark.point"
        @click="mark.canOpen ? store.chooseMark(mark.ulid) : null"
      >
        <span class="map-mark">{{ mark.title }}</span>
      </MapMarkLocation>
    </MapView>
    <Modal :is-open="Boolean(store.currentMark)" @close="store.resetCurrentMark">
      <Cd2ModalContent @close="store.resetCurrentMark" :data="store.currentMark" />
    </Modal>
    <MapScaleControls @decrement="decrement" @increment="increment" />
  </div>
</template>

<script setup lang="ts">
import MapView from '@/components/map-view/MapView.vue'
import MapMarkLocation from '@/components/shared/map-mark-location/MapMarkLocation.vue'
import { useMapScale } from '@/composables/useMapScale'
import MapScaleControls from '@/MapScaleControls.vue'
import Modal from '@/components/shared/modal/Modal.vue'
import Cd2ModalContent from './Cd2ModalContent.vue'
import { storeToRefs } from 'pinia'
import { useStore } from './store'
import { watchEffect } from 'vue'

const { decrement, increment, sizeCoefficient } = useMapScale()

const store = useStore()

watchEffect(() => console.log(`output->mapStore`, store))
</script>

<style scoped lang="scss">
.cd2-map {

}
.cd2home {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

}

.map-mark {
  border: 4px solid var(--color-blue);
  color: var(--color-blue);
  padding: 12px 24px;
  font-weight: 700;
  font-size: 22px;
  background-color: #ffffff;
  border-radius: 24px;
}
</style>
