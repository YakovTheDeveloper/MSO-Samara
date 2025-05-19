<template>
  <div class="search">
    <SearchInput
      class="search-input"
      v-model="keyboard.inputModel.value"
      @focus="keyboard.onFocus"
    />

    <div :class="['keyboard', keyboard.showKeyboard.value ? 'show' : 'hide']">
      <Keyboard
        :show="keyboard.showKeyboard.value"
        @onChange="keyboard.onChange"
        @onKeyPress="keyboard.onKeyPress"
        :input="keyboard.inputModel.value"
        @onClose="keyboard.closeKeyboard"
      />
    </div>

    <SearchList v-if="shouldSearchShow" :data="filtered" :onListItemClick="onListItemClick" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: { title: string; ulid: string }[]
  onListItemClick: (id: string) => void
}>()

import { useKeyboard } from '@/composables/useKeyboard'
import Keyboard from '../keyboard/Keyboard.vue'
import SearchInput from './SearchInput.vue'
import { computed } from 'vue'
import SearchList from './SearchList.vue'

const keyboard = useKeyboard()
const shouldSearchShow = computed(() => !!keyboard.inputModel.value)

const filtered = computed(() => {
  const inputValue = keyboard.inputModel.value?.toLowerCase().trim() || ''
  return props.data.filter(({ title }) => title.toLowerCase().includes(inputValue))
})
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
