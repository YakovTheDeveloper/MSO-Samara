<script setup lang="ts">
import { onMounted } from 'vue';
import { useBattlesStore } from './stores/counter';
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
  <router-view />
</template>

<style scoped>
main {}

img {
  user-select: none;

}
</style>
