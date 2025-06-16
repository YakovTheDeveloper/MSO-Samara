import type { ApiResponse } from '@/api'
import type { Map, MapMark } from '@/entities'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
import { computed, onMounted, ref } from 'vue'

export const useMapMarksAndAreas = <MRKS extends MapMark>(
    getMarksCb: () => Promise<ApiResponse<MRKS[]>>,
) => {
    const marksData = ref<MRKS[]>([])
    const currentMarkId = ref('')
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
            mapUlid
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
            console.log(`output->res`,res)
            if (res.isError || !res.data) return
            marksData.value = res.data
        })
    })

    return {
        currentMarkId,
        currentMark,
        resetCurrentMark,
        chooseMark,
        currentGallery,
        marksData,
        mapAreas,
    }
}
