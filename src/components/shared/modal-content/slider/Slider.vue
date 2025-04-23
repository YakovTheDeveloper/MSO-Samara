<template>
    <div class="arenda-gallery">
        <swiper :loop="true" :modules="modules" :navigation="{
            nextEl: nextElRef,
            prevEl: prevElRef
        }" class="swiper-main">
            <swiper-slide v-for="{ id, src } in props.photos" :key="id" class="swiper-main-item">
                <div class="swiper-square-wrapper">
                    <img :src="src" />
                </div>
            </swiper-slide>
            <template #container-end>
                <button ref="prevElRef" class="swiper-button-prev">
                    <IconsArrowLeft class="swiper-button-icon" />
                </button>
                <button ref="nextElRef" class="swiper-button-next">
                    <IconsArrowRight class="swiper-button-icon" />
                </button>
            </template>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { ref } from 'vue'


const props = defineProps<{
    photos: { id: number; src: string }[]
}>()

const prevElRef = ref<HTMLElement | null>(null)
const nextElRef = ref<HTMLElement | null>(null)
const modules = [Navigation]
</script>

<style scoped lang="scss">
.title {
    margin-bottom: 20px;
    color: var(--text-secondary);
    font-size: 30px;
}

.arenda-gallery {
    border-radius: 20px;
    background-color: var(--bg-white-alpha);
    height: 100%;
    width: 100%;
    position: relative;

    &:before {
        left: 0;
        position: absolute;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
    }

    &:after {
        right: 0;
        position: absolute;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    }
}

.swiper-button-prev,
.swiper-button-next {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-white-alpha-20);
    box-shadow: 0px 8px 8px rgba(88, 104, 124, 0.15);
    color: var(--text-white);

    &:after {
        display: none;
    }
}

.swiper-button-icon {
    width: 20px;
    aspect-ratio: 1;
}

.swiper-square-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%; // makes the div square
    overflow: hidden;
    border-radius: 12px;
    background-color: #f0f0f0;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>