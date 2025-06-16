import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGesture, usePinch } from '@vueuse/gesture'

export const useMapScaleStore = defineStore('mapScale', () => {
  const MAX = 10
  const MIN = 1
  const BASE = 1
  const STEP = 1

  const startDistance = ref(0)
  const baseCoefficient = ref(BASE)
  const coefficient = ref(BASE)
  const container = ref<HTMLElement | null>(null)

  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

  function zoomIn() {
    coefficient.value = clamp(coefficient.value + STEP, MIN, MAX)
  }

  function zoomOut() {
    coefficient.value = clamp(coefficient.value - STEP, MIN, MAX)
  }

  function setCoefficient(val: number) {
    coefficient.value = clamp(val, MIN, MAX)
  }

  function increment() {
    zoomIn()
  }

  function decrement() {
    zoomOut()
  }

  const EPSILON = 0.05 // tweak this as needed

  const pinchHandler = (data) => {
    const { da, first, last } = data
    const currentDistance = da[0]

    if (first) {
      startDistance.value = currentDistance
      baseCoefficient.value = coefficient.value
    }

    if (startDistance.value === 0) return

    const scale = currentDistance / startDistance.value


    if (Math.abs(scale - 1) > EPSILON) {
      let next = baseCoefficient.value * scale
      next = clamp(next, MIN, MAX)
      coefficient.value = next
    } else {
      // Within threshold: do not change coefficient
      coefficient.value = baseCoefficient.value
    }

    if (last) {
      baseCoefficient.value = coefficient.value
      startDistance.value = 0
    }
  }

  //   const pinchHandler = (data) => {
  //     const { da, first, last } = data
  //     const currentDistance = da[0]

  //     if (first) {
  //       startDistance.value = currentDistance
  //       baseCoefficient.value = coefficient.value
  //     }

  //     // Defensive: avoid division by zero
  //     if (startDistance.value === 0) return

  //     // Calculate relative scale factor since gesture start
  //     const scale = currentDistance / startDistance.value

  //     // Calculate next coefficient smoothly
  //     let next = baseCoefficient.value * scale

  //     // Clamp zoom level
  //     next = clamp(next, MIN, MAX)

  //     coefficient.value = next

  //     if (last) {
  //       // Save current coefficient for next gesture
  //       baseCoefficient.value = coefficient.value
  //       startDistance.value = 0
  //     }
  //   }

  usePinch(pinchHandler, {
    domTarget: container.value,
    eventOptions: {
      passive: true,
    },
  })

  return {
    coefficient,
    container,
    pinchHandler,
    increment,
    decrement,
    // setupInteraction,
    // cleanupInteraction,
  }
})
