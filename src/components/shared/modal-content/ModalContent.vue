<template>
  <div class="modal-content">
    <div v-if="gallery && gallery.length > 0" class="modal-content-gallery">
      <Slider :photos="gallery" />
    </div>
    <div class="modal-content-text">
      <h1>{{ $props.title }}</h1>
      <p class="modal-content-desc scrollbar" v-formatted-text="desc"></p>
      <!-- <p class="modal-content-desc scrollbar" v-html="desc.replace(/\r\n|\r|\n/g, '<br>')"></p> -->
    </div>
    <button class="btn btn-s" @click="$emit('close')">Закрыть</button>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import Slider from '../slider/Slider.vue'

const props = defineProps<{
  title: string
  desc: string
  gallery?: { id: number; src: string }[]
}>()

watchEffect(() => console.log(`output->props`, props))
defineEmits(['close'])
</script>

<style scoped lang="scss">
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &-gallery {
    width: 772px;
    height: 443px;
    border-radius: var(--border-radius-s);
    overflow: hidden;
  }

  h1 {
    font-size: 38px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--color-black);
  }

  &-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &-desc {
    max-height: 240px;
    overflow: auto;
    font-size: 22px;
  }
}
</style>
