import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const MAX = 16
const MIN = 4
const STEP = 2

export const useCounterStore = defineStore('counter', () => {
  const sizeCoefficient = ref(10)

  function increment() {
    if (sizeCoefficient.value === MAX) return
    sizeCoefficient.value += STEP
  }

  function decrement() {
    if (sizeCoefficient.value === MIN) return
    sizeCoefficient.value -= STEP
  }

  const sizeCoefficientDisplay = computed(() => +(sizeCoefficient.value / 10).toFixed(1))

  return { sizeCoefficient: sizeCoefficientDisplay, increment, decrement }
})
