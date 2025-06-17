import type { ApiResponse } from '@/api'
import type { MapCd1, MapMarkCd1 } from '@/entities'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
import { getCd1MapMarks, getCd1Maps } from '@/views/cd1/api'
import { ref, computed, onMounted } from 'vue'

export const useState = () => {
  const mapsData = ref<MapCd1[] | null>(null)
  const marksData = ref<MapMarkCd1[]>([])
  const currentMarkId = ref('')
  const currentStage = ref(1)

  const currentMark = computed(() =>
    marksData.value.find(({ ulid }) => ulid === currentMarkId.value),
  )

  const resetCurrentMark = () => (currentMarkId.value = '')
  const chooseMark = (markId: string) => (currentMarkId.value = markId)

  const mapAreas = computed(() => {
    if (!marksData.value) return []
    return marksData.value.map(({ ulid, area, mapUlid = null, number = null }) => ({
      id: ulid,
      points: area,
      number,
      mapUlid,
    }))
  })

  const currentGallery = computed(() => {
    return (
      currentMark.value?.images.map((img, index) => ({
        src: getServerImgUrl(img),
        id: index,
      })) || []
    )
  })

  const currentMap = computed(() =>
    mapsData.value ? mapsData.value[currentStage.value - 1] : null,
  )

  const currentMapImage = computed(() =>
    currentMap.value ? getServerImgUrl(currentMap.value.map) : null,
  )

  const youAreHerePoint = computed(() =>
    currentMap.value ? currentMap.value.youAreHerePoint : { x: 0, y: 0 },
  )

  const filteredMapAreas = computed(() =>
    mapAreas.value.filter((data) => data.mapUlid === currentMap.value?.ulid),
  )

  const filteredMarksData = computed(() =>
    marksData.value.filter((data) => data.mapUlid === currentMap.value?.ulid),
  )

  const onStageChange = (value: number) => {
    currentStage.value = value
  }

  onMounted(() => {
    getCd1Maps().then((res) => {
      if (!res.isError && res.data) {
        mapsData.value = res.data

        res.data.forEach(({ ulid }) => {
          getCd1MapMarks(ulid).then((marksRes) => {
            if (!marksRes.isError && marksRes.data) {
              console.log(`output-> PUSH 000`, typeof marksRes.data)
              if (typeof marksRes.data === 'object') marksData.value.push(...marksRes.data)
            }
          })
        })
      }
    })
  })

  return {
    currentStage,
    onStageChange,
    currentMap,
    currentMapImage,
    currentMarkId,
    currentMark,
    resetCurrentMark,
    chooseMark,
    currentGallery,
    marksData: filteredMarksData,
    mapsData,
    mapAreas: filteredMapAreas,
    youAreHerePoint,
  }
}
