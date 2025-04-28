<template>
  <div class="cd1home">
    <MapView img-src="/cd2/map.png" :size-coefficient="sizeCoefficient">
      <MapMarkLocation
        v-for="mark in MARKS"
        :location="mark.location"
        @click="store.currentMarkId.value = mark.id"
      >
        <span class="map-mark">{{ mark.title }}</span>
      </MapMarkLocation>
    </MapView>
    <Modal :is-open="Boolean(store.currentMark.value)" @close="onModalClose">
      <Cd2ModalContent @close="onModalClose" />
    </Modal>
    <MapScaleControls @decrement="decrement" @increment="increment" />
  </div>
</template>

<script setup lang="ts">
import MapView from '@/components/map-view/MapView.vue'
import MapMarkLocation from '@/components/shared/map-mark-location/MapMarkLocation.vue'
import { useMapScale } from '@/composables/useMapScale'
import MapScaleControls from '@/MapScaleControls.vue'
import { MARKS, useCounterStore } from './data'
import { computed, ref, watchEffect } from 'vue'
import Modal from '@/components/shared/modal/Modal.vue'
import Cd2ModalContent from './Cd2ModalContent.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const store = storeToRefs(useCounterStore())
const route = useRoute()

// const coordsMapSize = computed(() => {
//   const shouldVerticalLayout = route.path === '/cd2vertical'
//   if (shouldVerticalLayout) return [1080, 1920]
//   return [1920, 1080]
// })

watchEffect(() => {
  const shouldVerticalLayout = route.path === '/cd2vertical'
  const appElement = document.getElementById('app')
  if (shouldVerticalLayout) {
    appElement?.classList.add('vertical')
  } else {
    appElement?.classList.remove('vertical')
  }
})

const onModalClose = () => (store.currentMarkId.value = -1)
const { decrement, increment, sizeCoefficient } = useMapScale()
</script>

<style scoped lang="scss">
.cd1home {
  position: relative;
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
