import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const MAX = 16
const MIN = 10
const BASE = 10
const STEP = 2

export const useMapScale = () => {
  const coefficient = ref(BASE) // 10 by default

  const zoomIn = () => {
    coefficient.value = Math.min(coefficient.value + STEP, MAX)
  }

  const zoomOut = () => {
    coefficient.value = Math.max(coefficient.value - STEP, MIN)
  }

  function increment() {
    zoomIn()
  }

  function decrement() {
    zoomOut()
  }

  const container = ref(null)
  let initialDistance = null
  let initialSize = BASE

  const getDistance = (touches) => {
    const [a, b] = touches
    return Math.sqrt(Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY, 2))
  }

  let touchStartHandler: (e: TouchEvent) => void
  let touchMoveHandler: (e: TouchEvent) => void
  let touchEndHandler: (e: TouchEvent) => void

  onMounted(() => {
    nextTick(() => {
      const el = container.value
      if (!el) return

      touchStartHandler = (e) => {
        if (e.touches.length === 2) {
          initialDistance = getDistance(e.touches)
          initialSize = coefficient.value
        }
      }

      touchMoveHandler = (e) => {
        if (e.touches.length === 2 && initialDistance) {
          const newDistance = getDistance(e.touches)
          const scaleChange = newDistance / initialDistance
          const newSize = initialSize * scaleChange
          coefficient.value = Math.min(Math.max(newSize, MIN), MAX)
        }
      }

      touchEndHandler = () => {
        initialDistance = null
      }

      el.addEventListener('touchstart', touchStartHandler)
      el.addEventListener('touchmove', touchMoveHandler)
      el.addEventListener('touchend', touchEndHandler)
    })
  })

  onUnmounted(() => {
    const el = container.value
    if (!el) return

    el.removeEventListener('touchstart', touchStartHandler)
    el.removeEventListener('touchmove', touchMoveHandler)
    el.removeEventListener('touchend', touchEndHandler)
  })

  const sizeCoefficient = computed(() => coefficient.value / BASE)

  return {
    container,
    sizeCoefficient,
    increment,
    decrement,
  }
}
