<script setup lang="ts">
import BattleDescriptionShort from './components/battle-description/BattleDescriptionShort.vue';
import MapView from './components/map-view/MapView.vue';
import MapScaleControls from './MapScaleControls.vue';




</script>

<template>
  <main>
    <MapView />
    <MapScaleControls />
    <BattleDescriptionShort />
  </main>
</template>

<style scoped>
main {}

img {
  user-select: none;

}
</style>
