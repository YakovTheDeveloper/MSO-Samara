import type { ApiResponse } from "@/api"
import { useMapMarksAndAreas } from "@/composables/useMapMarksAndAreas"
import type { MapCd1, MapMarkCd1 } from "@/entities"
import { getServerImgUrl } from "@/utils/getServerImgUrl"
import { getCd1MapMarks, getCd1Maps } from "@/views/cd1/api"
import { ref, computed, onMounted } from "vue"

export const useState = (

) => {

    const mapsData = ref<MapCd1[] | null>(null)

    const marksAndAreas = useMapMarksAndAreas(getCd1MapMarks)


    const youAreHerePoint = computed(() => {
        return mapsData.value ? mapsData.value[currentStage.value - 1].youAreHerePoint : { x: 0, y: 0 }
    })

    const currentStage = ref(1)
    const onStageChange = (value: number) => (currentStage.value = value)
    const currentMapImage = computed(() => mapsData.value ? getServerImgUrl(mapsData.value[currentStage.value - 1].map) : null)
    const currentMap = computed(() => mapsData.value ? mapsData.value[currentStage.value - 1] : null)

    const mapAreas = computed(() => marksAndAreas.mapAreas.value.filter((data) => data.mapUlid === currentMap.value?.ulid))
    const marksData = computed(() => marksAndAreas.marksData.value.filter((data) => data.mapUlid === currentMap.value?.ulid))

    onMounted(() => {
        getCd1Maps().then((res) => {
            if (res.isError || !res.data) return
            mapsData.value = res.data
        })
    })

    return {
        currentStage,
        onStageChange,
        currentMap,
        currentMapImage,
        currentMarkId: marksAndAreas.currentMarkId,
        currentMark: marksAndAreas.currentMark,
        resetCurrentMark: marksAndAreas.resetCurrentMark,
        chooseMark: marksAndAreas.chooseMark,
        currentGallery: marksAndAreas.currentGallery,
        marksData,
        mapsData,
        mapAreas,
        youAreHerePoint,
    }
}
