import { computed, nextTick, onMounted, ref } from 'vue'

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

  onMounted(() => {
    nextTick(() => {
      const el = container.value
      if (!el) {
        console.warn('container ref is null')
        return
      }

      el.addEventListener('touchstart', (e) => {
        console.log(`output->touchstart`,e)
        if (e.touches.length === 2) {
          initialDistance = getDistance(e.touches)
          initialSize = coefficient.value
        }
      })

      el.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && initialDistance) {
          const newDistance = getDistance(e.touches)
          const scaleChange = newDistance / initialDistance
          const newSize = initialSize * scaleChange

          // Clamp within bounds
          coefficient.value = Math.min(Math.max(newSize, MIN), MAX)
        }
      })

      el.addEventListener('touchend', () => {
        initialDistance = null
      })
    })
  })

  const sizeCoefficient = computed(() => coefficient.value / BASE)

  return {
    container,
    sizeCoefficient,
    increment,
    decrement,
  }
}
