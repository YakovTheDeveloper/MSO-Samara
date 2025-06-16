<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { getServerImgUrl } from './utils/getServerImgUrl'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
watchEffect(() => {
  console.log(`output->route.path`, route.path)
  const shouldVerticalLayout = route.path.includes('cd2vertical')
  const appElement = document.getElementById('app')
  if (shouldVerticalLayout) {
    appElement?.classList.add('vertical')
  } else {
    appElement?.classList.remove('vertical')
  }
})

// onMounted(() => {
//   getBattlesHandler().then(battles => {
//     if (!battles) return

//     battles.forEach(battle => {
//       battle.images.forEach(({ image }) => {
//         const imgElement = document.createElement('img')
//         imgElement.src = getServerImgUrl(image)
//       })
//     })

//   })

// })
</script>

<template>
  <router-view />
</template>

<style scoped>
main {
}

img {
  user-select: none;
}
</style>
