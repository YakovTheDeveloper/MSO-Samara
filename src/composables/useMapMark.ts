import type { ApiResponse } from '@/api'
import type { Map, MapMark } from '@/entities'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
import { computed, onMounted, ref } from 'vue'

export const useMapMark = <MP extends Map, MRKS extends MapMark>(
  getMapCb: () => Promise<ApiResponse<MP>>,
  getMarksCb: () => Promise<ApiResponse<MRKS[]>>,
) => {
  const marksData = ref<MRKS[]>([])
  const mapsData = ref<MP | null>(null)
  const currentMarkId = ref('')
  const currentMark = computed(() =>
    marksData.value.find(({ ulid }) => ulid === currentMarkId.value),
  )

  const resetCurrentMark = () => (currentMarkId.value = '')
  const chooseMark = (markId: string) => (currentMarkId.value = markId)
  const mapAreas = computed(() => {
    if (!mapsData.value) return []
    return (mapsData.value as Map).areas.map(({ objectId, points }) => ({
      id: objectId,
      points,
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

  onMounted(() => {
    getMarksCb().then((res) => {
      if (res.isError || !res.data) return
      marksData.value = res.data
    })
    getMapCb().then((res) => {
      if (res.isError || !res.data) return
      mapsData.value = res.data
    })
  })

  return {
    currentMarkId,
    currentMark,
    resetCurrentMark,
    chooseMark,
    currentGallery,
    marksData,
    mapsData,
    mapAreas,
  }
}
