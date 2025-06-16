<template>
  <div class="search">
    <div @click.stop>
      <SearchInput
        class="search-input"
        v-model="keyboard.inputModel.value"
        @focus="onSearchInputFocus"
      />
    </div>

    <div :class="['keyboard', keyboard.showKeyboard.value ? 'show' : 'hide']">
      <Keyboard
        :show="keyboard.showKeyboard.value"
        @onChange="keyboard.onChange"
        @onKeyPress="keyboard.onKeyPress"
        :input="keyboard.inputModel.value"
        @onClose="keyboard.closeKeyboard"
      />
    </div>

    <SearchList v-if="isListShow" :data="filtered" :onListItemClick="onListItemClick" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: { title: string; ulid: string; mapTitle: string; number?: number }[]
  onListItemClick: (id: string) => void
}>()

import { useKeyboard } from '@/composables/useKeyboard'
import Keyboard from '../keyboard/Keyboard.vue'
import SearchInput from './SearchInput.vue'
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import SearchList from './SearchList.vue'

const keyboard = useKeyboard()
const isListShow = ref(false)

const filtered = computed(() => {
  const inputValue = keyboard.inputModel.value?.toLowerCase().trim() || ''
  return props.data.filter(
    ({ title, mapTitle, number }) =>
      title.toLowerCase().includes(inputValue) ||
      mapTitle?.toLowerCase().includes(inputValue) ||
      number?.toString().includes(inputValue),
  )
})

const onSearchInputFocus = () => {
  keyboard.onFocus()
  if (keyboard.inputModel.value) isListShow.value = true
}
watchEffect(() => {
  if (keyboard.inputModel.value) isListShow.value = true
})
const closeOnOutsideClick = () => (isListShow.value = false)
onMounted(() => document.addEventListener('click', closeOnOutsideClick))
onUnmounted(() => document.removeEventListener('click', closeOnOutsideClick))
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  top: 80px;
  right: 80px;
  width: 642px;
}

.keyboard {
  position: fixed;
  bottom: 0;
  height: 385px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  gap: 20px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  transition: all 0.4s ease-in-out;

  &.hide {
    opacity: 0;
    visibility: hidden;
  }

  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>
