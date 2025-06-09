import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

export const useMap = (props: {
  containerWidth: Ref<number>
  containerHeight: Ref<number>
  mapWidth: ComputedRef<number>
  mapHeight: ComputedRef<number>
  sizeCoefficient: ComputedRef<number>
}) => {
  const position = ref({ x: 0, y: 0 })
  const dragging = ref(false)
  let lastPos = { x: 0, y: 0 }

  const scaledMapWidth = computed(() => props.mapWidth.value * props.sizeCoefficient.value)
  const scaledMapHeight = computed(() => props.mapHeight.value * props.sizeCoefficient.value)

  function clampPosition(x: number, y: number) {
    const minX = Math.min(0, props.containerWidth.value - scaledMapWidth.value)
    const minY = Math.min(0, props.containerHeight.value - scaledMapHeight.value)
    return {
      x: Math.max(minX, Math.min(x, 0)),
      y: Math.max(minY, Math.min(y, 0)),
    }
  }

  function updatePosition(x: number, y: number) {
    position.value = clampPosition(x, y)
  }

  function onTouchStart(e: TouchEvent) {
    const touch = e.touches[0]
    dragging.value = true
    lastPos = { x: touch.clientX, y: touch.clientY }
  }

  function onTouchMove(e: TouchEvent) {
    if (!dragging.value) return
    const touch = e.touches[0]
    const dx = touch.clientX - lastPos.x
    const dy = touch.clientY - lastPos.y
    lastPos = { x: touch.clientX, y: touch.clientY }
    updatePosition(position.value.x + dx, position.value.y + dy)
  }

  function onTouchEnd() {
    dragging.value = false
  }

  function onMouseDown(e: MouseEvent) {
    dragging.value = true
    lastPos = { x: e.clientX, y: e.clientY }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.value) return
    const dx = e.clientX - lastPos.x
    const dy = e.clientY - lastPos.y
    lastPos = { x: e.clientX, y: e.clientY }
    updatePosition(position.value.x + dx, position.value.y + dy)
  }

  function onMouseUp() {
    dragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  const mapStyle = computed(() => ({
    transform: `translate(${position.value.x}px, ${position.value.y}px) scale(${props.sizeCoefficient.value})`,
  }))

  watch(
    () => props.sizeCoefficient.value,
    (newScale, oldScale) => {
      if (oldScale === undefined) return

      // Calculate viewport center in screen coords
      const viewportCenterX = props.containerWidth.value / 2
      const viewportCenterY = props.containerHeight.value / 2

      // Calculate the map coords of the viewport center before zoom
      // position.value.x and y are map translation (in px)
      const mapCoordX = (viewportCenterX - position.value.x) / oldScale
      const mapCoordY = (viewportCenterY - position.value.y) / oldScale

      // Calculate new position so mapCoord stays under viewport center after zoom
      const newPosX = viewportCenterX - mapCoordX * newScale
      const newPosY = viewportCenterY - mapCoordY * newScale

      position.value = clampPosition(newPosX, newPosY)
    },
  )

  return {
    position,
    dragging,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    mapStyle,
  }
}
