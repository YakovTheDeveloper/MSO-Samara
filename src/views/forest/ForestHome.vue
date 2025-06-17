<template>
  <div ref="container" class="forest">
    <MapView :img-src="getServerImgUrl(store.mapsData.value?.map || '')">
      <MapMarkLocation
        v-for="mark in store.marksData.value"
        :location="mark.point"
        @click="store.chooseMark(mark.ulid)"
      >
        <MapMark :variant="mark.mapTitleType" :label="mark.mapTitle" />
      </MapMarkLocation>
      <MapMarkLocation :location="store.youAreHerePoint.value">
        <MapMark variant="current" />
      </MapMarkLocation>
      <MapAreas :areas="store.mapAreas.value" />
    </MapView>
    <Search :data="store.marksData.value" @list-item-click="store.chooseMark" />
    <MapScaleControls class="map-scale-controls-fixed" />
    <Modal :isOpen="Boolean(store.currentMark.value)" @close="store.resetCurrentMark">
      <ModalContent
        :gallery="store.currentGallery.value"
        :title="store.currentMark.value.title"
        :desc="store.currentMark.value.description"
        @close="store.resetCurrentMark"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import MapScaleControls from '@/MapScaleControls.vue'
import Modal from '@/components/shared/modal/Modal.vue'
import ModalContent from '@/components/shared/modal-content/ModalContent.vue'
import MapView from '@/components/map-view/MapView.vue'
import { getForestStoryMapMarks, getForestStoryMaps } from '@/api'
import Search from '@/components/shared/search/Search.vue'
import { useMapMark } from '@/composables/useMapMark'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
import MapAreas from '@/components/shared/map-areas/map-areas.vue'
import MapMarkLocation from '@/components/shared/map-mark-location/MapMarkLocation.vue'
import MapMark from '@/components/shared/map-mark/MapMark.vue'

const store = useMapMark(getForestStoryMaps, getForestStoryMapMarks)
</script>

<style scoped lang="scss">
.forest {
  overflow: hidden;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 80px;
  left: 80px;
  width: 273px;
  z-index: 1;
}
</style>
