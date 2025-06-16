<template>
  <div :class="keyboardClass" @click.stop />
  <button class="keyboard-close-btn" @click="emit('onClose')">
    <KeyboardCloseIcon />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineEmits, defineProps, computed, onUnmounted } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import type { KeyboardLayoutObject } from 'simple-keyboard'
import CrossIcon from '@/assets/icons/CrossIcon.vue'
import KeyboardCloseIcon from '@/assets/icons/KeyboardCloseIcon.vue'

const props = defineProps({
  keyboardClass: {
    type: String,
    default: 'simple-keyboard',
  },
  input: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['onChange', 'onKeyPress', 'onClose'])
const keyboard = ref(null)
const currentLayout = ref('default')

const numbersLayout = [
  '1 2 3 4 5 6 7 8 9 0',
  '$ ! ; ? = @ ( )',
  '{shift} . _ - + {bksp}',
  '{letters} {space}',
]

const layouts: KeyboardLayoutObject = {
  default: [
    'й ц у к е н г ш щ з х ъ',
    'ф ы в а п р о л д з э',
    '{shift} я ч с м и т ь б ю {bksp}',
    '{numbers} {space}',
  ],
  shift: [
    'Й Ц У К Е Н Г Ш Щ З Х Ъ',
    'Ф Ы В А П Р О Л Д З Э',
    '{shift} Я Ч С М И Т Ь Б Ю {bksp}',
    '{numbers} {space}',
  ],
  numbers: numbersLayout,
}

const buttonNameToView = computed(() => ({
  '{bksp}': ' ',
  '{space}': 'Пробел',
  '{shift}': ' ',
  '{numbers}': '&123',
  '{letters}': 'АБВ',
  space: ' ',
}))

const closeOnOutsideClick = () => emit('onClose')

onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    layout: layouts,
    layoutName: currentLayout.value,
    display: buttonNameToView.value,
    onChange: (input) => emit('onChange', input),
    onKeyPress: (button) => {
      emit('onKeyPress', button)
      if (button === '{shift}') handleShift()
      if (button === '{numbers}') toggleNumbers()
      if (button === '{letters}') switchToLetters()
    },
  })
})
onMounted(() => document.addEventListener('click', closeOnOutsideClick))
onUnmounted(() => document.removeEventListener('click', closeOnOutsideClick))

const toggleNumbers = () => {
  currentLayout.value = 'numbers'
  keyboard.value.setOptions({
    layoutName: currentLayout.value,
  })
}

const handleShift = () => {
  currentLayout.value = currentLayout.value === 'default' ? 'shift' : 'default'
  keyboard.value.setOptions({
    layoutName: currentLayout.value,
  })
}

const switchToLetters = () => {
  currentLayout.value = 'default'
  keyboard.value.setOptions({
    layoutName: currentLayout.value,
  })
}

watch(
  () => props.input,
  (newValue) => {
    if (keyboard.value) {
      keyboard.value.setInput(newValue)
    }
  },
)
</script>

<style lang="scss">
/* Custom Keyboard Styling */
body .simple-keyboard .hg-button {
  border: none;
  border-radius: 16px;
  flex-shrink: 0;
  font-weight: 600;
  color: var(--color-dark-beige);
  cursor: pointer;
  background: rgba(29, 112, 183, 0.1);
  box-shadow: 0px 1px 0px rgba(54, 75, 181, 0.3);

  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  height: 100%;
}

body .simple-keyboard {
  background-color: rgba(255, 255, 255, 1);
  max-width: 916px !important;
  width: 916px !important;
  min-width: 916px !important;
  margin: 0 auto !important;
  border-radius: 48px;
  padding: 24px;
  position: relative;
  height: 264px;
}

body .simple-keyboard .hg-button {
  line-height: normal;
}

.hg-button-numbers {
  min-width: 138px !important;
}

.hg-button-letters {
  min-width: 140px !important;
}

.simple-keyboard.hg-layout-numbers .hg-row {
  &:nth-child(2) {
    .hg-button {
      min-width: 79px;
    }
  }

  &:nth-child(3) {
    .hg-button {
      min-width: 120px;
    }

    .hg-functionBtn {
      min-width: 101px;
    }
  }
}

.simple-keyboard .hg-row {
  height: 48px;
  justify-content: center;
  gap: 8px;

  &:last-child {
    justify-content: flex-start;
  }
}

.simple-keyboard.hg-layout-numbers .hg-row {
  &:last-child {
    justify-content: center;
  }
}

.simple-keyboard.hg-layout-numbers .hg-row {
  &:last-child {
    justify-content: center;
  }
}

.simple-keyboard .hg-button.hg-activeButton {
  background: var(--color-blue);
  color: #fff;
}

.hg-button-shift {
  position: relative;

  .hg-layout-shift & {
    background: rgba(29, 112, 183, 0.1) !important;

    &:after {
      background: url('/icons/shift-icon.svg') center no-repeat;
      position: absolute;
      content: '';
      z-index: 1;
      width: 64px;
      height: 64px;
    }
  }

  &:after {
    background: url('/icons/shift-icon-inverse.svg') center no-repeat;
    position: absolute;
    content: '';
    z-index: 1;
    width: 64px;
    height: 64px;
  }
}

.hg-button-bksp {
  position: relative;

  &:after {
    background: url('/icons/backspace-icon-inverse.svg') center no-repeat;
    position: absolute;
    content: '';
    z-index: 1;
    width: 64px;
    height: 64px;
  }

  &.hg-activeButton {
    &:after {
      background: url('/icons/backspace-icon.svg') center no-repeat;
    }
  }
}

.hg-row .hg-button:not(:last-child) {
  margin: 0 !important;
}

.hg-row:not(:last-child) {
  margin: 0 !important;
}

.hg-standardBtn {
  width: 65px !important;
  flex-grow: 0 !important;
}

.hg-button.hg-functionBtn {
  max-width: 101px !important;
  width: 101px !important;

  &:not(.hg-button-space) {
    color: #fff;
    background: var(--color-blue);
  }

  &.hg-button-space {
    width: 576px;
    min-width: 576px;
  }
}

.hg-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.keyboard-close-btn {
  position: absolute;
  bottom: 45px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  background-color: unset;
  cursor: pointer;
  border-radius: var(--border-radius-s);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17px 50px;
}
</style>
