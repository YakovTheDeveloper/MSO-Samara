import type { ApiResponse } from '@/api'
import { useMapMarksAndAreas } from '@/composables/useMapMarksAndAreas'
import type { Map, MapMark } from '@/entities'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
import { computed, onMounted, ref } from 'vue'

export const useMapMark = <MP extends Map, MRKS extends MapMark>(
  getMapCb: () => Promise<ApiResponse<MP>>,
  getMarksCb: () => Promise<ApiResponse<MRKS[]>>,
) => {

  const mapsData = ref<MP | null>(null)



  const marksAndAreas = useMapMarksAndAreas(getMarksCb)


  const youAreHerePoint = computed(() => {
    return mapsData.value?.youAreHerePoint || { x: 0, y: 0 }
  })

  onMounted(() => {
    getMapCb().then((res) => {
      if (res.isError || !res.data) return
      mapsData.value = res.data
    })
  })

  return {
    currentMarkId: marksAndAreas.currentMarkId,
    currentMark: marksAndAreas.currentMark,
    resetCurrentMark: marksAndAreas.resetCurrentMark,
    chooseMark: marksAndAreas.chooseMark,
    currentGallery: marksAndAreas.currentGallery,
    marksData: marksAndAreas.marksData,
    mapsData,
    mapAreas: marksAndAreas.mapAreas,
    youAreHerePoint,
  }
}
