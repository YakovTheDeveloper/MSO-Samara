<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { getServerImgUrl } from './utils/getServerImgUrl'
import { useRoute } from 'vue-router'
import { useCounterStore, useMapScaleStore } from './stores/counter'
import { storeToRefs } from 'pinia'
const store = storeToRefs(useMapScaleStore())

watchEffect(() => console.log(`output->store.sizeCoefficient`, store.sizeCoefficient))
const container = ref(null)
let initialDistance = null
let initialZoom = 1

const getDistance = (touches) => {
  const [a, b] = touches
  return Math.sqrt(Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY, 2))
}

onMounted(() => {
  const el = container.value

  el.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialDistance = getDistance(e.touches)
      initialZoom = store.sizeCoefficient.value
    }
  })

  el.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const newDistance = getDistance(e.touches)
      const scaleChange = newDistance / initialDistance
      store.sizeCoefficient.value = Math.min(Math.max(initialZoom * scaleChange, 0.5), 3) // limit zoom
    }
  })

  el.addEventListener('touchend', () => {
    initialDistance = null
  })
})

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
  <div ref="container" class="zoom-target" :style="{ transform: `scale(${store.sizeCoefficient.value})` }">
    <router-view />
  </div>
</template>

<style scoped>
main {
}

img {
  user-select: none;
}
</style>
