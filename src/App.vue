<script setup lang="ts">
import { onMounted } from 'vue';
import BattleDescriptionShort from './components/battle-description/BattleDescriptionShort.vue';
import MapView from './components/map-view/MapView.vue';
import MapScaleControls from './MapScaleControls.vue';
import { useBattlesStore } from './stores/counter';
import PopupRoot from './PopupRoot.vue';

const { getBattlesHandler } = useBattlesStore()

onMounted(() => {
  getBattlesHandler()
})


</script>

<template>
  <main>
    <MapView />
    <MapScaleControls />
    <PopupRoot />
  </main>
</template>

<style scoped>
main {}

img {
  user-select: none;

}
</style>
