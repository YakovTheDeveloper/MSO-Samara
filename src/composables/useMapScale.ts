import { computed, ref } from 'vue'

const MAX = 16
const MIN = 10
const BASE = 10
const STEP = 2

export const useMapScale = () => {
  const sizeCoefficient = ref(BASE)
  const zoomLevel = ref(1) // 1 = 100%
  const zoomIn = () => {
    zoomLevel.value = Math.min(zoomLevel.value + 0.1, 3)
  }

  const zoomOut = () => {
    zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
  }

  function increment() {
    zoomIn()
    return
    if (sizeCoefficient.value === MAX) return
    sizeCoefficient.value += STEP
  }

  function decrement() {
    zoomOut()
    return
    if (sizeCoefficient.value === MIN) return
    sizeCoefficient.value -= STEP
  }

  const sizeCoefficientDisplay = computed(() => +(sizeCoefficient.value / BASE).toFixed(1))

  return { sizeCoefficient: sizeCoefficientDisplay, increment, decrement }
}
