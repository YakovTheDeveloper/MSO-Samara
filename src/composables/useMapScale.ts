import { computed, ref } from 'vue'

const MAX = 16
const MIN = 10
const BASE = 10
const STEP = 2

export const useMapScale = () => {
  const sizeCoefficient = ref(BASE)

  function increment() {
    if (sizeCoefficient.value === MAX) return
    sizeCoefficient.value += STEP
  }

  function decrement() {
    if (sizeCoefficient.value === MIN) return
    sizeCoefficient.value -= STEP
  }

  const sizeCoefficientDisplay = computed(() => +(sizeCoefficient.value / BASE).toFixed(1))

  return { sizeCoefficient: sizeCoefficientDisplay, increment, decrement }
}
