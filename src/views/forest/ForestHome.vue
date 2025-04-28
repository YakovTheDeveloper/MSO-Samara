<template>
  <div class="forest">
    <button class="back-btn btn btn-s">Назад</button>
    <ForestMapView :size-coefficient="sizeCoefficient">
      <ForestMapMarks @click="onMarkClick" :marks="MARKS" />
    </ForestMapView>

    <template v-if="keyboard.inputModel">
      <SearchInput
        class="search"
        v-model="keyboard.inputModel.value"
        v-if="keyboard.inputModel"
        @focus="keyboard.onFocus"
      />
      <div
        :class="['keyboard', keyboard.showKeyboard.value ? 'show' : 'hide']"
        v-if="keyboard.inputModel"
      >
        <Keyboard
          :show="keyboard.showKeyboard.value"
          @onChange="keyboard.onChange"
          @onKeyPress="keyboard.onKeyPress"
          :input="keyboard.inputModel.value"
          @onClose="keyboard.closeKeyboard"
        />
      </div>
    </template>
    <MapScaleControls @decrement="decrement" @increment="increment" />
    <div class="search-result">
      <SearchList :data="searchResult" />
    </div>
    <Modal :isOpen="Boolean(currentMark)" @close="onModalClose">
      <ModalContent
        :gallery="currentMark?.gallery"
        :title="currentMark?.title"
        :desc="currentMark?.desc"
        @close="onModalClose"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/shared/search/SearchInput.vue'
import ForestMapView from './ForestMapView.vue'
import { computed, ref, watchEffect } from 'vue'
import Keyboard from '@/components/shared/keyboard/Keyboard.vue'
import { useKeyboard } from '@/composables/useKeyboard'
import MapScaleControls from '@/MapScaleControls.vue'
import SearchList from '@/components/shared/search/SearchList.vue'
import ForestMapMarks from './ForestMapMarks.vue'
import { MARKS } from './data'
import Modal from '@/components/shared/modal/Modal.vue'
import ModalContent from '@/components/shared/modal-content/ModalContent.vue'
import { useMapScale } from '@/composables/useMapScale'

const { decrement, increment, sizeCoefficient } = useMapScale()
const keyboard = useKeyboard()
const currentMarkId = ref(-1)
const currentMark = computed(() => MARKS.find(({ id }) => id === currentMarkId.value))
const onModalClose = () => (currentMarkId.value = -1)

const onMarkClick = (markId: number) => (currentMarkId.value = markId)

watchEffect(() => {
  console.log(`output->keyboard`, keyboard.inputModel)
})

const searchResult = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
  { title: 'Item 4' },
  { title: 'Item 5' },
]
</script>

<style scoped lang="scss">
.forest {
  position: relative;
}

.back-btn {
  position: absolute;
  top: 80px;
  left: 80px;
  width: 273px;
  z-index: 1;
}

.search {
  position: absolute;
  top: 80px;
  right: 80px;
}

.search-result {
  position: absolute;
  top: 170px;
  right: 80px;
  width: 642px;
}

.keyboard {
  position: absolute;
  bottom: 0;
  height: 385px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  // padding-bottom: 150px;
  // height: 350px;
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
