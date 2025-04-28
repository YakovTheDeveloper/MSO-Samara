<template>
  <div class="gallery">
    <swiper
      :modules="modules"
      :pagination="true"
      :navigation="{
        nextEl: nextElRef,
        prevEl: prevElRef,
      }"
      class="swiper-main"
    >
      <swiper-slide v-for="{ id, src } in props.photos" :key="id" class="swiper-main-item">
        <img :src="src" />
      </swiper-slide>
      <template #container-end>
        <button ref="prevElRef" class="swiper-button-prev">
          <span class="swiper-button-inner">
            <ArrowLeft class="swiper-button-icon" />
          </span>
        </button>
        <button ref="nextElRef" class="swiper-button-next">
          <span class="swiper-button-inner">
            <ArrowRight class="swiper-button-icon" />
          </span>
        </button>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ref } from 'vue'
import ArrowLeft from '@/assets/icons/ArrowLeft.vue'
import ArrowRight from '@/assets/icons/ArrowRight.vue'

const props = defineProps<{
  photos: { id: number; src: string }[]
}>()

const prevElRef = ref<HTMLElement | null>(null)
const nextElRef = ref<HTMLElement | null>(null)
const modules = [Navigation, Pagination]
</script>

<style scoped lang="scss">
::v-deep(.swiper-pagination) {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 18px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);

  .swiper-pagination-bullet {
    opacity: 0.3;
    background-color: var(--color-blue);
    width: 12px;
    height: 12px;

    &-active {
      opacity: 1;
    }
  }
}

.title {
  margin-bottom: 20px;
  color: var(--text-secondary);
  font-size: 30px;
}

.gallery {
  border-radius: 20px;
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

.swiper-main {
  height: 100%;
  border-radius: 24px;

  &-item {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

::v-deep(.swiper-button-disabled) {
  display: none;
}

.swiper-button-inner {
  z-index: 2;
  width: 60px;
  height: 60px;
  background-color: var(--color-blue-alpha);
  color: var(--text-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

}

.swiper-button-prev,
.swiper-button-next {

  &:disabled {
    display: none;
  }
}

.swiper-button-next {
  right: 24px;
  &:after {
    position: absolute;
    bottom: -300px;
    width: 108px;
    height: 743px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
}

.swiper-button-prev {
  left: 24px;
  &:after {
    position: absolute;
    bottom: -300px;
    width: 108px;
    height: 743px;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
}

.swiper-button-icon {
  width: 14px;
}
</style>
