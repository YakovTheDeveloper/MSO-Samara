<template>
  <div ref="box" class="map-scale-controls" id="scale-controls">
    <button @click="$emit('increment')">
      <PlusIcon />
    </button>
    <slot></slot>
    <button @click="$emit('decrement')">
      <MinusIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import MinusIcon from './assets/icons/MinusIcon.vue'
import PlusIcon from './assets/icons/PlusIcon.vue'

defineEmits(['increment', 'decrement'])

const box = ref(null)

const update = (e) => {
  e.preventDefault()
  const el = box.value
  if (!el) return
  const naturalWidth = 60
  const naturalHeight = 130
  // Use event's visualViewport properties or fallback to window.visualViewport
  const vv = e?.target || window.visualViewport
  if (!vv) return
  console.log(`output->vv`, vv)
  // Get the current scale & viewport offsets from event or visualViewport
  const scale = vv.scale || 1
  const pageLeft = vv.pageLeft || 0
  const pageTop = vv.pageTop || 0
  const width = vv.width || window.innerWidth
  const height = vv.height || window.innerHeight

  // Position the element bottom-right in visual viewport coordinates
  const left = pageLeft + width - naturalWidth - 80 / scale
  const top = pageTop + height - naturalHeight - 80 / scale

  el.style.position = 'absolute'
  el.style.left = `${left}px`
  el.style.top = `${top}px`
  el.style.transformOrigin = 'bottom right'
  el.style.transform = `scale(${1/scale})`
}
onMounted(() => {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', update)
    window.visualViewport.addEventListener('scroll', update)
  }
  // fallback window events (optional)
  window.addEventListener('scroll', update)
  window.addEventListener('resize', update)
})

onUnmounted(() => {
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', update)
    window.visualViewport.removeEventListener('scroll', update)
  }
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<style scoped>
.map-scale-controls {
  padding: var(--container-padding);
  right: 80px;
  bottom: 80px;
  position: fixed;
  transform-origin: bottom right;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60px;
  height: 130px;

  button {
    background-color: #ececec;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
