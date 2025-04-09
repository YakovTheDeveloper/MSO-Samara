<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar, Navigation } from 'swiper/modules'
import { onMounted, ref, watch } from 'vue'
import type { Swiper as SwiperType, SwiperOptions } from 'swiper/types'
import ControlButton from '@/components/ui/control-button/ControlButton.vue'
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon.vue'

const props = defineProps<{
    slides: { image: string; id: number }[],
    breakpoints?: {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
    }
}>()

const emits = defineEmits(['slide-changed'])

const currentSlideIndex = ref(0)

defineExpose({
    currentSlideIndex
})

onMounted(() => console.log(`output->'mounted'`, 'mounted'))

const swiperRef = ref<{ swiper: any } | null>(null)
const swiperInstanceRef = ref<SwiperType | null>(null)
const prevButtonRef = ref<InstanceType<typeof ControlButton> | null>(null)
const nextButtonRef = ref<InstanceType<typeof ControlButton> | null>(null)

const navigation = ref<{
    nextEl: HTMLButtonElement | null,
    prevEl: HTMLButtonElement | null
}>({
    nextEl: null,
    prevEl: null
})

function updateNavigation() {
    navigation.value = {
        nextEl: nextButtonRef.value?.getEl() || null,
        prevEl: prevButtonRef.value?.getEl() || null,
    }
}

const defaultBreakpoints: SwiperOptions['breakpoints'] = {
    320: {
        slidesPerView: 1,
    },
}

const breakpoints = ref<SwiperOptions['breakpoints']>(props.breakpoints ?? defaultBreakpoints)

watch(() => props.breakpoints, (newBreakpoints) => {
    breakpoints.value = newBreakpoints ?? defaultBreakpoints
})

watch(navigation, (result) => {
    console.log(`output->NAVIGATION`, result)
})

function onSlideChange() {
    const swiper = swiperInstanceRef.value
    if (swiper) {
        currentSlideIndex.value = swiper.realIndex
        emits('slide-changed', swiper.realIndex)
        console.log(`output->swiper.realIndex`, swiper.realIndex)
    }
}

function onSwiper(value: SwiperType) {
    console.log(`output->onSwiper`)
    swiperInstanceRef.value = value
}

onMounted(() => {
    updateNavigation()
})

</script>

<template>
    <div class="swiper-wrapper">
        <Swiper @swiper="onSwiper" @slide-change="onSlideChange" ref="swiperRef" :modules="[Scrollbar, Navigation]"
            :breakpoints="breakpoints" :navigation="navigation">
            <SwiperSlide v-for="slide in slides" :key="slide.id">
                <slot name="slide" :slide="slide">
                    <!-- Fallback content if slot isn't provided -->
                    <div class="gallery-item">
                        <img :src="slide.image" alt="gallery-image" draggable="false">
                    </div>
                </slot>
            </SwiperSlide>
        </Swiper>
        <ControlButton size="small" variant="square" ref="prevButtonRef" :class="['custom-prev']">
            <ArrowLeftIcon />
        </ControlButton>
        <ControlButton size="small" variant="square" ref="nextButtonRef" :class="['custom-next']">
            <ArrowRightIcon />
        </ControlButton>
    </div>
</template>

<style lang="scss" scoped>
.swiper-wrapper {
    position: relative;
    height: 100%;
    width: 1510px;
    border-radius: 0 128px 0 128px;
    overflow: hidden;
    flex-shrink: 0;
}

.gallery-item {
    height: 100%;

    img {
        user-select: none;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.custom-prev,
.custom-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.custom-prev {
    left: 40px;
}

.custom-next {
    right: 40px;
}
</style>
