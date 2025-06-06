<template>
  <div class="cd2home">
    <MapView
      :img-src="getServerImgUrl(store.mapsData?.map || '')"
      :size-coefficient="sizeCoefficient"
      class="cd2-map"
    >
      <!-- <MapMarkLocation
        :key="mark.ulid"
        v-for="mark in nonOverlappingPositions"
        :location="mark.point"
        @click="mark.canOpen ? store.chooseMark(mark.ulid) : null"
      >
        {{ mark.title }}
      </MapMarkLocation> -->
      <MapMarkLocationCity
        :key="mark.ulid"
        v-for="mark in nonOverlappingPositions"
        :location="mark.point"
        @click="mark.canOpen ? store.chooseMark(mark.ulid) : null"
        :positionType="mark.positionType"
      >
        {{ mark.title }}
      </MapMarkLocationCity>
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
import { computed, watchEffect } from 'vue'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
import MapMarkLocationCity from '@/components/shared/map-mark-location/MapMarkLocationCity.vue'

const { decrement, increment, sizeCoefficient } = useMapScale()

const store = useStore()

const nonOverlappingPositions = computed(() => {
  if (!store.marksData) return []
  return assignNonOverlappingPositions(store.marksData)
})

type PositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface Marker {
  title: string
  point: {
    x: number
    y: number
  }
  positionType?: PositionType
}

function assignNonOverlappingPositions(markers: Marker[]): Marker[] {
  const assigned: Marker[] = []

  const offsetDistance = 60 // Threshold in coordinate units (tune as needed)

  const checkOverlap = (a: Marker, b: Marker) => {
    const dx = Math.abs(a.point.x - b.point.x)
    const dy = Math.abs(a.point.y - b.point.y)
    return dx < offsetDistance && dy < offsetDistance
  }

  const positionOptions: PositionType[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

  for (const marker of markers) {
    let chosen: PositionType = 'top-left'
    for (const pos of positionOptions) {
      const virtual: Marker = { ...marker, positionType: pos }
      const isOverlapping = assigned.some((other) => checkOverlap(virtual, other))

      if (!isOverlapping) {
        chosen = pos
        break
      }
    }

    assigned.push({ ...marker, positionType: chosen })
  }

  return assigned
}

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
</style>
