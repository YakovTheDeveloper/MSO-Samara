<script setup lang="ts">
import { onMounted } from 'vue';
import BattleDescriptionShort from './components/battle-description/short/BattleDescriptionShort.vue';
import MapView from './components/map-view/MapView.vue';
import MapScaleControls from './MapScaleControls.vue';
import { useBattlesStore } from './stores/counter';
import PopupRoot from './PopupRoot.vue';
import { getServerImgUrl } from './utils/getServerImgUrl';

const { getBattlesHandler } = useBattlesStore()

onMounted(() => {
  getBattlesHandler().then(battles => {
    if (!battles) return

    battles.forEach(battle => {
      battle.images.forEach(({ image }) => {
        const imgElement = document.createElement('img')
        imgElement.src = getServerImgUrl(image)
      })
    })

  })

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
